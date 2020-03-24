<template>
  <div class="detail">
    <product-params :productName="product.name" v-if="product.name" :btnShow="false"></product-params>
    <div class="container">
      <!-- 商品轮播 -->
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in subImages" :key="index">
            <img v-lazy="item" alt />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-btn swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-btn swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 商品选项 -->
      <div class="product-detail-box">
        <h3 class="product-name">{{product.name}}</h3>
        <p class="product-subtitle">{{product.subtitle}}</p>
        <p class="owner">小米自营</p>
        <p class="product-price">
          <span class="price-discount">{{product.price}}元</span>
          <span class="price" v-if="product.discount">2599元</span>
        </p>
        <!-- 地址 -->
        <div class="address-box"></div>
        <!-- 版本 颜色 -->
        <h5>选择版本</h5>
        <div class="options">
          <ul>
            <li
              class="options-item"
              :class="{'is-selected':isSelected === index}"
              @click="isSelected = index"
              v-for="(item,index) in options"
              :key="index"
            >
              <span class="name">{{item.name}}</span>
              <span class="price">{{item.price}}</span>
            </li>
          </ul>
        </div>
        <h5>选择颜色</h5>
        <div class="options">
          <ul>
            <li
              class="options-item"
              :class="{'is-selected':selectedColor === index}"
              @click="selectedColor = index"
              v-for="(item,index) in colorOptions"
              :key="index"
            >
              <span class="name">{{item.color}}</span>
            </li>
          </ul>
        </div>
        <div class="selected-box">
          <p class="product-info">
            <span class="name">{{product.name}}</span>
            <span class="price">{{product.price}}元</span>
          </p>
          <p class="total-price">总计：{{product.price}}元</p>
        </div>
        <div class="addCart-box">
          <span class="btn-add" @click="addToCart">加入购物车</span>
          <span class="btn-like">收藏</span>
        </div>
      </div>
    </div>
    <div class="tips-box">
      <div class="wrapper">
        <h3>价格说明</h3>
        <p>
          <strong>划线价:</strong>
          商品展示的划线价格为参考价，该价格可能时品牌专柜标价、商品吊牌价。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import {getProductDetail} from '../api'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ProductParams from "../components/ProductParams";
export default {
  name: "detail",
  data() {
    return {
      id: this.$route.params.id,
      isSelected: 0, //选择的规格
      selectedColor: 0, //选择的颜色
      // swiper配置参数
      swiperOption: {
        allowTouchMove: false,
        speed: 500,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        },
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      },
      subImages: [
        "/imgs/subImages/sub-img-2.jpg",
        "/imgs/subImages/sub-img-3.jpg",
        "/imgs/subImages/sub-img-1.jpg"
      ],
      //   规格
      options: [
        {
          name: "12GB+512GB ",
          price: "5999元 "
        },
        {
          name: "8GB+256GB ",
          price: "4999元"
        },
        {
          name: "8GB+256GB ",
          price: "4999元"
        }
      ],
      //   颜色
      colorOptions: [
        {
          color: "红色 ",
          hex: "f00 "
        },
        {
          color: "绿色 ",
          hex: "#0f0"
        }
      ],
      product: {}
    };
  },
  methods: {
    getProduct() {
      getProductDetail(this.id).then(res => {
        this.product = res;
      });
    },
    addToCart() {
      this.$axios
        .post("/carts", {
          productId: this.id,
          selected: true
        })
        .then(res => {
          // 添加购物车成功
          this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
          this.$router.push(`/buySuccess/${this.id}`);
        });
    }
  },
  mounted() {
    this.getProduct();
  },
  components: {
    ProductParams,
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss" >
.detail {
  .container {
    width: 1226px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
    .swiper-box {
      width: 560px;
      height: 560px;
      margin-top: 30px;
      .swiper-container {
        position: relative;
        height: inherit;
        img[lazy="loading"] {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        img[lazy="loaded"] {
          width: 100%;
          height: 100%;
        }
        // 分页器
        .swiper-pagination {
          left: 50%;
          bottom: 20px;
          transform: translate(-50%, 0);
          display: inline-block;
          width: auto;
          .my-bullet {
            display: inline-block;
            margin: 0 5px;
            background: #ccc;
            width: 50px;
            border-radius: 0;
            border: 0;
            height: 2px;
            outline: none;
            cursor: pointer;
            &.my-bullet-active {
              background: #a3a3a3;
            }
          }
        }
        // 切换按钮
        .swiper-btn {
          color: #f5f5f5;
          width: 41px;
          height: 69px;
          background: url(/imgs/slider/icon-slides.png) no-repeat;
          background-size: auto 69px;
          background-color: rgba($color: #000000, $alpha: 0);
          &.swiper-button-prev {
            position: absolute;
            left: 0;
            top: 50%;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
            background-position: -84px top;
            &:hover {
              background-position: left top;
            }
          }
          &.swiper-button-next {
            right: 0;
            top: 50%;
            background-position: -124px top;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
            &:hover {
              background-position: -41px top;
            }
          }
          &:focus {
            outline: none;
          }
        }
      }
    }
    .product-detail-box {
      width: 606px;
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
        padding: 30px 0px 0px;
        font-size: 18px;
        color: #333;
      }
      .options {
        display: flex;
        justify-content: space-between;
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .options-item {
            box-sizing: border-box;
            width: 298px;
            height: 50px;
            border: 1px solid #e0e0e0;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #333;
            cursor: pointer;
            margin-top: 15px;
            .name {
              padding: 0 30px;
            }
            .price {
              color: #b0b0b0;
            }
          }
          .is-selected {
            border-color: #f60;
            color: #f60;
            .price {
              color: #757575;
            }
          }
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
          cursor: pointer;
          transition: background-color .4s;
          &:hover{
            background-color: #f25807;
          }
        }
        .btn-like {
          display: inline-block;
          width: 142px;
          height: 54px;
          text-align: center;
          background-color: #b0b0b0;
          cursor: pointer;
        }
      }
    }
  }
  .tips-box {
    background-color: #f5f5f5;
    padding-bottom: 50px;
    .wrapper {
      width: 1226px;
      margin: 0 auto;
      h3 {
        font-size: 22px;
        color: #333;
        padding: 22px 0;
        font-weight: normal;
      }
      p {
        padding: 40px 88px;
        background-color: #fff;
        font-size: 16px;
        color: #757575;
        line-height: 40px;
        strong {
          color: #333;
        }
      }
    }
  }
}
</style>