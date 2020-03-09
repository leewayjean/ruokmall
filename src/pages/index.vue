<template>
  <div class="index">
    <div class="container">
      <!-- 导航菜单 -->
      <div class="nav-menu">
        <div class="menu-item">
          <a href="javascript:;">手机 电话卡</a>
        </div>
        <div class="menu-item">
          <a href="javascript:;">电视 盒子</a>
        </div>
        <div class="menu-item">
          <a href="javascript:;">笔记本 平板</a>
        </div>
        <div class="menu-item">
          <a href="javascript:;">家电 插线板</a>
        </div>
        <div class="menu-item">
          <a href="javascript:;">出行 穿戴</a>
        </div>
        <div class="menu-item">
          <a href="javascript:;">耳机 音箱</a>
        </div>
        <div class="menu-item">
          <a href="javascript:;">电源 配件</a>
        </div>
        <div class="menu-item">
          <a href="javascript:;">生活 箱包</a>
        </div>
      </div>
      <!-- 轮播图 -->
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
            <a href="javascript:;">
              <img :src="slide.img" alt />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-btn swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-btn swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "index",
  data() {
    return {
        // swiper配置参数
      swiperOption: {
        effect: "cube",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination"
        },
        cubeEffect: {
          slideShadows: false,
          shadow: false
        },
        loop: true,
        autoplay: true
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      },
    //   swiper数据
      swiperSlides: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg"
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "",
          img: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "",
          img: "/imgs/slider/slide-5.jpg"
        }
      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss" scoped>
.index {
  .container {
    position: relative;
    width: 1226px;
    margin: 0 auto;
    .nav-menu {
      box-sizing: border-box;
      position: absolute;
      z-index: 99;
      width: 264px;
      height: 100%;
      background-color: rgba(105, 101, 101, 0.6);
      padding: 26px 0;
      .menu-item {
        height: 50px;
        line-height: 50px;
        &:hover {
          background: #f60;
        }
        a {
          position: relative;
          height: 50px;
          display: block;
          padding: 0px 30px;
          text-decoration: none;
          color: #fff;
          font-size: 16px;
          &:after {
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-7.5px);
            content: "";
            display: inline-block;
            width: 10px;
            height: 15px;
            background: url(../assets/img/index/icon-arrow.png) no-repeat;
            background-size: 10px 15px;
            background-position: center;
          }
        }
      }
    }
    .swiper-box {
      width: 100%;
      height: 451px;
      .swiper-container {
        .swiper-btn {
          color: #f5f5f5;
          width: 41px;
          height: 69px;
          background-size: 22px;
          background-color: rgba($color: #000000, $alpha: 0);
          &:hover {
            background-color: rgba($color: #000000, $alpha: 0.5);
          }
        }
        .swiper-button-prev {
          position: absolute;
          left: 264px;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
        .swiper-button-next {
          right: 0;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }
      }
      img {
        width: 100%;
        height: 451px;
      }
    }
  }
}
</style>