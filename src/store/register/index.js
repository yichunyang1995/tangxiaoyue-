import { getCode, userRegister, userLogin, reqUserMessage, reqLogout } from '@/api'
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userMessage: {}
}
const mutations = {
    GETCODE(state, datas) {
        state.code = datas
    },

    USERLOGIN(state, datas) {
        state.token = datas
    },
    GETUSERMESSAGE(state, datas) {
        state.userMessage = datas
    },
    LOGOUTLOGIN(state) {
        state.token = '',
            state.userMessage = '',
            localStorage.removeItem('TOKEN')

    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let reslut = await getCode(phone)
        console.log(reslut)
        if (reslut.code == 200) {
            commit('GETCODE', reslut.data)
            return 'ok'
        } else {
            return Promise.reject(new error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, data) {
        let result = await userRegister(data)
        console.log(result)

        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new error('faile'))
        }
    },
    //登录业务
    async userLogin({ commit }, data) {
        let result = await userLogin(data)
            // console.log(result)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new error('faile'))
        }
    },
    //根据token获取用户信息
    async getUserMessage({ commit }) {
        let result = await reqUserMessage()
        if (result.code == 200) {
            commit('GETUSERMESSAGE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new error('faile'))
        }
    },
    //退出登录
    async logoutLogin({ commit }) {
        let result = await reqLogout()

        // console.log(result)
        if (result.code == 200) {
            commit('LOGOUTLOGIN')
            return 'ok'
        } else {
            return Promise.reject(new error('faile'))

        }
    }
}


const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}