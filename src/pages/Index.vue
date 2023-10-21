<template>
    <div class="index">
        <img :src="src" alt="" srcset="" />
        <div data-id="222" class="next">nice</div>
        <div data-id="3233">111</div>
        <el-button type="primary">asdad</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import ussElementLocationControl from '@/hooks/ussElementLocationControl';
const router = useRouter();
ussElementLocationControl(['222', '3233']);
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
    .next {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 26px;
        height: 200px;
        width: 200px;
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(8px);
        border-radius: 5px;
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
