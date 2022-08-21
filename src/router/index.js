import VueRouter from 'vue-router'
//引入一级路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
import store from '@/store'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
//二级路由
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
// import { reduce } from 'core-js/core/array'


// import vueRsource from 'vue-resource'
// Vue.use(vueRsource);
//避免导航重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

let router = new VueRouter({
        routes: [{
                path: "/home",
                component: () =>
                    //路由懒加载  只有在路由被访问的时候组件才能被加载  提升性能
                    import ('@/pages/Home'),
                //路由元信息
                meta: {
                    show: true
                }
            },
            {
                name: 'shopcart',
                path: "/shopcart",
                // component: ShopCart,
                component: () =>
                    import ('@/pages/ShopCart'),
                //路由元信息
                meta: {
                    show: true
                }
            },
            {
                name: 'center',
                path: "/center",
                // component: Center,
                component: () =>
                    import ('@/pages/Center'),
                children: [{
                        path: 'myorder',
                        component: myOrder
                    },
                    {
                        path: 'grouporder',
                        component: groupOrder
                    },
                    {
                        path: '/center',
                        redirect: '/center/myorder'
                    }
                ],
                //路由元信息
                meta: {
                    show: true
                }
            },
            {
                name: 'paysuccess',
                path: "/paysuccess",
                // component: PaySuccess,
                component: () =>
                    import ('@/pages/PaySuccess'),
                //路由元信息
                meta: {
                    show: true
                },
                beforeEnter: (to, from, next) => {
                    if (from.path == '/pay') {
                        next()
                    } else {
                        //从哪里来回哪里去
                        next(false)
                    }
                }

            },
            {
                name: 'pay',
                path: "/pay",
                // component: Pay,
                component: () =>
                    import ('@/pages/Pay'),
                //路由元信息
                meta: {
                    show: true
                },
                //路由独享守卫
                beforeEnter: (to, from, next) => {
                    if (from.path == '/trade') {
                        next()
                    } else {
                        //从哪里来回哪里去
                        next(false)
                    }
                }
            },
            {
                name: 'trade',
                path: "/trade",
                // component: Trade,
                component: () =>
                    import ('@/pages/Trade'),
                //路由元信息
                meta: {
                    show: true
                }
            }, {
                name: 'shopcarts',
                path: "/shopcarts",
                // component: ShopCart,
                component: () =>
                    import ('@/pages/ShopCart'),
                //路由元信息
                meta: {
                    show: true
                }
            },
            {
                path: "/detail/:skuid",
                // component: Detail,
                component: () =>
                    import ('@/pages/Detail'),

                meta: {
                    show: true
                }
            }, {
                name: 'login',
                path: "/login",
                component: () =>
                    import ('@/pages/Login'),
                // component: Login,
                meta: {
                    show: false
                }
            }, {
                path: "/register",
                // component: Register,
                component: () =>
                    import ('@/pages/Register'),

                meta: {
                    show: false
                }
            },
            {
                //占位
                name: 'search',
                path: '/search/:keyword?',
                // path: '/search',

                // path: '/search/:keyword',
                // component: Search,
                component: () =>
                    import ('@/pages/Search'),

                meta: {
                    show: true
                }
            },
            {
                //重定向到首页
                path: '/',
                redirect: '/home'
            }
        ],
        //路由跳转到最顶部
        scrollBehavior(to, from, savedPosition) {
            // 始终滚动到顶部
            return { y: 0 }
        },
    })
    //设置全局导航前置守卫
    // router.beforeEach(async(to, from, next) => {
    //     let token = store.state.register.token
    //     let name = store.state.register.userMessage.name
    //         //有token代表用户登录了
    //     if (token) {
    //         //用户登录了  想去login或者register页面不让去
    //         if (to.path === '/login' || to.path === '/register') {
    //             next('/')
    //         } else {
    //             //因为store中的token是通过localStorage获取的，token有存放在本地
    //             // 当页面刷新时，token不会消失，但是store中的其他数据会清空，
    //             // 所以不仅要判断token,还要判断用户信息

//             //1.2.1、判断仓库中是否有用户信息，有放行，没有派发actions获取信息
//             if (name) {
//                 next()
//             } else {
//                 try {
//                     //没有用户信息  则派发actions获取用户信息  然后再放行
//                     await this.$store.dispatch('getUserMessage')
//                     next()
//                 } catch (error) {
//                     // 判断仓库中是否有用户信息，有放行，没有派发actions获取信息
//                     //获取用户信息失败，原因：token过期 //清除前后端token，跳转到登陆页
//                     await this.$store.dispatch('logoutLogin')
//                     next('/login')
//                 }
//             }

//         }
//     } else {
//         //用户没有登陆
//         next()
//     }

// })
router.beforeEach(async(to, from, next) => {
    let token = store.state.register.token
    let name = store.state.register.userMessage.name
        //1、有token代表登录，全部页面放行
    if (token) {
        //1.1登陆了，不允许前往登录页
        if (to.path === '/login') {
            next('/home')
        } else {
            //1.2、因为store中的token是通过localStorage获取的，token有存放在本地
            // 当页面刷新时，token不会消失，但是store中的其他数据会清空，
            // 所以不仅要判断token,还要判断用户信息

            //1.2.1、判断仓库中是否有用户信息，有放行，没有派发actions获取信息
            if (name)
                next()
            else {
                //1.2.2、如果没有用户信息，则派发actions获取用户信息
                try {
                    await store.dispatch('getUserMessage')
                    next()
                } catch (error) {
                    //1.2.3、获取用户信息失败，原因：token过期
                    //清除前后端token，跳转到登陆页面
                    await store.dispatch('logoutLogin')
                    next('#/home')
                }
            }
        }
    } else {
        //2、未登录.不能去交易相关的组件  不能去个人中心 其他的能去

        // console.log(to.path)
        let toPath = to.path
        if (toPath == '/trade' || toPath == '/pay' || toPath == '/center') {
            next('/login?a=' + toPath)
        } else {
            next()
        }

    }
})

export default router;