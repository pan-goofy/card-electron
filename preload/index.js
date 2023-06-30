const { contextBridge , ipcRenderer } = require('electron')


const getHotelInfo = async ()=>{
  let result = await ipcRenderer.invoke('get-hotel-info') 
  return result
}

//配置发卡器
const initCardHotel =  ()=>{
  let result =  ipcRenderer.invoke('init-card-hotel') 
  return result
}

//连接发卡器
const connectCard =  ()=>{
  let result =  ipcRenderer.invoke('connect-card') 
  return result
}

//获取卡号
const getCardNo =  ()=>{
  let result =  ipcRenderer.invoke('get-card-number') 
  return result
}

//写入卡号
const writeCardNo =  ()=>{
  let result =  ipcRenderer.invoke('write-card') 
  return result
}
//读取卡片信息
const readCardNo =  ()=>{
  let result =  ipcRenderer.invoke('read-card') 
  return result
}
//清除卡片信息
const clearCardNo =  ()=>{
  let result =  ipcRenderer.invoke('clear-card') 
  return result
}
//发声
const setSound = ()=>{
  let result = ipcRenderer.invoke('set-sound')
  return result
}
//获取扇区
const getSectors = ()=>{
  let result = ipcRenderer.invoke('sectors')
}
//外部api 
contextBridge.exposeInMainWorld(
    'myApi',{
        getHotelInfo,
        initCardHotel,
        connectCard,
        getCardNo,
        writeCardNo,
        readCardNo,
        clearCardNo,
        setSound,
        getSectors
    }
)