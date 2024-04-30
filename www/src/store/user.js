import { reactive } from 'vue'
import { defineStore } from 'pinia'

/*
  定义一个基于 Pinia 的 Store
  第1个参数 web 是 useWebStore 在应用中的唯一标识符(ID)
  第2个参数是 Setup函数 或 Option对象
*/
export const useUserStore = defineStore('user', () => {
  //定义一个响应式对象，存储网站信息
  const user = reactive({
    username: "",
    account: "",
    token: ""
  })

  //定义方法
  const updateToken = (token) => {
    user.token = token
  }

  const updateUsername = (username) => {
    user.username = username
  }

  const updateAccount = (account) => {
    user.account = account
  }

  const getToken = ()=>{
    return user.token;
  }

  const getUsername = ()=>{
    return user.username
  }

  const getAccount = () =>{
    return user.account
  }

  const clearStore = ()=>{
    user.account=""
    user.username=""
    user.token=""
  }

  return {
    user,
    updateToken,
    updateAccount,
    updateUsername,
    getToken,
    getUsername,
    getAccount,
    clearStore
  }
},
  {
    //持久化存储到 localStorage 中
    persist: true
  })