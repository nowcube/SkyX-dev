<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
// const selectedIndex = ref("2-2")
import { useUserStore } from '../store/user.js'
const userStore = useUserStore()
// const selectedIndex = ref("")
const router = useRouter()

const value = ref(new Date())
const input = ref('')

import { Calendar, Search } from '@element-plus/icons-vue'

import axiosInstance from '../api/axios.js';

import Card from '../compments/card.vue'

//选中菜单触发的回调
// const selected = (index, indexPath) => {
//   console.log("index", index, "indexPath", indexPath)
// }

const goToUser = () => {
  router.push({ name: 'User' })
}

const goToHome = () => {
  router.push({ name: 'Home' })
}

const goToLike = () => {
  router.push({ name: 'Like' })
}

const goBack = () => {
  router.back(-1)
}

const logout = () => {
  userStore.clearStore()
  router.push({ name: 'Login' })
}

const goToPostPage = (item) => {
  router.push({
    name: 'Post', params: { post_id: item.post_id }
  });
}

let searchData = reactive([])
const searchPost = async () => {
  searchData.length = 0
  const searchUrl = '/api/search/' + input.value
  console.log(searchUrl)
  const token = userStore.getToken();
  const response = await axiosInstance.get(searchUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  searchData.push(...response.data);
}

// let isLeftDisplayed = false
// const switchMenuLeft = () => {
//   if (isLeftDisplayed) {
//     document.getElementsByClassName('aside-left')[0].style.display = 'none'
//     document.getElementsByClassName('aside-left')[0].style.position = 'none'
//     isLeftDisplayed = false
//   } else {
//     document.getElementsByClassName('aside-left')[0].style.display = 'flex'
//     document.getElementsByClassName('aside-left')[0].style.position = 'fixed'
//     isLeftDisplayed = true
//   }
// }
</script>

<template>
  <div class="min-menu">
    <div class="min-menu-left">
      <el-button @click="goToUser" circle><el-icon>
          <UserFilled />
        </el-icon></el-button>
      <el-button @click="goToHome" circle><el-icon>
          <HomeFilled />
        </el-icon></el-button>
      <el-button @click="goToLike" circle><el-icon>
          <StarFilled />
        </el-icon></el-button>
    </div>
    <div class="min-menu-right">
      <el-button @click="logout" circle><el-icon>
          <SwitchButton />
        </el-icon></el-button>
    </div>
  </div>
  <div class="common-layout">
    <el-container class="full-container">
      <el-aside class="aside-left">
        <el-menu class="full-menu-left">
          <div class="menu-top">
            <el-menu-item @click="goToUser"><el-icon>
                <UserFilled />
              </el-icon>{{ userStore.getUsername() }} @ {{ userStore.getAccount() }}</el-menu-item>
            <el-menu-item @click="goToHome"><el-icon>
                <HomeFilled />
              </el-icon>首页</el-menu-item>
            <el-menu-item @click="goToLike"> <el-icon>
                <StarFilled />
              </el-icon>收藏</el-menu-item>
            <el-menu-item @click="goBack"><el-icon>
                <ArrowLeftBold />
              </el-icon>返回</el-menu-item>
          </div>
          <div class="menu-bottom">
            <el-menu-item class="bottom" @click="logout"><el-icon>
                <SwitchButton />
              </el-icon>退出登录</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <el-scrollbar>
          <slot></slot>
        </el-scrollbar>
      </el-main>
      <el-aside class="aside-right">
        <el-menu class="full-menu-right">
          <el-menu-item index="1">
            <el-input v-model="input" style="width: 240px" placeholder="搜索" :prefix-icon="Search" />
            <el-button @click="searchPost" @keyup.enter.native="searchPost">搜索</el-button>
          </el-menu-item>
          <el-menu-item v-for="(item, index) in searchData" :key="index" @click="goToPostPage(item)">
            <el-icon color="#C0C4CC">
              <ArrowRight />
            </el-icon> {{ item.content }}
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.full-container {
  height: 100vh;
}

.full-menu-left {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.full-menu-right {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.bottom {
  align-self: flex-end;
}

.min-menu {
  display: none;
}

@media screen and (max-width: 768px) {
  .common-layout {
    margin-top: 30px;
  }

  .aside-left,
  .aside-right {
    display: none;
  }

  .min-menu {
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    height: 50px;
  }

  .min-menu-left {
    margin-left: 20px;
  }

  .min-menu-right {
    margin-right: 20px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {

  .aside-left,
  .aside-right {
    width: 200px;
  }

  .min-menu {
    display: none;
  }
}
</style>