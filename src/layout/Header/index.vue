<template>
    <el-header height="60px">
        <div class="header">
            <div class="logo"></div>
            <div class="user"></div>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
</script>
<style scoped lang="less">
.el-header {
    padding: 0;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
    .logo {
        width: 160px;
        height: var(--el-header-height);
        background: url('https://retailtest.cjhxfund.com/wjGateway/static/img/logo_2.a7b22659.png')
            no-repeat center;
        background-size: 160px 30px;
        background-origin: center;
    }
    .user {
    }
}
</style>
