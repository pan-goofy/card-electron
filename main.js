const { app, BrowserWindow ,ipcMain} = require('electron')
const path = require("path")
require("./controller/card")
require("./controller/websocketServer")
const {getSource,connectCard,initCardHotel} = require("./controller/card")
let win =""
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1024,
      height: 768,
      icon: path.join(__dirname,'Icon.png'),
      title:'发卡服务',
      webPreferences:{
        preload: path.join(__dirname, './preload/index.js'),
        nodeIntegration: true
      },
    })
     win.loadURL('http://localhost:5173/')
    // win.loadFile('web/index.html')
    //隐藏菜单栏
    win.setMenu(null)
    调试工具
    win.webContents.openDevTools({
      mode:'bottom'
    });
    win.on('close', (event) => {
      //前面可以加些判断条件，看下当前是否可以关闭进程
      win.destroy()
    });
    
}
//第一次加载获取hotelInfo 连接发卡器 配置发卡器
getSource().then(res=>{
  //连接发卡器f
  connectCard().then(re=>{
  //配置发卡器
      initCardHotel()
  })
})

ipcMain.handle('close-loginWindow', (event) => {
  loginWin.close()
})
app.whenReady().then(() => {
    createWindow()
})