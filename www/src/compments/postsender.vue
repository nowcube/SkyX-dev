<script setup>
import { reactive, ref } from 'vue'
import axiosInstance from '../api/axios.js';

import { useUserStore } from '../store/user.js'
const userStore = useUserStore()

import router from '@/router/index.js';

const content = ref('')

//从父组件传来的 帖子发送者信息
const postsenderUser = defineProps({
    username: String,
    account: String,
    token: String
})

//从当前页获取 发送帖子需要的信息
const postsenderContent = reactive({
    username: postsenderUser.username,
    account: postsenderUser.account,
    content: content,
    created_date: Date()
})

//向后端发送帖子
const sendPost = async () => {
    const postUrl = '/api/post/'
    const token = userStore.getToken();
    const response = await axiosInstance.post(postUrl, postsenderContent, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.data.code === '1') {
        router.go(0)
    }
}

</script>

<template>
    <el-card shadow="never">
        <!-- <div class="postsender-container" @keyup.enter.native="sendPost"> -->
        <div class="postsender-container">
            <div class="postsender-left">
                <!-- <el-avatar :size="40" :src="postsender.avatar_url" /> -->
                <el-avatar> {{ postsenderUser.username }} </el-avatar>
            </div>
            <div class="postsender-right">
                <div>
                    <el-input style="margin-bottom: 20px;" resize="none" type="textarea" v-model="content"
                        maxlength="200" rows="5" placeholder="有什么新鲜事？！" show-word-limit />
                </div>
                <div>
                    <el-row :gutter="0" justify="end">
                        <el-button @click="sendPost" type="primary" class="el-margin-m">发送</el-button>
                    </el-row>
                </div>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.postsender-container {
    display: flex;
}

.postsender-left {
    padding-right: 10px;
}

.postsender-right {
    width: 100%;
}
</style>