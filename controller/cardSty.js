const { ipcMain, BrowserWindow } = require("electron")
const { resolve } = require("path")
const path = require("path")
var ffi = require('ffi-napi');
var ref = require('ref-napi')
const { getMsg } = require('./msg')
const { readConfig, writeConfig } = require("./file")

// var libm = ffi.Library('./64/proRFL.dll', {
//     // 函数名 返回类型 传入参数类型2个参数
//    // GetDLLVersion:['int',['string']],//读取dll版本
//     // initializeUSB:['int',['string']],//连接usb
//     // Buzzer:['int',['string','string']],//发声
//     // GuestCard:['int',['string','int','string','string','string','string','string','string','string','string']],
//     // ReadCard:['int',['string','string']],//读取卡号
//     // CardErase:['int',['string','string']],//注销卡片
//     // GetCardTypeByCardDataStr:['int',['string','string']],//读取卡片类型
//     // GetGuestLockNoByCardDataStr:['int',['string','string']],//读取客人卡的锁号
//     // GetGuestETimeByCardDataStr:['int',['string','string']], //读取客人卡的离店时间

// });