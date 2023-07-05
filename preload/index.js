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
//连接发卡器
const unconnectCard =  ()=>{
  let result =  ipcRenderer.invoke('unconnect-card') 
  return result
}
//获取卡号
 const getCardNo =  ()=>{
  let result =  ipcRenderer.invoke('get-card-number') 
  return result
}

//写入卡号
const writeCardNo =  (params)=>{
  console.log('参数',params);
  let result =  ipcRenderer.invoke('write-card',params) 
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
const setSound = (params)=>{
  let result = ipcRenderer.invoke('set-sound',params)
  return result
}
//获取扇区
const getSectors = ()=>{
  return new Promise(function(resolve, reject){
    //做一些异步操作
    resolve( ipcRenderer.invoke('get-sectors'))
});
}
//设置扇区
const setSectors = (sectors)=>{
  let result = ipcRenderer.invoke('set-sectors',sectors)
  return result
}

//写酒店专用卡
const initCard = ()=>{
  let result = ipcRenderer.invoke('init-card')
  return result
}
//空白卡
const emptyCard = ()=>{
  let result = ipcRenderer.invoke('empty-card')
  return result
}
//读取配置
const readConfig = ()=>{
  let result = ipcRenderer.invoke('read-config')
  return result
}
//写入配置
const writeConfig = (json)=>{
  let result = ipcRenderer.invoke('write-config',json)
  return result
}

//外部api 
contextBridge.exposeInMainWorld(
    'myApi',{
        getHotelInfo,
        initCardHotel,
        connectCard,
        unconnectCard,
        getCardNo,
        writeCardNo,
        readCardNo,
        clearCardNo,
        setSound,
        getSectors,
        setSectors,
        initCard,
        emptyCard,
        readConfig,
        writeConfig
    }
)