<template>
  <!-- logo -->
  <div class="header-logo">
    <a href="/#/" class="icon-logo"></a>
  </div>
</template>
<style lang="scss">
.header-logo {
  width: 55px;
  height: 55px;
  overflow: hidden;
  background-color:#f60;
  .icon-logo {
    display: inline-block;
    width: 110px;
    height: 55px;
    transition: margin 0.4s;
    &:before {
      content: "";
      display: inline-block;
      width: 55px;
      height: 55px;
      background: url(../assets/img/navheader/mi-logo.png) no-repeat;
      background-size: 55px;
    }
    &:after {
      content: "";
      display: inline-block;
      width: 55px;
      height: 55px;
      background: url(../assets/img/navheader/mi-home.png) no-repeat;
      background-size: 55px;
    }
    &:hover {
      margin-left: -55px;
    }
  }
}
</style>