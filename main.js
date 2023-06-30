const { app, BrowserWindow ,ipcMain} = require('electron')
const path = require("path")
require("./controller/card")
let win =""
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1024,
      height: 768,
      webPreferences:{
        preload: path.join(__dirname, './preload/index.js'),
        nodeIntegration: true
      },
    })
  
    win.loadURL('http://localhost:5173/')
    //win.webContents.openDevTools()
    //隐藏菜单栏
    win.setMenu(null)
    win.webContents.openDevTools({
      mode:'bottom'
    });
}

ipcMain.handle('close-loginWindow', (event) => {
  loginWin.close()
})
app.whenReady().then(() => {
    createWindow()
})