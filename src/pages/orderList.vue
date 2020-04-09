<template>
  <div class="order-list">
    <order-header title="我的订单"></order-header>
    <main>
      <div class="order-container">
        <!-- loading -->
        <Loadding v-show="showLoading" />
        <!-- 订单列表 -->
        <transition name="fade">
          <div v-if="!showLoading">
            <div class="title">
              <h2>所有订单(仅显示最近5个订单)</h2>
              <p>请谨防钓鱼链接或诈骗电话</p>
            </div>
            <div class="order-list-nav">全部有效订单</div>
            <div class="order-list-body" v-for="(item,index) in orderList" :key="index">
              <div class="order-status">
                <span class="status">{{item.statusDesc}}</span>
                <div class="order-info">
                  <div>
                    <span class="date">{{item.createTime}}</span>
                    <span class="split">|</span>
                    <span class="receiver">{{item.receiverName}}</span>
                    <span class="split">|</span>
                    <span class="orderNo">订单号:{{item.orderNo}}</span>
                    <span class="split">|</span>
                    <span>{{item.paymentTypeDesc}}</span>
                  </div>
                  <div class="total-price">
                    应付金额:
                    <span class="num">{{item.payment}}</span>元
                  </div>
                </div>
              </div>
              <div class="order-product-list">
                <div class="order-actioins">
                  <div class="btn btn-primary">立即付款</div>
                  <div class="btn">订单详情</div>
                  <div class="btn">联系客服</div>
                </div>
                <ul>
                  <li class="product-item" v-for="(productItem,i) in item.orderItemVoList" :key="i">
                    <a href>
                      <img :src="productItem.productImage" alt />
                    </a>
                    <div>
                      <p class="product-name">
                        <a href>{{productItem.productName}}</a>
                      </p>
                      <p class="price">{{productItem.currentUnitPrice}}x{{productItem.quantity}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader";
import Loadding from "../components/Loadding";
export default {
  name: "order-list",
  data() {
    return {
      orderList: [],
      showLoading: true
    };
  },
  components: {
    OrderHeader,
    Loadding
  },
  mounted() {
    this.$axios.get("/orders").then(res => {
      console.log(res);
      this.orderList = res.list.slice(0, 5);
      this.showLoading = false;
    });
  }
};
</script>

<style lang="scss">
.order-list {
  main {
    background: #f5f5f5;
    padding: 30px 0;
    .order-container {
      box-sizing: border-box;
      width: 1226px;
      margin: 0 auto;
      padding: 36px 48px;
      background: #fff;
      .fade-enter-active,
      .fade-leave-active {
        transition: all 1s ease;
      }
      .fade-enter,
      .fade-leave-to {
        transform: translateY(100px);
        opacity: 0;
      }
      .title {
        width: 100%;
        display: flex;
        color: #757575;
        line-height: 68px;
        h2 {
          font-size: 30px;
        }
        p {
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .order-list-nav {
      color: #ff6700;
      font-size: 16px;
      padding: 18px 0;
    }
    .order-list-body {
      border: 1px solid #e0e0e0;
      margin-bottom: 20px;
      background: #fff;
      .order-status {
        padding: 25px 30px;
        border-bottom: 1px solid #e0e0e0;
        .status {
          font-size: 18px;
          color: #ff6700;
        }
        .order-info {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #757575;
          .split {
            margin: 0 3.5px;
          }
          .total-price {
            line-height: 0;
            .num {
              font-size: 28px;
              color: #333;
            }
          }
        }
      }
      .order-product-list {
        position: relative;
        padding: 10px 30px;
        .order-actioins {
          position: absolute;
          right: 30px;
          top: 20px;
          .btn {
            margin-bottom: 10px;
            box-sizing: border-box;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #b0b0b0;
            font-size: 12px;
            color: #757575;
            background: #fff;
            &.btn-primary {
              color: #fff;
              border-color: #ff6700;
              background: #ff6700;
            }
          }
        }
        .product-item {
          display: flex;
          min-height: 100px;
          margin: 10px 0;
          font-size: 14px;
          color: #333;
          img {
            width: 80px;
            margin-right: 40px;
          }
          .product-name {
            padding: 15px 0 3px;
            a {
              color: #333;
            }
          }
          .product-price {
          }
        }
      }
    }
  }
}
</style>