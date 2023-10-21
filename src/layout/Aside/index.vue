<template>
    <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
        >
            <div class="toggle" @click="toggle">
                <el-icon>
                    <Operation />
                </el-icon>
            </div>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <el-icon><document /></el-icon>
                <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <template #title>Navigator Four</template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    Operation,
} from '@element-plus/icons-vue';
let isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const toggle = () => {
    isCollapse.value = !isCollapse.value;
};
</script>
<style scoped lang="less">
.el-aside {
    height: calc(100vh - 60px);
    // animation: width 0.2s ease;
    transition: all 0.2s;
    overflow-y: hidden;
}
.el-menu {
    height: calc(100vh - 60px);
}
.toggle {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    cursor: pointer;
}
.toggle:hover {
    color: var(--el-menu-active-color);
    background-color: var(--el-menu-hover-bg-color);
}
</style>
