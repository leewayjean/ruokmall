import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import store from './store'
import NProgress from 'nprogress'
import './assets/nprogress/nprogress.css'
import Toast from './components/toast'


Vue.use(Toast)



NProgress.configure({
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();

  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

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
    Vue.prototype.toast.show(res.msg);
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
