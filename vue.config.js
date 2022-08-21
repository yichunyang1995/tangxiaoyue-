const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: true,
    lintOnSave: false,
    devServer: { host: 'localhost', port: 8080, assetsPublicPath: '/' },
    //开启代理服务器
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' },
            },
        },
    },

})