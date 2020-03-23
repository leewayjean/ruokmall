<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getUserInfo, getCartCount } from "./api";
export default {
  name: "App",
  components: {},
  computed: {},
  mounted() {
    getUserInfo().then(res => {
      this.$store.dispatch("saveUserName", res.username);
    });
    getCartCount().then(res => {
      console.log(res);
      console.log(typeof res);
      //未登录时，接口返回不是数字类型时，设置为0
      if (typeof res !== "number") {
        this.$store.dispatch("saveCartCount", 0);
      } else {
        this.$store.dispatch("saveCartCount", res);
      }
    });
  }
};
</script>
<style lang="scss" >
@import "./assets/scss/normalize.scss";
@import "./assets/iconfont/iconfont.css";
#app {
  height: 100%;
}
</style>
