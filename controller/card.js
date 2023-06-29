const { ipcMain, BrowserWindow } = require("electron")
const { resolve } = require("path")
const path = require("path")
const axios = require('axios')
let videoWindow = ""
var ffi = require('ffi-napi');
var ref = require('ref-napi')

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
});
  
let hotelInfo = ''
const getSource = async() => {
         let result = await axios({
            method:'post',
            url:'https://cnapi.ttlock.com/v3/hotel/getInfo',
            params:{
                clientId: 'f37d200d9d5b4250924ce43280ed806e',
                clientSecret: '4b88327993e0695ea16d54be377a639b',
                date : new Date().getTime()
             },
         })
        hotelInfo =result.data.hotelInfo
        return result.data
}

ipcMain.handle('get-hotel-info', async () => {
    try{
        result = await getSource()
        return result
    }catch(e){
        console.log('request hotel error')
    }
})

//获取卡号
ipcMain.handle('get-card-number', () => {
    try{
        result = libm.CE_GetCardNo(cardNumberPtrPtr)
        const cardNumberPtr = cardNumberPtrPtr.deref();
        const cardNumber = cardNumberPtr.isNull() ? null : cardNumberPtr.readCString();
        return cardNumber
    }catch(e){
        console.log('get-card-error')
    }
     // 释放分配的内存
     ref.free(cardNumberPtr);
     ref.free(cardNumberPtrPtr);
})
//连接发卡器
ipcMain.handle('connect-card', async () => {
    try{
        result = libm.CE_ConnectComm("COM3")
        console.log(result)
        return result
    }catch(e){
        console.log('connect card error')
    }
})
//配置发卡器
ipcMain.handle('init-card-hotel', async () => {
    try{
        console.log(hotelInfo);
        result = libm.CE_InitCardEncoder(hotelInfo)
        console.log(result)
        return result
    }catch(e){
        console.log('init-card error')
    }
})
//写入卡号
ipcMain.handle('write-card',  () => {
    try{
        console.log(hotelInfo);
        result = libm.CE_WriteCard(hotelInfo,1,1,'000C29D02123',1688116296,false)
        console.log(result)
        return result
    }catch(e){
        console.log('write-card error')
    }
})
//读取卡片信息
ipcMain.handle('read-card', () => {
    try{
        result = libm.CE_ReadCard(hotelInfo,carNumberArray)
        const cardNumberArr = carNumberArray.deref();
        const cardNumber = cardNumberArr.isNull() ? null : cardNumberArr.readCString();
        return cardNumber
    }catch(e){
        console.log('get-card-error')
    }
     // 释放分配的内存
     ref.free(cardNumberArr);
     ref.free(carNumberArray);
})
//清除卡片信息
ipcMain.handle('clear-card', () => {
    try{
        result = libm.CE_ClearCard(hotelInfo)
        return result
    }catch(e){
        console.log('get-card-error')
    }
     // 释放分配的内存
     ref.free(cardNumberArr);
     ref.free(carNumberArray);
})

//发声
ipcMain.handle('set-sound',()=>{
    try{
        result = libm.CE_Beep(100,100,1)
        return result
    }catch(e){
        console.log('set-sound-error')
    }
})
//获取扇区
let sectors = ''
ipcMain.handle('sectors',()=>{
    try{
        result = libm.CE_GetSectors(sectorsPtr)
        const sectorsPtrPtr = sectorsPtr.deref();
        const sectorsP = sectorsPtrPtr.isNull() ? null : sectorsPtrPtr.readCString();
        sectors = sectorsP
        return result
    }catch(e){
        console.log('set-sound-error')
    }
})