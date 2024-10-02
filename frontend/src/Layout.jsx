import { Outlet } from "react-router-dom";
import Header from "./component/Header";

export default function Layout(){
    return <div id="Layout">
        <Header />
        <div id="App">
            <Outlet />
        </div>
    </div>
}