console.log(process.env.NODE_ENV, " ----process.env.NODE_ENV----- ");
module.exports = {
  pwa: {
    iconPaths: {
      favicon32: "sst.ico",
    },
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/sst-vue-po/static/" : "/",
  //   devServer: {
  //     proxy: "http://TaoFengWo.com/api/", //将请求代理到http://localhost:4009去请求数据
  //   },
};
