import { reqCartList, removeCartById, changeChecked } from '@/api'
const state = {
    getCartList: []
}
const mutations = {
    GETCARTLIST(state, datas) {
        state.getCartList = datas
    }
}
const actions = {
    async cartInfoList({ commit }) {
        let result = await reqCartList()
            // console.log(result)
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },

    async deleteCartById({ commit }, skuId) {
        let result = await removeCartById(skuId)
            // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new err('faile'))
        }
    },
    async changeCheckedById({ commit }, { skuId, isChecked }) {
        let result = await changeChecked(skuId, isChecked)
            // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new err('faile'))
        }
    },
    //删除所有选中的商品
    deleteCheced({ getters, dispatch }) {
        let promiseAll = []
        getters.cartInfos.cartInfoList.forEach(item => {
            //返回的是一个promise对象
            let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : "";
            promiseAll.push(promise)
        });
        //只有所有dispatch都成功  才能返回成功 进行重新请求数据列表   有一个不成功 则不能请求刷新
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartInfos(state) {
        // console.log(state)
        // console.log(state.getCartList[0])
        return state.getCartList[0] || {}
    },
    // cartLists(state) {
    //     // console.log(state.getCartList[1].cartInfoList)
    //     return state.getCartList[1] || {}

    // }
}
export default {
    state,
    mutations,
    actions,
    getters
}