<script setup>
import Card from '../compments/card.vue'
import Cardcomment from '../compments/cardcomment.vue'
import CommentSender from '../compments/commentsender.vue'
import Container from '../compments/container.vue'
import { onMounted, reactive, ref } from 'vue'
import axiosInstance from '../api/axios.js';

import { useUserStore } from '../store/user.js'
const userStore = useUserStore()

import { useRoute } from 'vue-router';
const route = useRoute();

// const post =response.data
// thisPost.post_id=post.post_id
// thisPost.username=post.username
// thisPost.account=post.account
// thisPost.content=post.content
// thisPost.created_date=post.created_date
// thisPost.comment=post.comment
// thisPost.like=post.like
// thisPost.share=post.share

//根据路由获取帖子id
const post_id = route.params.post_id;

//定义帖子页的当前帖子
const thisPost = reactive([]);

//根据帖子id获取具体的帖子信息与内容
async function getPost(post_id) {
  const url = `/api/post/${post_id}`
  const token = userStore.getToken()
  const response = await axiosInstance.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  thisPost.push(response.data)
}
getPost(post_id)

//定义所有的评论
let thisComments = reactive([])

//通过当前帖子id从服务器获取所有的评论
async function getCommentsById(post_id) {
  const postUrl = `/api/comments/${post_id}`
  const token = userStore.getToken();
  const response = await axiosInstance.get(postUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  thisComments.push(...response.data)
}
getCommentsById(post_id)

//评论发送组件传递响应式对象，确保发送框可以发送评论，通过账户名和token，帖子id
const propsComment = reactive({
  username: userStore.getUsername(),
  account: userStore.getAccount(),
  token: userStore.getToken(),
  post_id: post_id,
})

</script>

<template>
  <Container>
    <h1> </h1>
    <div v-for="item in thisPost">
      <Card v-bind="item" />
    </div>
    <CommentSender v-bind="propsComment" style="margin-bottom: 20px;" />
    <div v-for="comment in thisComments">
      <Cardcomment v-bind="comment" />
    </div>
  </Container>
</template>

<style scoped></style>