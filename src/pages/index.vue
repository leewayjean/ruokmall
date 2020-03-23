<template>
  <div class="index">
    <!-- 页面菜单及促销部分 -->
    <section class="menu-banner-area">
      <div class="container">
        <div class="banner-wrapper">
          <!-- 导航菜单 -->
          <div class="nav-menu">
            <div class="menu-item" v-for="(categoryItem,index) in categories" :key="index">
              <a href="javascript:;" class="item-name">{{categoryItem.name}}</a>
              <div class="children-box">
                <ul v-for="(item,i) in categoryItem.list" :key="i">
                  <li v-for="(it,j) in item" :key="j" class="product-item">
                    <a href="javascript:;">
                      <img :src="it.imgSrc" alt />
                      <span>{{it.title}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 轮播图 -->
          <div class="swiper-box">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <router-link :to="'/product/'+slide.id">
                  <img :src="slide.img" alt />
                </router-link>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-btn swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-btn swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </div>
        <!-- 促销商品 -->
        <ul class="product-promo-list">
          <li v-for="(item,index) in promoList" :key="index">
            <a href="javascript:;">
              <img v-lazy="item.img" alt />
            </a>
          </li>
        </ul>
        <!-- 发布会活动海报 -->
        <a href="javascript:;" class="activity-link">
          <img v-lazy="'/imgs/activity/mi-10.jpg'" alt />
        </a>
      </div>
    </section>
    <!-- 商品列表部分 -->
    <section class="product-list-area">
      <div class="container">
        <div class="product-list-wrapper">
          <!-- 分类标题 -->
          <h3 class="category-title">手机</h3>
          <!-- 容器 -->
          <section>
            <!-- 主推产品 -->
            <div class="import-product">
              <a href="javascript:;">
                <img v-lazy="'/imgs/phone/mix-alpha.jpg'" alt />
              </a>
            </div>
            <!-- 产品列表 -->
            <div class="product-list">
              <ul v-for="(phone,index) in phoneList" :key="index">
                <li class="product-list-item" v-for="(item,index) in phone" :key="index">
                  <a href="javascript:;">
                    <img v-lazy="item.mainImage" alt />
                    <p class="product-name">{{item.name}}</p>
                    <p class="product-subtitle">{{item.subtitle}}</p>
                    <p class="product-price">{{item.price}}元起</p>
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getProductList } from "../api/index";
export default {
  name: "index",
  data() {
    return {
      // swiper配置参数
      swiperOption: {
        allowTouchMove: false,
        speed: 1000,
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
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
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
          id: "33",
          img: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "22",
          img: "/imgs/slider/slide-5.jpg"
        }
      ],
      //   商品推荐
      promoList: [
        {
          id: "42",
          img: "/imgs/promo/promo-1.png"
        },
        {
          id: "45",
          img: "/imgs/promo/promo-2.png"
        },
        {
          id: "46",
          img: "/imgs/promo/promo-3.png"
        },
        {
          id: "",
          img: "/imgs/promo/promo-4.png"
        }
      ],
      //   手机商品列表
      phoneList: [],
      //categories
      categories: [
        {
          name: "手机 电话卡",
          list: [
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ]
          ]
        },
        {
          name: "电视 盒子",
          list: [
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ]
          ]
        },
        {
          name: "笔记本 平板",
          list: [
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ]
          ]
        },
        {
          name: "家电 插线板",
          list: [
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ]
          ]
        },
        {
          name: "出行 穿戴",
          list: [
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ]
          ]
        },
        {
          name: "电源 配件",
          list: [
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ]
          ]
        },
        {
          name: "生活 箱包",
          list: [
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              }
            ]
          ]
        },
        {
          name: "健康 儿童",
          list: [
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "RedMi note8",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              },
              {
                title: "小米Mix3",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              },
              {
                title: "Redmi红米",
                imgSrc: "/imgs/productList/phone-3.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              }
            ],
            [
              { title: "小米10", imgSrc: "/imgs/productList/phone.png", id: 1 },
              {
                title: "小米10Pro",
                imgSrc: "/imgs/productList/phone-1.png",
                id: 1
              },
              {
                title: "小米CC9",
                imgSrc: "/imgs/productList/phone-2.png",
                id: 1
              }
            ]
          ]
        }
      ]
    };
  },
  mounted() {
    getProductList({ categoryId: "100012", pageSize: 8 }).then(res => {
      let phoneList = [];
      phoneList.push(res.list.slice(0, 4), res.list.slice(4, 8));
      this.phoneList = phoneList;
      console.log(this.phoneList);
    });
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss" >
.index {
  // 菜单与banner部分
  .menu-banner-area {
    background-color: #fff;
    .container {
      width: 1226px;
      margin: 0 auto;
      // 轮播图和菜单
      .banner-wrapper {
        position: relative;
        .nav-menu {
          box-sizing: border-box;
          position: absolute;
          z-index: 99;
          width: 234px;
          height: 100%;
          background-color: rgba(105, 101, 101, 0.6);
          padding: 26px 0;
          .menu-item {
            height: 50px;
            line-height: 50px;
            .item-name {
              position: relative;
              height: 50px;
              display: block;
              padding: 0px 30px;
              text-decoration: none;
              color: #fff;
              font-size: 14px;
              &:after {
                content: "";
                position: absolute;
                right: 30px;
                top: 50%;
                transform: translateY(-7.5px);
                display: inline-block;
                width: 10px;
                height: 15px;
                background: url(../assets/img/index/icon-arrow.png) no-repeat;
                background-size: 10px 15px;
                background-position: center;
              }
            }
            .children-box {
              display: none;
              position: absolute;
              left: 234px;
              top: 0;
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
              ul {
                width: 248px;
                height: 451px;
                background-color: #fff;
                .product-item {
                  width: 100%;
                  a {
                    position: relative;
                    width: 100%;
                    padding: 10px 0;
                    display: inline-block;
                    text-decoration: none;
                    color: #333;
                    font-size: 14px;
                    img {
                      width: 40px;
                      height: 40px;
                      margin: 0 20px 0 12px;
                      vertical-align: middle;
                    }
                    span {
                      vertical-align: middle;
                    }
                    &:hover {
                      color: #f60;
                    }
                  }
                }
              }
            }
            &:hover {
              background: #f60;
              .children-box {
                display: flex;
              }
            }
          }
        }
        .swiper-box {
          width: 100%;
          height: 451px;
          .swiper-container {
            position: relative;
            .swiper-wrapper a{
              display: inline-block;
            }
            // 分页器
            .swiper-pagination {
              display: inline-block;
              position: absolute;
              left: auto;
              right: 30px;
              bottom: 20px;
              width: auto;
              .my-bullet {
                display: inline-block;
                margin: 0 4px;
                width: 6px;
                height: 6px;
                border: 2px solid #fff;
                border-color: hsla(0, 0%, 100%, 0.3);
                border-radius: 10px;
                overflow: hidden;
                background: rgba(0, 0, 0, 0.4);
                opacity: 1;
                outline: none;
                cursor: pointer;
                &.my-bullet-active {
                  background: hsla(0, 0%, 100%, 0.4);
                  border-color: rgba(0, 0, 0, 0.4);
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
                left: 234px;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
                background-position: -84px top;
                &:hover {
                  background-position: left top;
                }
              }
              &.swiper-button-next {
                right: 0;
                background-position: -124px top;
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
                &:hover {
                  background-position: -41px top;
                }
              }
              &:focus{
                outline: none;
              }
            }
          }
          img {
            width: 100%;
            height: 451px;
          }
        }
      }
      // 促销列表
      .product-promo-list {
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        li {
          a {
            display: inline-block;
            position: relative;
            background-color: #f5f5f5;
            width: 296px;
            height: 167px;
            img[lazy="loading"] {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 140px;
              height: 140px;
            }
            img[lazy="loaded"] {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      // 活动
      .activity-link {
        display: inline-block;
        background-color: #f5f5f5;
        width: 100%;
        height: 120px;
        margin: 31px 0 50px;
        position: relative;
        img[lazy="loading"] {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
        }
        img[lazy="loaded"] {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  //   产品部分
  .product-list-area {
    background-color: #f5f5f5;
    .container {
      width: 1226px;
      margin: 0 auto;
      .product-list-wrapper {
        .category-title {
          font-size: 22px;
          color: #333;
          padding: 30px 0 20px;
        }
        section {
          display: flex;
          justify-content: space-between;
          //   添加过渡
          a {
            transition: all 0.3s;
            &:hover {
              transform: translateY(-3px);
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            }
          }
          // 重磅产品
          .import-product {
            margin-right: 16px;
            a {
              display: inline-block;
              width: 224px;
              height: 619px;
              background-color: #fff;
              position: relative;
              img[lazy="loading"] {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 140px;
                height: 140x;
              }
              img[lazy="loaded"] {
                /*your style here*/
                width: 224px;
                height: 619px;
              }
            }
          }
          // 产品列表
          .product-list {
            ul {
              li {
                display: inline-block;
                margin-right: 14px;
                margin-bottom: 14px;
                &:nth-last-child(1) {
                  margin-right: 0;
                }
                a {
                  box-sizing: border-box;
                  display: inline-block;
                  width: 236px;
                  height: 302px;
                  background-color: #fff;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  padding: 50px 0 30px;
                  text-decoration: none;
                  img {
                    width: auto;
                    height: 140px;
                    padding: 0 0 10px;
                  }
                  .product-name {
                    font-size: 14px;
                    color: #333;
                    font-weight: bold;
                    padding: 10px 0;
                  }
                  .product-subtitle {
                    font-size: 12px;
                    color: #999;
                    padding: 0 0 20px;
                  }
                  .product-price {
                    font-size: 14px;
                    color: #f60;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>