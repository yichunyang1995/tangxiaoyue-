import { reqGoodsInfo, reqCarts } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
    getGoods: {},
    uuid_token: getUUID()
}
const mutations = {
    GETDOODS(state, datas) {
        // console.log(datas)
        state.getGoods = datas
    }
}
const actions = {
        async getGoods({ commit }, skuid) {
            let result = await reqGoodsInfo(skuid);
            // console.log(result)
            if (result.code == 200) {
                commit('GETDOODS', result.data)
            }
        },
        //加入购物车
        async getCarts({ commit }, { skuId, skuNum }) {

            let result = await reqCarts(skuId, skuNum)
                // console.log(result)
            if (result.code == 200) {
                //代表服务器加入购物车成功
                return "ok"
            } else {
                //代表服务器请求失败
                return Promise.reject(new Error('faile'))
            }
        }
    }
    //为计算属性而生
const getters = {
    getGoods(state) {
        // console.log(state.getGoods.categoryView)
        return state.getGoods.categoryView || {}
    },
    skuInfo(state) {
        // console.log(state.getGoods.skuInfo)
        return state.getGoods.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.getGoods.spuSaleAttrList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}