<template>
    <div class="content">
    <div class="row">
            <el-button type="success" @click="getHotelInfo">获取hotelInfo</el-button>
    <el-button type="success" @click="readCard">读取卡片信息</el-button>
    <el-button type="success" @click="clardCard">清除卡片信息</el-button>
    <el-button type="success" @click="writeCard">写入卡号</el-button>
    <el-button type="success" @click="setCardHotel">配置发卡器</el-button>
    <el-button type="success" @click="connectComm">连接发卡器</el-button>
    <el-button type="success" @click="unConnectComm">断开发卡器</el-button>
    <el-button type="success" @click="getCard">获取卡号</el-button>
    </div>
    <div class="row">
        <el-button type="success" @click="getSectors">获取扇区</el-button>
        <el-button type="success" @click="setSectors">配置扇区</el-button>
        <el-button type="success" @click="sound">发声</el-button>
        <el-button type="success" @click="initCard">写酒店专用卡</el-button>
        <el-button type="success" @click="emptyCard">空白卡</el-button>
        <el-button type="success" @click="saveConfig">保存配置文件</el-button>
        <el-button type="success" @click="readConfig">读取配置文件</el-button>
    </div>
    <div class="row">
        <span>appid</span>
        <el-input v-model="appid"></el-input>
    </div>
    <div class="row">
        <span>appsercrept</span>
        <el-input v-model="appsercrept"></el-input>
    </div>
    <div class="row">
            <span>串口号</span>
            <el-input v-model="comPort"></el-input>
    </div>
    <div class="row">
        <div class="item">
            <span>楼层号</span>
            <el-input v-model="floor"></el-input>
        </div>
        <div class="item">
            <span>楼栋号</span>
            <el-input v-model="buildNumber"></el-input>
        </div>
        <div class="item">
            <span>mac地址</span>
            <el-input v-model="mac"></el-input>
        </div>
        <div class="item">
            <span>时间</span>
            <el-input v-model="time"></el-input>
        </div>
        <div class="item">
            <span>正反锁</span>
            <el-switch
            v-model="allowLockOut"
             class="ml-2"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
  />
        </div>
    </div>
    <div class="row">
        <el-input
        v-model="textarea"
        :rows="20"
        type="textarea"
        placeholder="开始"
        disabled
  />
    </div>
</div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
let  appid = ref<string>("f37d200d9d5b4250924ce43280ed806e")
let appsercrept = ref<string>("4b88327993e0695ea16d54be377a639bs")
let comPort = ref<string>("COM3")
let floor = ref<string>("1")
let buildNumber = ref<string>("1")
let mac = ref<string>("000C29D02123")
let allowLockOut =ref<boolean>(false)
let time = ref<number>( parseInt(new Date().getTime()/1000)+86400)
let textarea = ref<string>('')

onMounted(()=>{
//载入配置
    readConfig()
})
const readConfig = async ()=>{
    var config = await myApi.readConfig();
    console.log('config',typeof(config));
    let configParse =config
    if(typeof(config)=='string'){
         configParse = JSON.parse(config)
    }
    if(!config){
        console.log("无配置文件");
        return
    }
    appid.value = configParse.appid
    appsercrept.value = configParse.appsercrept
    comPort.value = configParse.comPort
    floor.value = configParse.floor
    buildNumber.value = configParse.buildNumber
    mac.value = configParse.mac
    time.value = configParse.time
    allowLockOut.value = configParse.allowLockOut

}

const getHotelInfo = async ()=>{
    console.log('getHotel',new Date().getTime());
    let res  = await myApi.getHotelInfo()
    console.log(res);
    textarea.value += res.hotelInfo +"\n"
    
}
const readCard = async ()=>{
    const cardArr = await myApi.readCardNo();
    textarea.value += "获取卡片信息" + cardArr.list + "\n"
}
const clardCard = async()=>{
    textarea.value +=  await JSON.stringify(myApi.clearCardNo()) +'\n';
}
const writeCard = async ()=>{
    console.log('writeCard',floor.value);
    const params = {
        floor:floor.value,
        buildNumber:floor.value,
        mac:mac.value,
        endtime:time.value,
        allowLockOut:false
    }
    const res = await myApi.writeCardNo(params)
    console.log(res);
    textarea.value += res.status + "\n"
}
const setCardHotel = async ()=>{
    textarea.value += await JSON.stringify(myApi.initCardHotel()) + "\n"
}
const connectComm = async()=>{
    textarea.value += await JSON.stringify(myApi.connectCard()) + "\n"
}
const unConnectComm = async ()=>{
    textarea.value +=  await JSON.stringify(myApi.unconnectCard()) + "\n"
}
const getCard = async ()=>{
    const card = await myApi.getCardNo()
    console.log(card);
    textarea.value +=   "获取卡号"+ JSON.stringify(card) +"\n"
}
const sound = ()=>{
    const params = {
        length:100,
        interval:100,
        number:1
    }
    textarea.value += myApi.setSound(params).status + "\n"
}
const  getSectors = async()=>{
    textarea.value +=  JSON.stringify(myApi.getSectors()) + "\n"
}
const setSectors = async()=>{
    textarea.value +=await  JSON.stringify(myApi.setSectors()) + "\n"
}
const initCard = async()=>{
    textarea.value += await JSON.stringify(myApi.initCard()) + "\n"
}
const emptyCard = async ()=>{
    textarea.value += await JSON.stringify(myApi.emptyCard()) +"\n"
}
const saveConfig = async ()=>{
    const params = {
        floor:floor.value,
        buildNumber:floor.value,
        mac:mac.value,
        time:time.value,
        allowLockOut:allowLockOut.value,
        appid:appid.value,
        appsercrept:appsercrept.value,
        comPort:comPort.value,
    }
    myApi.writeConfig(JSON.stringify(params))
}
</script>

<style scoped>
.content{
    padding: 10px;
}
.row{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        width: 100%;
        align-items: center;
}
.item{
    display: flex;
    justify-content: space-around;
    padding-right: 20px;
    align-items: center;
    width: 100%;
}
span{
    width: 100px;
}

</style>