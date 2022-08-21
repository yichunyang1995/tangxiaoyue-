import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'
// import {get } from 'core-js/core/dict';
const state = {
    //state中的默认初始值不能随便写  根据服务器返回的数据来定义
    categoryList: [],
    //轮播图的数据
    BannerList: [],
    floorList: []
};
//修改state的唯一手段
const mutations = {
    catList(state, categoryList) {

        state.categoryList = categoryList
    },
    IMAGESLIST(state, datas) {
        // console.log(datas)
        state.BannerList = datas
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
//业务逻辑,异步操作
const actions = {
    async categoryList({ commit }) {
        const result = await reqCategoryList();
        //console.log(result)
        if (result.code == 200) {
            commit('catList', result.data)
        }
    },
    async getBannerList({ commit }) {
        const result = await reqBannerList();
        // console.log(result)
        if (result.code == 200) {
            //commit提交
            commit('IMAGESLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        const result = await reqFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
};
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}