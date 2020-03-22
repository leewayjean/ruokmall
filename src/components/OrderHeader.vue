<template>
  <header class="order-header">
    <div class="container">
      <div class="title-wrapper">
        <Logo />
        <h2>我的购物车</h2>
        <p class="tips">温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p>
      </div>
      <div class="user-wrapper">
        <a class="username" href="javascript:;">leewayjean</a>
        <span class="split">|</span>
        <a href="javascript:;">我的订单</a>
      </div>
    </div>
  </header>
</template>
<script>
import Logo from "./Logo";
export default {
  name: "order-header",
  components: {
    Logo
  }
};
</script>
<style lang="scss">
.order-header {
  height: 102px;
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
  font-size: 12px;
  color: #757575;
  .container {
    width: 1226px;
    height: inherit;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .title-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      h2 {
          font-size: 28px;
          color: #424242;
        margin-left: 35px;
      }
      p{
          margin-left: 15px;
      }
    }
    .user-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .split{
          margin: 0 4px;
      }
      a{
          font-size: 12px;
          color: #757575;
          text-decoration: none;
      }
    }
  }
}
</style>