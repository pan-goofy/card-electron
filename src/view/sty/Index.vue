<template>
  <div class="content">
    <div class="row">
        <el-button type="success" @click="readCard">读卡</el-button>

    </div>
  </div>
</template>

<script setup lang="ts">

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