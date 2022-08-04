module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,
        viewportHeight: '667',//视窗的高度，对应设计搞的高度
            viewportUnit: 'vw',//转换的视窗单位
            selectorBlackList: ['TabBarItem'], // 指定不需要转换的类
            minPixelValue: 1,//小于或者等于1px 不转换
            mediaQuery: false,//是否允许媒体查询中转换px
            unitPrecision: 5,//转换后的精度，即小数点
      },
    },
  };