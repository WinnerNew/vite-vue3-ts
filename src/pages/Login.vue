<template>
    <div class="login">
        <button @click="requestRes">登录</button>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';

const requestRes = async () => {
    let result = await api.login('zhangsan', '123456');
};
</script>
<style scoped lang="scss">
.login {
    background: cyan;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    button {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        display: flex;
        height: 40px;
        width: 100px;
        border-radius: 5px;
    }
}
</style>
