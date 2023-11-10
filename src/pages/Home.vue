<template>
    <div class="page">
        <div class="form">
            <!-- 查询条件 -->
            <el-form :model="form" size="small" :inline="true">
                <el-form-item label="用户名称">
                    <el-input
                        v-model="form.name"
                        clearable
                        placeholder="请输入用户名"
                    />
                </el-form-item>
                <el-form-item label="用户ID">
                    <el-input
                        v-model="form.userId"
                        clearable
                        placeholder="请输入用户ID"
                    />
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                        v-model="form.birth"
                        clearable
                        type="date"
                        placeholder="请选择出生日期"
                        style="width: 100%"
                    />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input
                        v-model="form.phone"
                        clearable
                        placeholder="请输入用户手机号"
                    />
                </el-form-item>
                <el-form-item label="注册地址">
                    <el-input
                        v-model="form.address"
                        clearable
                        placeholder="请输入用户注册地址"
                    />
                </el-form-item>
                <el-form-item label="在线状态">
                    <el-select
                        v-model="form.online"
                        clearable
                        placeholder="请选择状态"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button :icon="Search" @click="searCh">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                    <el-button type="primary" :icon="Plus" @click="add"
                        >新增</el-button
                    >
                </el-form-item>
            </el-form>
        </div>

        <div class="table">
            <!-- 表 -->
            <el-table
                :data="list"
                :height="tableHeight"
                :max-height="tableHeight"
                style="width: 100%"
            >
                <el-table-column prop="id" label="ID" width="60px" />
                <el-table-column prop="avatar" label="用户头像" width="100px">
                    <template #default="scope">
                        <!-- <img :src="scope.row.avatar" alt="" class="avatar" /> -->
                        <el-image
                            style="width: 35px; height: 35px"
                            :src="scope.row.avatar"
                            fit="fill"
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="userId" label="用户ID" width="160px" />
                <el-table-column prop="name" label="用户名称" width="80px" />
                <el-table-column prop="phone" label="手机号" width="120px" />
                <el-table-column prop="birth" label="出生日期" width="120px" />
                <el-table-column prop="address" label="注册地址" />
                <el-table-column prop="online" label="在线状态" width="80px">
                    <template #default="scope">
                        <!-- <el-tag
                            :type="scope.row.online ? '' : 'success'"
                            disable-transitions
                            >{{ scope.row.online ? '在线' : '未登录' }}</el-tag
                        > -->
                        <div class="status">
                            <User
                                :color="
                                    scope.row.online ? '#409EFF' : '#909399'
                                "
                                style="cur"
                            />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="120">
                    <template #default="scope">
                        <el-button
                            link
                            type="primary"
                            :icon="Edit"
                            size="small"
                            @click="handleEdit(scope.row)"
                        />
                        <el-button
                            link
                            type="danger"
                            :icon="Delete"
                            size="small"
                            @click="handleDel(scope.row)"
                        />
                    </template>
                </el-table-column>
            </el-table>
            <!-- 页 -->
            <div class="pagination">
                <el-pagination
                    v-model:current-page="form._page"
                    v-model:page-size="form._limit"
                    small
                    background
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
        v-model="dialogVisible"
        title=""
        width="30%"
        :before-close="handleClose"
    >
        <el-form :model="current" label-width="100px">
            <el-form-item label="用户名称">
                <el-input v-model="current.name" clearable />
            </el-form-item>
            <el-form-item label="用户ID">
                <el-input v-model="current.userId" clearable />
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker
                    v-model="current.birth"
                    clearable
                    type="date"
                    placeholder="请选择出生日期"
                    style="width: 100%"
                />
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="current.phone" clearable />
            </el-form-item>
            <el-form-item label="注册地址">
                <el-input v-model="current.address" clearable />
            </el-form-item>
            <el-form-item label="在线状态">
                <el-switch v-model="current.online" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmUpdate">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
const throttle = (fn, delay) => {
    let timer;
    return function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        // const _this = this;
        const args = arguments;
        if (timer) return;
        timer = setTimeout(() => {
            fn(args);
            // fn.apply(_this, args); // _this.fn(args);
            timer = null;
        }, delay);
    };
};

import { ref, onMounted, onUnmounted } from 'vue';
import { addUser, delUser, updateUser, getUser, searchUser } from './fetch';
import { ElMessage, ElLoading } from 'element-plus';
import { Delete, Edit, Search, Plus, User } from '@element-plus/icons-vue';
const options = [
    {
        value: '1',
        label: '在线',
    },
    {
        value: '0',
        label: '不在线',
    },
];
const tableHeight = ref(0);
// 搜索表单
const form = ref({
    id: '',
    name: '',
    userId: '',
    online: '',
    phone: '',
    birth: '',
    address: '',
    _page: 1,
    _limit: 10,
});
// 总数
const total = ref(0);
let dialogVisible = ref(false);
// 列表数据
let list = ref([]);
// 操作箱
let current = ref({
    id: '',
    name: '',
    userId: '',
    online: false,
    phone: '',
    birth: '',
    address: '',
});
onMounted(() => {
    searCh();
    getHeight();
    window.addEventListener('resize', getHeight);
});
onUnmounted(() => {
    window.removeEventListener('resize', getHeight);
});
// 获取不奥格高度
const getHeight = throttle(() => {
    tableHeight.value =
        document.querySelector('.page').offsetHeight -
        document.querySelector('.form').offsetHeight -
        document.querySelector('.pagination').offsetHeight;
}, 200);
// 查找
const searCh = async () => {
    const loadingInstance = ElLoading.service({
        target: '.el-table__inner-wrapper',
        lock: true,
    });
    const { data, totalNum } = await searchUser({ ...form.value });
    total.value = totalNum;
    list.value = [...data];
    loadingInstance.close();
};
const add = () => {
    current.value = {
        id: '',
        name: '',
        userId: '',
        online: false,
        phone: '',
        birth: '',
        address: '',
    };
    dialogVisible.value = true;
};
const reset = () => {
    form.value = {
        id: '',
        name: '',
        userId: '',
        online: '',
        phone: '',
        birth: '',
        address: '',
        _page: 1,
        _limit: 10,
    };
    searCh();
};
const handleSizeChange = (e) => {
    form.value._limit = e;
    searCh();
};
const handleCurrentChange = (e) => {
    form.value._page = e;
    searCh();
};
const handleEdit = async (e) => {
    const { data } = await getUser({ id: e.id });
    current.value = { ...data, online: !!data.online };
    dialogVisible.value = true;
};
const handleDel = async (e) => {
    await delUser({ id: e.id });
    ElMessage({
        message: '删除成功',
        type: 'success',
    });
    searCh();
};
const handleClose = () => {
    dialogVisible.value = false;
};
const confirmUpdate = async () => {
    if (!isNaN(current.value.id)) {
        await updateUser({
            ...current.value,
            online: current.value.online ? '1' : false,
        });
        dialogVisible.value = false;
        ElMessage({
            message: '更新成功',
            type: 'success',
        });
    } else {
        await addUser({ ...current.value });
        dialogVisible.value = false;
        ElMessage({
            message: '添加成功',
            type: 'success',
        });
    }
    searCh();
};
</script>
<style scoped lang="less">
.status {
    cursor: pointer;
    display: flex;
    align-items: center;
}
.status svg {
    width: 15px;
    height: 15px;
}
.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.page {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.table {
    display: flex;
    flex-direction: column;
    flex: 1;
    box-sizing: border-box;
    .el-table {
        box-sizing: border-box;
    }
}
.pagination {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    padding: 20px 0 10px 0;
}
</style>
