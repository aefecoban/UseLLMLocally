const { app, BrowserWindow, dialog } = require('electron');
const AIServer = require("./aiserver.js");

const fs = require("fs");
const path = require("path");

let stop = false;

async function Main(){
    const AI = new AIServer();
    let check = await AI.Start();
    
    if(!check){
        await dialog.showMessageBox({
            type: "error",
            title: "Error",
            message: "Can't connect to server"
        });
        
        if(app.isReady()) app.quit();

        return;
    }

    new BrowserWindow({ width: 800, height: 600 });
}

app.whenReady().then(() => {
    Main();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) Main();
    });

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})