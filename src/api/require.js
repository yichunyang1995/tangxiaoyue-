//封装axios
import axios from 'axios';
// import { config } from 'vue/types/umd';
//引入进度条
import nprogress from 'nprogress';
//导入进度条的css
import 'nprogress/nprogress.css';
import store from '@/store'
// console.log(nprogress)
//创建axios实例 
const requires = axios.create({
    //路径会自己出现api
    baseURL: '/api',
    //请求时间超过5s就显示失败
    timeout: 5000

});
//请求拦截器
requires.interceptors.request.use((config) => {
    //进度条开始
    // console.log(store) //请求拦截器中看是否有store
    if (store.state.detail.uuid_token) {
        //     //如果uuid_token存在的话 就给请求头设置一个字段 这个是与后台程序员商量好的
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.register.token) {
        config.headers.token = store.state.register.token
    }
    nprogress.start()
        //config配置对象 有headers请求头
    return config

});
//响应拦截器
requires.interceptors.response.use((res) => {
    //拦截器收到请求到的数据 进度条结束
    nprogress.done()
    return res.data;
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'));
});
export default requires;