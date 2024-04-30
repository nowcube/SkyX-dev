<script setup>
import { ElNotification } from 'element-plus'
import { useClipboard } from '@vueuse/core'

import axiosInstance from '../api/axios.js';

import { useUserStore } from '../store/user.js'
const userStore = useUserStore()

import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue';
const router = useRouter();

//从父组件传递过来的帖子信息
const postProps = defineProps({
    post_id: String,
    username: String,
    account: String,
    created_date: String,
    content: String,
    comment: Number,
    share: Number,
    like: Number,
})
const post = reactive({
    post_id: postProps.post_id,
    username: postProps.username,
    account: postProps.account,
    created_date: postProps.created_date,
    content: postProps.content,
    comment: postProps.comment,
    share: postProps.share,
    like: postProps.like,
})

const removeHeart = async (post_id) => {
    const postUrl = '/api/post/removelike/' + post_id
    const token = userStore.getToken();
    const response = await axiosInstance.post(postUrl, { account: userStore.getAccount() }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.data.code === '1') {
        ElNotification({
            title: '取消收藏',
            type: 'success',
        })
        router.go(0)
    }
}

const calculateTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = now - postDate;
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;
    const second = 1000;
    if (isNaN(diff)) {
        return 'Invalid date';
    }
    if (diff < 0) {
        return 'Future date';
    }
    if (diff < second) {
        return 'Just now';
    }
    if (diff < minute) {
        return Math.round(diff / second) + '秒';
    }
    if (diff < hour) {
        return Math.round(diff / minute) + '分钟';
    }
    if (diff < day) {
        return Math.round(diff / hour) + '小时';
    }
    return Math.round(diff / day) + '天';
};  
</script>

<template>
    <el-card shadow="never" style="margin-bottom: 20px;">
        <div class="card-container">
            <div class="card-left">
                <el-avatar> {{ post.username }} </el-avatar>
            </div>
            <div class="card-right">
                <div>
                    <el-text tag="b" style="margin-right: 5px;">{{ post.username }}</el-text>
                    <el-text type="info" style="margin-right: 5px;">@{{ post.account }}</el-text>
                    <el-text type="info">{{ calculateTimeAgo(post.created_date) }}</el-text>
                </div>
                <div style="padding-top: 2px;">
                    <el-text>{{ post.content }}</el-text>
                </div>
                <div style="padding-top: 10px;">
                    <el-button @click.stop.prevent="removeHeart(post_id)">
                        <el-icon color="#C0C4CC" size="20">
                            <StarFilled />
                        </el-icon>
                        <el-text>取消收藏</el-text>
                    </el-button>
                </div>
            </div>
        </div>

    </el-card>
</template>

<style scoped>
.card-container {
    display: flex;
}

.card-left {
    padding-right: 10px;
}
</style>