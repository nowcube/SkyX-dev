import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://192.168.1.103:8080', // 设置基础URL
    baseURL: 'http://localhost:3002', // 设置基础URL
    // baseURL: 'http://47.120.44.168:3002', // 设置基础URL
    timeout: 50000, // 设置请求超时时间
    // 其他全局配置...
});
// 可以在这里添加请求拦截器、响应拦截器等
export default instance;