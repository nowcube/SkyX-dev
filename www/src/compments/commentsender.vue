<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '../store/user.js'
import axiosInstance from '../api/axios.js';
import router from '@/router/index.js';

const content = ref('')
const userStore = useUserStore()

//从父组件获取评论者信息
const commentsenderUser = defineProps({
  username: String,
  account: String,
  token: String,
  post_id: String,
})

//整理发送评论所需信息
const commentsenderContent = reactive({
  username: commentsenderUser.username,
  account: commentsenderUser.account,
  content: content,
  created_date: Date(),
  post_id: commentsenderUser.post_id,
})

//发送评论
const sendComment = async () => {
  const commentUrl = '/api/comment/'
  const token = userStore.getToken();
  const response = await axiosInstance.post(commentUrl, commentsenderContent, {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
  if(response.data.code === '1'){
    router.go(0)
  }
}

</script>

<template>
  <el-card shadow="never">
    <!-- <div class="comment-container" @keyup.enter.native="sendPost"> -->
    <div class="comment-container">
      <div class="comment-left">
        <!-- <el-avatar :size="40" :src="comment.avatar_url" /> -->
        <el-avatar> {{ commentsenderUser.username }} </el-avatar>
      </div>
      <div class="comment-right">
        <div>
          <el-input style="margin-bottom: 20px;" resize="none" type="textarea" v-model="content"
                    maxlength="200" rows="5" placeholder="留下您的评论吧？！" show-word-limit />
        </div>
        <div>
          <el-row :gutter="0" justify="end">
            <el-button @click="sendComment" type="primary" class="el-margin-m">发送</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.comment-container {
  display: flex;
}

.comment-left {
  padding-right: 10px;
}

.comment-right {
  width: 100%;
}
</style>