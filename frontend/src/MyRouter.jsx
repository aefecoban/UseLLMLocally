import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import App from "./App";
import Chat from "./pages/Chat";
import Models from "./pages/Models";
import Settings from "./pages/Settings";

export default function MyRouter(){
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Chat />} />
                <Route path="chat" element={<Chat />} />
                <Route path="chat/:id" element={<Chat />} />
                <Route path="Models" element={<Models />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    </BrowserRouter>
}