<template>
    <div class="index">
        <img :src="src" alt="" srcset="" />
        <div class="btn" @click="toLogin">Go To Login</div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const src = 'https://cdn.worldvectorlogo.com/logos/super-kamsi.svg';
const toLogin = () => {
    router.push({
        path: '/login',
    });
};
</script>

<style scoped lang="less">
.index {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
        width: 400px;
        display: flex;
    }
    .btn {
        height: 70px;
        width: 170px;
        border-radius: 10px;
        font-size: 26px;
        background: cornflowerblue;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
        cursor: pointer;
    }
}
</style>
