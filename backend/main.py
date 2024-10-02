from flask import request, jsonify
from Server import Server
from llama_cpp import Llama
import os

modelFile = "Models/Model.gguf"
Model = None

SystemPrompt = """You are helpful AI Assistant."""

Chats = {
    0 : [ {"role" : "system", "content" : SystemPrompt} ]
}

generation_kwargs = {
    "max_tokens":20000,
    "stop":["<|eot_id|>"],
    "top_k":1
}

def Chat():
    data = request.get_json()
    seed = 0

    if Model is None:
        return jsonify({"error": "Model not loaded"}), 400
    
    if data and 'seed' in data:
        seed = data['seed']

    if seed not in Chats:
        Chats[seed] = [ {"role" : "system", "content" : SystemPrompt} ]

    if data and 'message' in data:
        message = data['message']
        Chats[seed].append({"role" : "user", "content" : message})
        response = Model.create_chat_completion(messages = Chats[seed], **generation_kwargs)
        res = response["choices"][0]["message"]["content"]
        Chats[seed].append({"role" : "assistant", "content" : res})

        return jsonify({"response": res}), 200
    else:
        return jsonify({"error": "No message provided"}), 400

def GetAllModels():
    models = []
    if os.path.exists("Models"):
        models = os.listdir("Models")
    
    return jsonify({"Models": models}), 200

def ClearAllMessages():
    global Chats
    Chats = {
        0 : [ {"role" : "system", "content" : SystemPrompt} ]
    }

    return jsonify({"success": True}), 200

def RemoveChatFromSeed():
    global Chats
    data = request.get_json()
    seed = None
    
    if data and 'seed' in data:
        seed = data['seed']

    if seed is None:
        return jsonify({"error": "No seed provided"}), 400

    del Chats[seed]

    return jsonify({"success": True}), 200

def LoadModel():
    global Model

    if Model is not None:
        Model = None
    
    if os.path.exists(modelFile):
        Model = Llama(
            model_path=modelFile,
            n_ctx=2048,
            n_parts=32,
            seed=0,
            f16_kv=False,
            use_mlock=False,
            n_embd=4096,
            n_head=32,
            n_layer=32,
            scale_embedding=False,
            verbose=False
        )
    else:
        Model = None
    
    check = False if Model is None else True

    return jsonify({
        "Load" : check
    })

def LoadModelOne():
    data = request.get_json()
    mF = ""

    if data and 'model' in data:
        mF = data['model']

    if os.path.exists(mF):
        global modelFile
        modelFile = mF

        return LoadModel()

    return jsonify({
        "Load" : False
    })

App = Server()

App.addRoute("/", ["GET"], lambda: jsonify({
    "model": "Model not loaded" if Model is None else f"Model loaded: {modelFile}"
}))

App.addRoute("/loadDefaultModel", ["GET"], LoadModel)
App.addRoute("/models", ["POST"], GetAllModels)
App.addRoute("/loadModel", ["POST"], LoadModelOne)
App.addRoute("/message", ["POST"], Chat)
App.addRoute("/cleareAllMessages", ["GET"], ClearAllMessages)
App.addRoute("/removeChat", ["GET"], RemoveChatFromSeed)

App.run()