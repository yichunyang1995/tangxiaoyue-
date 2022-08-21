import { reqAddressInfo, reqShopInfo } from '@/api'
const state = {
    getUserAddress: [],
    getGoodsList: {}
}
const mutations = {
    EGTUSERADDRESS(state, datas) {
        state.getUserAddress = datas
    },
    GETGOODSLIST(state, datas) {
        state.getGoodsList = datas
    }
}
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('EGTUSERADDRESS', result.data)
        }
        // console.log(result)
    },
    //获取商品清单数据
    async getGoodsList({ commit }) {
        let result = await reqShopInfo()
        console.log(result)
        if (result.code == 200) {
            commit('GETGOODSLIST', result.data)
        }
    }
}
const getters = {
    // goodList(state) {
    //     // console.log(state)
    //     return state.getGoodsList.detailArrayList
    // }
}
export default {
    state,
    mutations,
    actions,
    getters
}