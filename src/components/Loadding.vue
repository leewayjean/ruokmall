<template>
  <!-- loading -->
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
// 加载动画
.spinner {
  width: 1226px;
  margin: 17px auto;
  height: 25px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: #ff6700;
  height: 100%;
  width: 4px;
  display: inline-block;
  margin: 2px;
  -webkit-animation: sk-stretchdelay 1.1s infinite ease-in-out;
  animation: sk-stretchdelay 1.1s infinite ease-in-out;
}
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>