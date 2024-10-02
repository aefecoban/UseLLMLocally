import { useState } from "react";
import { useEffect } from "react";

export default function Chat(){

    let [chat, setChat] = useState([]);
    let [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        setChat([
            { author : "user", content : "Hi" },
            { author : "assistant", content : "Hello" },
            { author : "user", content : "How are you?" },
            { author : "assistant", content : "I'm doing well, thank you" },
            { author : "user", content : "What's your name?" },
            { author : "assistant", content : "My name is Assistant" },
            { author : "user", content : "How old are you?" },
            { author : "assistant", content : "I'm 20 years old" },
        ])

        setChatHistory([
            { id : 1, title : "" },
            { id : 7, title : "" },
            { id : 23, title : "" },
            { id : 41, title : "" },
        ])
    }, []);

    return <div className="ChatPage">
        <nav>

            <ListChatHistories datas={chatHistory} />

        </nav>
        <main>

            <div className="chatArea">
                <ChatMessages datas={chat} />
            </div>
            <div className="inputArea">
                <textarea></textarea>
                <button>Send</button>
            </div>

        </main>
    </div>
}

function ListChatHistories({datas}){
    return <>
        {
            Array.isArray(datas) && datas.map((data, index) => {
                let t = data.title;
                t = (t == "") ? data.id : t;
                let url = "/chat/" + data.id;
                return <a href={url} key={index}>{t}</a>
            })
        }
    </>
}


function ChatMessages({datas}){
    return <>
        {
            Array.isArray(datas) && datas.map((data, index) => {
                return <ChatBlock key={index} data={data} />
            })
        }
    </>
}

function ChatBlock({data}){
    let c = data.author === "user" ? "user" : "assistant";
    c += " chat";
    return <div className={c}>
        <div className="author">{data.author}</div>
        <div className="content">{data.content}</div>
    </div>
}