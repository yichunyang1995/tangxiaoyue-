import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopcart'
import register from './register'
import trade from './trade'

export default new Vuex.Store({
    //模块：把小仓库合并成为一个大仓库
    modules: {
        home,
        search,
        detail,
        shopCart,
        register,
        trade
    }
})