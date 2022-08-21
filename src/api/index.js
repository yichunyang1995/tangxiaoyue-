//创建api管理文件  方便管理多个api
import requires from './require';
import mockRequires from './mockAjax';

//   /api/product/getBaseCategoryList    get请求  无参数
export const reqCategoryList = () => requires({ url: '/product/getBaseCategoryList', method: 'get' })
    //获取banner（首页home轮播图接口） /mock/banner       get请求  无参数     /mock省略
export const reqBannerList = () => mockRequires({ url: '/banner', method: 'get' })
    // export const reqFloorList = function() {
    //         return mockRequires.get('/floor')
    //     }
export const reqFloorList = () => mockRequires({ url: '/floor', method: 'get' })
    //search接口
    // export const reqSearchInfo = (params) => requires({ url: "/list", method: "post", data: params })
export const reqSearchInfo = function(params) {
        return requires({ url: "/list", method: "post", data: params })
    }
    //   /api/item/{ skuId }  详情页数据接口
export const reqGoodsInfo = function(skuId) {
        return requires({ url: `/item/${skuId}`, method: 'get' })
    }
    //   /api/cart/addToCart/{ skuId }/{ skuNum }  添加购物车
export const reqCarts = function(skuID, skuNum) {
        return requires({ 'url': `/cart/addToCart/${skuID}/${ skuNum}`, method: 'post' })
    }
    //获取购物车列表接口  /api/cart/cartList 无参数
export const reqCartList = function() {
        return requires({ 'url': `/cart/cartList`, method: 'get' })
    }
    //   /api/cart/deleteCart/{skuId}   购物车删除接口  DELETE
export const removeCartById = (skuId) => {
        return requires({ 'url': `/cart/deleteCart/${skuId}`, method: 'delete' })
    }
    //切换商品选中状态接口  /api/cart/checkCart/{skuId}/{isChecked}   get
export const changeChecked = (skuId, isChecked) => {
    return requires({ 'url': `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}

//   获取验证码接口    /api/user/passport/sendCode/{phone}   get
export const getCode = (phone) => {
        return requires({ 'url': `/user/passport/sendCode/${phone}`, method: 'get' })
    }
    //注册用户   /api/user/passport/register   POST
export const userRegister = (data) => {
        return requires({ 'url': `/user/passport/register`, data, method: 'post' })
    }
    //登录  /api/user/passport/login   post
export const userLogin = (data) => {
        return requires({ 'url': `/user/passport/login `, data, method: 'post' })
    }
    //  根据token获取用户信息   /api/user/passport/auth/getUserInfo   get
export const reqUserMessage = () => {
        return requires({ 'url': `/user/passport/auth/getUserInfo`, method: 'get' })
    }
    //  /api/user/passport/logout  退出登录  get 
export const reqLogout = () => {
    return requires({ 'url': `/user/passport/logout `, method: 'get' })
}

//获取用户地址信息
export const reqAddressInfo = () => requires({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });


//获取商品清单数据
export const reqShopInfo = () => requires({ url: `/order/auth/trade`, method: 'get' });
// 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmit = (tradeNo, data) => requires({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
    // export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});
    // 获取订单支付信息  /api/payment/weixin/createNative/{orderId}  get
export const reqOrderMsg = (orderId) => {
        return requires({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
    }
    //   /api/payment/weixin/queryPayStatus/{orderId}    查询支付订单状态
    // export const reqFind = (orderId) => {
    //     return requires({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
    // }
export const reqPayResult = (orderId) => requires({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });