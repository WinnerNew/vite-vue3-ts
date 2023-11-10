<template>
    <el-container direction="vertical" class="layout">
        <Header />
        <el-container>
            <Aside />
            <Main />
        </el-container>
        <!-- <Footer /> -->
    </el-container>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import Header from './Header/index.vue';
import Aside from './Aside/index.vue';
import Main from './Main/index.vue';
// import Footer from './Footer/index.vue';
</script>
<style scoped lang="less">
.layout {
    min-height: 100vh;
}
</style>
