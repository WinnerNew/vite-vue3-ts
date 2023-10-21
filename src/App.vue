<template>
    <!-- <el-container v-if="mode === 'pc'" direction="vertical">
        <Layout />
    </el-container>
    <el-container v-else class="container">
        <RouterView />
    </el-container> -->
    <!-- <RouterView /> -->
    <Layout />
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import Layout from '@/layout/index.vue';
// const mode = ref('pc');
</script>
<style scoped></style>
