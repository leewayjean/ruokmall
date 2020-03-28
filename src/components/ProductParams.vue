<template>
  <div class="product-params">
    <div class="navbar">
      <div class="navbar-container">
        <div class="left">
          <span class="product-name">{{productName}}</span>
        </div>
        <div class="right">
          <a href="javascript:;">概述</a>
          <span class="split">|</span>
          <a href="javascript:;">参数</a>
          <span class="split">|</span>
          <a href="javascript:;">用户评价</a>
          <span class="btn-buy" @click="$emit('btn-click')" v-if="btnShow">立即购买</span>
        </div>
      </div>
    </div>
    <!-- 隐藏的吸顶导航 -->
    <div class="navbar navbar-hidden" :class="{'navbar-fixed':isFixed}">
      <div class="navbar-container">
        <div class="left">
          <span class="product-name">{{productName}}</span>
        </div>
        <div class="right">
          <a href="javascript:;">概述</a>
          <span class="split">|</span>
          <a href="javascript:;">参数</a>
          <span class="split">|</span>
          <a href="javascript:;">用户评价</a>
          <span class="btn-buy" @click="$emit('btn-click')" v-if="btnShow">立即购买</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "product-params",
  data() {
    return {
      isFixed: false,
      navbarHidden: false
    };
  },
  props:{
    productName:{
      type:String
    },
    btnShow:{
      type:Boolean,
      default:true
    }
  },
  mounted() {
    window.addEventListener("scroll", this.init);
  },
  methods: {
    init() {
      const TOP_DISTANCE = 161 + 71; //参数组件距离顶部距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop > TOP_DISTANCE ? (this.isFixed = true) : (this.isFixed = false);
    }
  }
};
</script>
<style lang="scss" >
.product-params {
  .navbar {
    height: 70px;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
    .navbar-container {
      display: flex;
      justify-content: space-between;
      width: 1226px;
      height: 70px;
      margin: 0 auto;
      line-height: 70px;
      a {
        font-size: 12px;
        color: #666;
        text-decoration: none;
      }
      .split {
        color: #666;
        font-size: 12px;
        padding: 0 10px;
      }
      .left {
        .product-name {
          font-size: 18px;
          color: #333;
        }
      }
      .right {
        .btn-buy {
          display: inline-block;
          width: 110px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 12px;
          color: #fff;
          background-color: #f60;
          cursor: pointer;
          margin-left: 15px;
          transition: background-color .4s;
          &:hover{
            background-color: #f25807;
          }
        }
      }
    }
  }
  //   这里当margin-top = 70 ，0时隐藏的
  .navbar.navbar-fixed {
    position: fixed;
    top: -71px;
    margin-top: 71px;
    width: 100%;
    z-index: 999;
  }
  .navbar-hidden {
    position: fixed;
    width: 100%;
    top: -71px;
    margin-top: 0;
    transition: margin 0.3s;
  }
}
</style>