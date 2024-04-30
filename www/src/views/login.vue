<script setup>
import { ref } from 'vue'
import axiosInstance from '../api/axios.js';
import { ElMessage } from 'element-plus'

import { useUserStore } from '../store/user.js'
const userStore = useUserStore()
// console.log(userStore.user)

import { useRouter } from 'vue-router';
const router = useRouter()

const account = ref('')
const password = ref('')

const login = async() => {
    const loginObj = {
        account: account.value,
        password: password.value
    }
    const loginUrl = '/api/login/'
    const response = await axiosInstance.post(loginUrl,loginObj)
    if(response.data.code === '1'){
        // console.log('登录成功:', response.data)
        userStore.updateToken(response.data.token)
        userStore.updateAccount(response.data.account)
        userStore.updateUsername(response.data.username)
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        await router.push({name: 'Home'})
    }else{
        ElMessage.error('登陆失败')
    }
}

const register = ()=>{
    router.push({name: 'Register'})
}

</script>

<template>
    <div class="admin">
        <el-form label-width="auto" style="min-width: 300px;" @keyup.enter.native="login">
            <el-form-item label="账号">
                <el-input v-model="account" clearable placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="password" show-password placeholder="请输入密码" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">
                    登录
                </el-button>
                <el-button @click="register">
                    去注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.admin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>