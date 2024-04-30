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

// const oldLike = post.like
// const addHeart = async (post_id) => {
//     if (oldLike === post.like) {
//         const postUrl = '/api/post/addlike/' + post_id
//         const token = userStore.getToken();
//         const response = await axiosInstance.post(postUrl, { account: userStore.getAccount() }, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         if (response.data.code === '1') {
//             ElNotification({
//                 title: '已收藏',
//                 type: 'success',
//             })
//             post.like++
//         }else{
//             ElNotification({
//                 title: '收藏失败',
//                 type: 'error',
//             })
//         }
//     }
// }

const addHeart = async (post_id) => {
    const postUrl = '/api/post/addlike/' + post_id
    const token = userStore.getToken();
    const response = await axiosInstance.post(postUrl, { account: userStore.getAccount() }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.data.code === '1') {
        ElNotification({
            title: '已收藏',
            type: 'success',
        })
        post.like++
    } else {
        ElNotification({
            title: '收藏失败',
            type: 'warning',
        })
    }
}

const sharePost = async (post_id) => {
    const url = window.location.host + `/post/${post_id}`
    const { copy } = useClipboard({ url })
    copy(url)
    ElNotification({
        title: '已复制帖子链接到剪切板',
        message: url,
        type: 'success',
    })
    const postUrl = '/api/post/addshare/' + post_id
    const token = userStore.getToken();
    const response = await axiosInstance.post(postUrl, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.data.code === '1') {
        post.share++
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
}
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
                    <el-button>
                        <el-icon color="#C0C4CC" size="20">
                            <Comment />
                        </el-icon>
                        <el-text>{{ post.comment }}</el-text>
                    </el-button>
                    <el-button @click.stop.prevent="sharePost(post_id)">
                        <el-icon color="#C0C4CC" size="20">
                            <Share />
                        </el-icon>
                        <el-text>{{ post.share }}</el-text>
                    </el-button>
                    <el-button @click.stop.prevent="addHeart(post_id)">
                        <el-icon color="#C0C4CC" size="20">
                            <StarFilled />
                        </el-icon>
                        <el-text>{{ post.like }}</el-text>
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