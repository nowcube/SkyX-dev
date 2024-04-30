<script setup>
import { ref } from 'vue'
import axiosInstance from '../api/axios.js';

import { useUserStore } from '../store/user.js'
const userStore = useUserStore()

import { useRouter } from 'vue-router';
import {ElMessage} from "element-plus";
const router = useRouter()

const account = ref('')
const password = ref('')
const username = ref('')

const register = async() => {
    const regObj = {
        username: username.value,
        account: account.value,
        password: password.value
    }
    const regUrl = '/api/register'
    const response = await axiosInstance.post(regUrl,regObj)
    if(response.data.code === '1'){
        console.log('注册成功:', response.data);
        userStore.updateToken(response.data.token)
        userStore.updateAccount(response.data.account)
        userStore.updateUsername(response.data.username)
        ElMessage({
          message: '注册成功',
          type: 'success',
        })
        await router.push({name: 'Home'})
    }else{
        ElMessage.error('注册失败')
    }
}

const login = ()=>{
    router.push({name: 'Login'})
}
</script>

<template>
    <div class="admin">
        <el-form label-width="auto" style="min-width: 300px">
            <el-form-item label="用户名">
                <el-input v-model="username" clearable placeholder="起一个喜欢的名字吧" />
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="account" clearable placeholder="请输入账号，唯一不可更改" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="password" show-password placeholder="请输入密码" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">
                    注册
                </el-button>
                <el-button @click="login">
                    返回登录
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