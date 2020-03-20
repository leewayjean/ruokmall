<template>
  <div class="register">
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/img/navfooter/logo-mi.png" />
      </div>
      <h4 class="title">注册小米账号</h4>
    </div>
  </div>
</template>
<script>
export default {
  name: "register"
};
</script>

<style lang="scss" >
.register {
  min-height: 100%;
  background: #f9f9f9;
  position: relative;
  .wrapper {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    width: 850px;
    height: 565px;
    .logo {
      height: 50px;
      text-align: center;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .title {
      text-align: center;
      font-size: 30px;
      color: #333;
      padding: 46px 0 42px;
    }
  }
}
</style>