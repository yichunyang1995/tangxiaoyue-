import { reqSearchInfo } from '@/api'
// console.log(reqSearchInfo({}))
const state = {
    // name: 'xiaoha'
    getSearchList: {}
};
//修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, datas) {
        state.getSearchList = datas
    }
};
//业务逻辑
const actions = {
    async getSearchList({ commit }, params) {
        // console.log(reqSearchInfo({}))
        const result = await reqSearchInfo(params);
        // console.log(result)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
//计算属性  为了简化数据  相当于computed
const getters = {
    //这个state为小仓库中的state 不是大仓库的state
    attrsList(state) {
        return state.getSearchList.attrsList
    },
    trademarkList(state) {
        return state.getSearchList.trademarkList
    },
    goodsList(state) {
        return state.getSearchList.goodsList
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}