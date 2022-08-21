import Vue from 'vue'
//引入App
import App from './App.vue'
import Router from 'vue-router'
Vue.use(Router)
import router from './router'
//全局组件
import TypNave from '@/components/TypNave' //全局组件放在components目录下
import Pagination from '@/components/Pagination'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入懒加载
// import VueLazyLoad from 'vue-lazyload'

// //图片或者json文件无需对外暴露
// import pic from '@/assets/lazyload.jpg'
// //注册插件
// Vue.use(VueLazyLoad, {
//     // 懒加载默认的图片
//     loading: pic
// })



//包含了所有的api
import * as API from '@/api'

// console.log(API)
import "@/mock/mockServer.js";
import 'swiper/css/swiper.css'
// import { reqSearchInfo } from '@/api'
// reqSearchInfo({})
// import { reqCategoryList, reqBannerList } from '@/api'
// reqCategoryList()
//全局组件，第一个参数为全局组件的名字，第二个参数为哪一个组件
Vue.component(TypNave.name, TypNave)
Vue.component(Pagination.name, Pagination)
    //关闭Vue的生产提示
Vue.config.productionTip = false

//创建vm
new Vue({
    el: '#app',
    render: h => h(App),
    //注册路由   组件身上都是会拥有$route,$router属性
    router,
    //注册store  组件实例身上都是会多一个$store属性
    store,
    // store,
    //在入口文件挂在属性  全局有效 所有的组件都有改属性
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    }
})