<template>
    <el-main id="el-main">
        <RouterView />
    </el-main>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue';
</script>
<style scoped lang="less">
#el-main {
    height: calc(100vh - 60px);
    box-sizing: border-box;
}
</style>
