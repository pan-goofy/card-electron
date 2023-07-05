const { ipcMain, BrowserWindow } = require("electron")
const { resolve } = require("path")
const path = require("path")
const axios = require('axios')
let videoWindow = ""
var ffi = require('ffi-napi');
var ref = require('ref-napi')
const { getMsg } = require('./msg')
const { readConfig, writeConfig } = require("./file")

const cardNumberPtrPtr = ref.alloc(ref.refType(ref.types.char));
const carNumberArray = ref.alloc(ref.refType(ref.types.char));
const sectorsPtr = ref.alloc(ref.refType(ref.types.char));
var libm = ffi.Library('./64/CardEncoder.dll', {
    // 函数名 返回类型 传入参数类型2个参数
    CE_ConnectComm: [ 'int', ['string']],  // 连接发卡器
    CE_DisconnectComm:['int',[]],  //断开发卡器
    CE_GetCardNo:['int',[ref.types.CString]], //获取卡号
    CE_InitCardEncoder:['int',['string']], //配置发卡器
    CE_WriteCard:['int',['string','int','int','string','int','bool']],//写卡
    CE_ReadCard:['int',['string',ref.types.CString]], //读取卡
    CE_ClearCard:['int',['string']], //清除卡
    CE_Beep:['int',['int','int','int']],//发声
    CE_GetSectors:['int',[ref.types.CString]],//获取扇区
    CE_SetSectors:['int',['string']],//设置扇区
    CE_InitCard:['int',['string']],//写酒店专用卡
    CE_DeInitCard:['int',['string']],
});
let hotelInfo = ''  
const getSource = async () => {
    try {
      let config = await readConfig();
      let result = await axios({
        method: 'post',
        url: 'https://cnapi.ttlock.com/v3/hotel/getInfo',
        params: {
          clientId: config.appid,
          clientSecret: config.appsercrept,
          date: new Date().getTime()
        },
      });
      hotelInfo = result.data.hotelInfo;
      return result.data;
    } catch (err) {
      console.error(err);
    }
  };

ipcMain.handle('get-hotel-info', async () => {
    try{
        result = await getSource()
        return result
    }catch(e){
        console.log('request hotel error')
    }
})

//获取卡号
const getCardNo = ()=>{
    try{
        result = libm.CE_GetCardNo(cardNumberPtrPtr)
        const cardNumberPtr = cardNumberPtrPtr.deref();
        const cardNumber = cardNumberPtr.isNull() ? null : cardNumberPtr.readCString();
        console.log(cardNumber);
       
        return {no:cardNumber,status:result}
    }catch(e){
        console.log('get-card-error')
    }
     // 释放分配的内存
     ref.free(cardNumberPtr);
     ref.free(cardNumberPtrPtr);
}
ipcMain.handle('get-card-number', () => {
    return getCardNo()
})
//连接发卡器
const connectCard = ()=>{
    try{
        result = libm.CE_ConnectComm("COM3")
        console.log(result)
        return {status:result}
    }catch(e){
        console.log('connect card error')
    }
}
ipcMain.handle('connect-card', async () => {
   return connectCard()
})
//断开发卡器
const unconnectCard = ()=>{
    try{
        result = libm.CE_DisconnectComm()
        console.log(result)
        return {status:result}
    }catch(e){
        console.log('unconnect card error')
    }
}
ipcMain.handle('unconnect-card', async () => {
    return unconnectCard()
 })
//配置发卡器
const initCardHotel = ()=>{
    try{
        console.log(hotelInfo);
        result = libm.CE_InitCardEncoder(hotelInfo)
        console.log(result)
        return {status:result}
    }catch(e){
        console.log('init-card error')
    }
}
ipcMain.handle('init-card-hotel', async () => {
    return initCardHotel()
})
//写入卡号
const writeCard = (params)=>{
    try{
        console.log('params',params);
        console.log('hotelInfo',hotelInfo)
        const floor = parseInt(params.floor)
        const buildNumber = parseInt(params.buildNumber)
        const time = parseInt(params.endtime)
        result = libm.CE_WriteCard(hotelInfo,floor,buildNumber,params.mac,time,params.ture)
        return {status:result}
    }catch(e){
        console.log('write-card error')
    }
}
ipcMain.handle('write-card',  (e,params) => {
    return writeCard(params)
})
//读取卡片信息
const readCard = ()=>{
    try{
        result = libm.CE_ReadCard(hotelInfo,carNumberArray)
        const cardNumberArr = carNumberArray.deref();
        const cardNumber = cardNumberArr.isNull() ? null : cardNumberArr.readCString();
        return {list:cardNumber,status:result}
    }catch(e){
        console.log('get-card-error')
    }
     // 释放分配的内存
     ref.free(cardNumberArr);
     ref.free(carNumberArray);
}
ipcMain.handle('read-card', () => {
    return readCard()
})
//清除卡片信息
const clearCard = ()=>{
    try{
        result = libm.CE_ClearCard(hotelInfo)
        return {status:result}
    }catch(e){
        console.log('get-card-error')
    }
}
ipcMain.handle('clear-card', () => {
    return clearCard()
})

//发声
const startSound = (params)=>{
    try{
        result = libm.CE_Beep(params.length,params.interval,params.number)
        return {status:result}
    }catch(e){
        console.log('set-sound-error')
    }
}
ipcMain.handle('set-sound',(e,params)=>{
   return startSound(params)
})
//获取扇区
let sectors = ''
ipcMain.handle('get-sectors',()=>{
    try{
        result = libm.CE_GetSectors(sectorsPtr)
        const sectorsPtrPtr = sectorsPtr.deref();
        const sectorsP = sectorsPtrPtr.isNull() ? null : sectorsPtrPtr.readCString();
        sectors = sectorsP
        console.log('sectors',sectors)
        return result
    }catch(e){
        console.log('set-sound-error')
    }
})
//设置扇区
ipcMain.handle('set-sectors',()=>{
    try{
        result = libm.CE_SetSectors(sectors)
        console.log('set sectors',result)
        return result 
    }catch(e){
        console.log('setSectors error')
    }
})
//写酒店专用卡
ipcMain.handle('init-card',()=>{
    try{
        result = libm.CE_InitCard(hotelInfo)
        console.log('init-card',result)
        return result 
    }catch(e){
        console.log('init-card error')
    }
})
//空白卡
ipcMain.handle('empty-card',()=>{
    try{
        result = libm.CE_DeInitCard(hotelInfo)
        console.log('empty-card',result)
        return result 
    }catch(e){
        console.log('init-card error')
    }
})

//读取配置
ipcMain.handle('read-config',async()=>{
    try{
        result = await readConfig()
        return result;
    }catch(e){
        console.log('read error');
    }
})
//写入配置
ipcMain.handle('write-config',(e,configs)=>{
    try{
        return writeConfig(configs);
    }catch(e){
        console.log('read error');
    }
})

module.exports = {
   getCardNo,
   getSource,
   readCard,
   writeCard,
   clearCard,
   startSound,
   connectCard,
   unconnectCard,
   initCardHotel,
}