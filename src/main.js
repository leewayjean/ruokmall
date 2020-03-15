import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import store from './store'


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  let res = response.data;
  /* 
      这里我们和后端协商状态码
      0  ===  已经登录正常响应
      10 ===  未登录
      。。。。
  */
  if (res.status === 0) {
    return res.data;
  } else if (res.status === 10) {
    window.location.href = "/#/login"
  } else {
    alert(res.msg);
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

axios.defaults.baseURL = '/api';
Vue.prototype.$axios = axios
// or with options
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/placeholder-220.png',
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
