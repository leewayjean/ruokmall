module.exports = {
    devServer:{
      host:'localhost',
      port:8081,
      proxy:{
        '/api':{
          target:'http://mall-pre.springboot.cn',
          changeOrigin:true,
          pathRewrite:{
            '/api':''
          }
        }
      }
    }
  }