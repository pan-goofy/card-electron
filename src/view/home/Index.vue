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
        <el-button type="success" @click="getCard">配置扇区</el-button>
        <el-button type="success" @click="sound">发声</el-button>
        <el-button type="success" @click="getCard">写酒店专用卡</el-button>
        <el-button type="success" @click="getCard">空白卡</el-button>
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
            <el-input v-model="ComPort"></el-input>
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
import {ref} from 'vue'
let  appid = ref<string>("f37d200d9d5b4250924ce43280ed806e")
let appsercrept = ref<string>("4b88327993e0695ea16d54be377a639bs")
let ComPort = ref<string>("COM3")
let floor = ref<string>("1")
let buildNumber = ref<string>("1")
let mac = ref<string>("000C29D02123")
let time = ref<number>( parseInt(new Date().getTime()/1000)+86400)
let textarea = ref<string>('')
const getHotelInfo = async ()=>{
    console.log('getHotel',new Date().getTime());
    let res  = await myApi.getHotelInfo()
    console.log(res);
    textarea.value += res.hotelInfo +"\n"
    
}
const readCard = async ()=>{
    const cardArr = await myApi.readCardNo();
    textarea.value += "获取卡片信息" + cardArr + "\n"
}
const clardCard = ()=>{
    const res = myApi.clearCardNo();
    console.log('clearCard',res);
}
const writeCard = ()=>{
    console.log('writeCard',floor.value);
    myApi.writeCardNo()
}
const setCardHotel = ()=>{
    myApi.initCardHotel()
}
const connectComm = ()=>{
    myApi.connectCard()
}
const getCard = async ()=>{
    const card = await myApi.getCardNo()
    console.log(card);
    textarea.value +=   "获取卡号"+card +"\n"
}
const sound = ()=>{
    myApi.setSound()
}
const  getSectors = ()=>{
    myApi.getSectors()
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