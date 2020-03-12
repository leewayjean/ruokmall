<template>
  <header class="header">
    <!-- 顶部导航条 -->
    <nav class="nav-topbar">
      <div class="container">
        <!-- 菜单导航 -->
        <ul class="topbar-menu">
          <li>
            <a href="javascript:;">小米商城</a>
          </li>
          <li>
            <a href="javascript:;">MIUI</a>
          </li>
          <li>
            <a href="javascript:;">IoT</a>
          </li>
          <li>
            <a href="javascript:;">云服务</a>
          </li>
          <li>
            <a href="javascript:;">金融</a>
          </li>
          <li>
            <a href="javascript:;">有品</a>
          </li>
          <li>
            <a href="javascript:;">小爱开放平台</a>
          </li>
          <li>
            <a href="javascript:;">企业团购</a>
          </li>
          <li>
            <a href="javascript:;">资质证照</a>
          </li>
          <li>
            <a href="javascript:;">协议规则</a>
          </li>
        </ul>
        <!-- 用户信息 -->
        <ul class="topbar-user">
          <li>
            <a href="javascript:;">登录</a>
          </li>
          <li>
            <a href="javascript:;">注册</a>
          </li>
          <li class="my-cart">
            <a href="javascript:;">
              <span class="icon-cart"></span>
              购物车(0)
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- 头部导航 -->
    <div class="nav-header">
      <div class="container">
        <!-- logo -->
        <div class="header-logo">
          <a href="/#" class="icon-logo"></a>
        </div>
        <!-- 导航菜单 -->
        <ul class="header-menu">
          <li class="menu-item">
            <span class="item-name">小米手机</span>
            <ul class="children">
              <li v-for="(item,index) in productList[0]" :key="index" class="product-item">
                <a href="javascript:;">
                  <img :src="item.mainImage" class="product-img" />
                  <p class="product-name">{{item.name}}</p>
                  <p class="product-price">{{item.price}}</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <span class="item-name">Redmi红米</span>
            <ul class="children">
              <li v-for="(item,index) in productList[1]" :key="index" class="product-item">
                <a href="javascript:;">
                  <img :src="item.mainImage" class="product-img" />
                  <p class="product-name">{{item.name}}</p>
                  <p class="product-price">{{item.price}}</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <span class="item-name">电视</span>
            <ul class="children">
              <li v-for="(item,index) in productList[2]" :key="index" class="product-item">
                <a href="javascript:;">
                  <img :src="item.mainImage" class="product-img" />
                  <p class="product-name">{{item.name}}</p>
                  <p class="product-price">{{item.price}}</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <!-- 搜索框 -->
        <div class="header-search">
          <input type="text" class="search-input" :placeholder="placeholderValue" />
          <a href="javascript:;" class="search-btn"></a>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { getProductList } from "../api/index";
export default {
  name: "nav-header",
  data() {
    return {
      productList: [],
      placeholderValue: "小米手机10"
    };
  },
  mounted() {
    const searchInput = document.querySelector(".search-input");
    const headerSearch = document.querySelector(".header-search");
    const searchBtn = document.querySelector(".search-btn");
    searchInput.addEventListener("focus", () => {
      headerSearch.classList.add("input-focus");
      searchBtn.style.borderLeftColor = "#f60";
    });
    searchInput.addEventListener("blur", () => {
      headerSearch.classList.remove("input-focus");
      searchBtn.style.borderLeftColor = "#e0e0e0";
    });
    getProductList({
      categoryId: "100012",
      pageSize: 18
    }).then(res => {
      let productList = [];
      for (let i = 1; i < 4; i++) {
        let listArr = res.list.slice((i - 1) * 6, i * 6);
        productList.push(listArr);
      }
      console.log(productList);
      this.productList = productList;
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/config.scss";
.header {
  // nav-topbar
  .nav-topbar {
    width: 100%;
    height: 39px;
    background-color: $colorB;
    .container {
      width: 1226px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      ul {
        display: flex;
        li {
          &:hover a {
            color: #fff;
          }
          display: inline-block;
          line-height: 39px;
          a {
            font-size: 12px;
            text-decoration: none;
            color: #b0b0b0;
            transition: color 0.5s;
          }
        }
      }
      .topbar-menu {
        height: 39px;
        box-sizing: border-box;
        li {
          margin-right: 17px;
        }
      }
      .topbar-user {
        .my-cart {
          display: inline-block;
          text-align: center;
          width: 110px;
          height: 39px;
          background: $colorA;
          a {
            color: #fff;
            font-weight: normal;
            &:hover {
              color: #fff;
            }
          }
        }
        li {
          margin-right: 19px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  // nav-header
  .nav-header {
    .container {
      position: relative;
      width: 1226px;
      height: 112px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-logo {
        width: 55px;
        height: 55px;
        overflow: hidden;
        background-color: $colorA;
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
      .header-menu {
        margin-left: -195px;
        .menu-item {
          display: inline-block;
          font-size: 16px;
          color: #333;
          margin-right: 20px;
          cursor: pointer;
          transition: color 0.4s;
          &:hover {
            color: $colorA;
            .children {
              opacity: 1;
              height: 220px;
              border-top: 1px solid #e5e5e5;
              .product-item a {
                display: block;
              }
            }
          }
          .item-name {
            display: inline-block;
            height: 112px;
            line-height: 112px;
          }
          .children {
            display: flex;
            position: absolute;
            left: 0;
            opacity: 0;
            top: 112px;
            z-index: 999;
            width: 1226px;
            height: 0px;
            background-color: #fff;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            transition: all 0.3s ease-in-out;
            .product-item {
              width: 204px;
              box-sizing: border-box;
              a {
                display: none;
                text-align: center;
                font-size: 12px;
                text-decoration: none;
                .product-img {
                  margin-top: 26px;
                  width: auto;
                  height: 111px;
                }
                .product-name {
                  color: $colorB;
                  font-weight: bold;
                  padding: 28px 0 8px;
                }
                .product-price {
                  color: $colorA;
                }
              }
            }
          }
        }
      }
      .header-search {
        transition: border 0.5s;
        width: 317px;
        height: 50px;
        box-sizing: border-box;
        border: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search-input {
          font-size: 12px;
          color: #333;
          flex: 1;
          padding: 2px 10px;
          border: none;
          outline: none;
        }
        .search-btn {
          transition: border 0.5s;
          display: inline-block;
          width: 55px;
          height: 50px;
          border-left: 1px solid #e0e0e0;
          background: url(../assets/img/navheader/icon-search.png) no-repeat;
          background-size: 18px;
          background-position: center;
        }
      }
      .input-focus {
        border-color: #f60;
      }
    }
  }
}
</style>