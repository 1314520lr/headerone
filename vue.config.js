const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
    //less
    less: {
    // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直
    // 接配置选项。
    lessOptions: {
    modifyVars: {
    hack: `true; @import "~@/common/All.less";`,
    },
    },
    },
  },
},    
})
