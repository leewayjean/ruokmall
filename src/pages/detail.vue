<template>
  <div class="detail">
    <product-params></product-params>
    <div class="container">
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in subImages" :key="index">
              <img v-lazy="item" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-btn swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-btn swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="product-detail-box">
        <h3 class="product-name">小米8</h3>
        <p
          class="product-subtitle"
        >相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红 外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
        <p class="owner">小米自营</p>
        <p class="product-price">
          <span class="price-discount">2599元</span>
          <span class="price">2599元</span>
        </p>
        <div class="address-box"></div>
        <h5>选择版本</h5>
        <div class="options">
          <span class="options-item is-selected">6+64</span>
          <span class="options-item">4+64g</span>
        </div>
        <h5>选择颜色</h5>
        <div class="options">
          <span class="options-item is-selected">白色</span>
        </div>
        <div class="selected-box">
          <p class="product-info">
            <span class="name">小米4+64g</span>
            <span class="price">1999</span>
          </p>
          <p class="total-price">总计：1999元</p>
        </div>
        <div class="addCart-box">
          <span class="btn-add">加入购物车</span>
          <span class="btn-like">收藏</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ProductParams from "../components/ProductParams";
export default {
  name: "detail",
  data() {
    return {
      // swiper配置参数
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop: true,
        autoplay: true
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      },
      subImages:['/imgs/subImages/sub-img-2.jpg','/imgs/subImages/sub-img-1.jpg','/imgs/subImages/sub-img-3.jpg']
    };
  },
  methods: {
    getProduct() {
      this.$axios.get("/products/" + 3).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    // this.getProduct();
  },
  components: {
    ProductParams,
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss" scoped>
.detail {
  .container {
    width: 1226px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .swiper-box {
      width: 560px;
      height: 560px;
      margin-top: 30px;
      .swiper-container {
        position: relative;
        height: inherit;
        img[lazy=loading]{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
        img[lazy=loaded]{
            width: 100%;
            height: 100%;
        }
        .swiper-btn {
          color: #f5f5f5;
          width: 41px;
          height: 69px;
          background: url(../assets/img/index/icon-arrow.png) no-repeat;
          background-size: 18px;
          background-position: center;
          background-color: rgba($color: #000000, $alpha: 0);
          &:hover {
            background-color: rgba($color: #000000, $alpha: 0.5);
          }
        }
        .swiper-button-prev {
          position: absolute;
          left: 0;
          top: 50%;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
          transform: rotateY(180deg);
        }
        .swiper-button-next {
          right: 0;
          top: 50%;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }
      }
    }
    .product-detail-box {
      width: 586px;
      .product-name {
        font-size: 24px;
        font-weight: normal;
        color: #212121;
        padding: 30px 0 16px;
      }
      .product-subtitle {
        font-size: 14px;
        color: #999;
      }
      .owner {
        font-size: 16px;
        color: #f60;
        padding: 26px 0 14px;
      }
      .product-price {
        padding-bottom: 25px;
        border-bottom: 1px solid #e0e0e0;
        vertical-align: middle;
        .price-discount {
          font-size: 20px;
          color: #f60;
          margin-right: 10px;
        }
        .price {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
        }
      }
      h5 {
        padding: 30px 0 20px;
        font-size: 18px;
        color: #333;
      }
      .options {
        display: flex;
        justify-content: space-between;
        .options-item {
          display: inline-block;
          width: 287px;
          height: 50px;
          border: 1px solid #e0e0e0;
          text-align: center;
          line-height: 50px;
          font-size: 16px;
          color: #333;
        }
        .is-selected {
          border-color: #f60;
          color: #f60;
        }
      }
      .selected-box {
        margin: 50px 0 30px;
        height: 108px;
        padding: 0 30px;
        background-color: #fafafa;
        .product-info {
          display: flex;
          justify-content: space-between;
          padding: 24px 0 18px;
          font-size: 14px;
          color: #333;
        }
        .total-price {
          font-size: 24px;
          color: #f60;
        }
      }
      .addCart-box {
        color: #fff;
        line-height: 54px;
        .btn-add {
          display: inline-block;
          width: 300px;
          height: 54px;
          background-color: #f60;
          margin-right: 21px;
          text-align: center;
        }
        .btn-like {
          display: inline-block;
          width: 142px;
          height: 54px;
          text-align: center;
          background-color: #b0b0b0;
        }
      }
    }
  }
}
</style>