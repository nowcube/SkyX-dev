<script setup>
import { reactive, ref } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter();

import CardAdmin from '../compments/cardadmin.vue'
import Container from '../compments/container.vue'
import axiosInstance from '../api/axios.js';

import { useUserStore } from '../store/user.js'
const userStore = useUserStore()

//从pinia中获取当前用户信息
const thisUser = {
  username: userStore.user.username,
  account: userStore.user.account,
  token: userStore.user.token,
}

//获取用户所有帖子文章
const postsData = reactive([])
async function getHomePosts() {
  const url = '/api/posts/'+thisUser.account
  const token = userStore.getToken();
  const response = await axiosInstance.get(url,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  postsData.push(...response.data);
}
getHomePosts()

//点击跳转到某一帖子页
const goToPostPage = (item) => {
  //点击具体帖子通过路由传参
  router.push({
    name: 'Post', params: { post_id: item.post_id }
  });
}

</script>

<template>

  <Container>
    <h1>我的帖子</h1>
    <el-divider />
    <div v-for="(item) in postsData" @click="goToPostPage(item)">
      <CardAdmin v-bind="item"/>
    </div>
  </Container>

</template>

<style scoped></style>
