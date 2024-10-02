from flask import Flask, request, jsonify

class Server:
    def __init__(self):
        self.app = Flask(__name__)
        self.app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024 # 100 MB

    def addRoute(self, path, methods, func):
        self.app.add_url_rule(path, view_func=func, methods=methods)

    def router(self):
        @self.app.route("/msg", methods=["GET"])
        def msg():
            return jsonify({
                "message": "Elbette!"
            })

    def run(self):
        self.router()
        self.app.run(debug=True, port=8181)