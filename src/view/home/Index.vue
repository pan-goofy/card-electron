<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="通通" name="first"><TongTong/></el-tab-pane>
    <el-tab-pane label="都市" name="second"><Sty/></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import TongTong from "@/view/tongtong/Index.vue"
import Sty from "@/view/sty/Index.vue"
import {ref} from 'vue'
import type { TabsPaneContext } from 'element-plus'
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
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