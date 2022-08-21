//封装axios
import axios from 'axios';
// import { config } from 'vue/types/umd';
//引入进度条
import nprogress from 'nprogress';
//导入进度条的css
import 'nprogress/nprogress.css';
// console.log(nprogress)
//创建axios实例
const requires = axios.create({
    //路径会自己出现api
    baseURL: '/mock',
    //请求时间超过5s就显示失败
    timeout: 5000
});
//请求拦截器
requires.interceptors.request.use((config) => {
    //进度条开始
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