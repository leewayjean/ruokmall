<template>
  <div class="order-comfirm">
    <order-header title="确认订单"></order-header>
    <!-- 订单信息区 -->
    <div class="order-info-area">
      <div class="container">
        <div class="order-content">
          <!-- 收获地址 -->
          <section class="address-wrapper">
            <h3>收货地址</h3>
            <div class="address">
              <div
                class="addr-box user-address"
                :class="{selected:isSelected}"
                @click.once="isSelected = true"
              >
                <h4 class="consignee">{{usualAddress.receiverName}}</h4>
                <p class="phone">{{usualAddress.receiverMobile}}</p>
                <p
                  class="address"
                >{{usualAddress.receiverProvince}} {{usualAddress.receiverCity}} {{usualAddress.receiverDistrict}}</p>
                <p class="address">{{usualAddress.receiverAddress}}</p>
                <span class="btn-modify" v-if="isSelected">修改</span>
              </div>
              <div class="addr-box add-address">
                <span class="icon-plus">+</span>
                <span class="text">添加新地址</span>
              </div>
            </div>
          </section>
          <!-- 商品及优惠 -->
          <section class="product-wrapper">
            <h3>商品及优惠券</h3>
            <ul class="product-list">
              <li class="product-item" v-for="(item,index) in selectedProductList" :key="index">
                <div class="col col-img">
                  <img v-lazy="item.productMainImage" alt />
                </div>
                <div class="col col-name">
                  <a href>{{item.productName}}</a>
                </div>
                <div class="col col-price">{{item.productPrice}} x {{item.quantity}}</div>
                <div class="col col-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </section>
          <!-- 配送方式 -->
          <section class="dilivery-ways">
            <h3>配送方式</h3>
            <span class="ways">包邮</span>
          </section>
          <!-- 订单预览 -->
          <section class="order-views-wrapper">
            <div class="left"></div>
            <ul class="order-views">
              <li>
                <span>商品件数:</span>
                <span>7件</span>
              </li>
              <li>
                <span>商品件数:</span>
                <span>7件</span>
              </li>
              <li>
                <span>商品件数:</span>
                <span>7件</span>
              </li>
              <li>
                <span>商品件数:</span>
                <span>7件</span>
              </li>
              <li>
                <span>商品件数:</span>
                <span>7件</span>
              </li>
            </ul>
          </section>
        </div>
        <div class="order-footer">
          <div class="reveiver-address">
            <p v-show="isSelected">{{usualAddress.receiverName}} {{usualAddress.receiverMobile}}</p>
            <p v-show="isSelected">
              {{usualAddress.receiverProvince}} {{usualAddress.receiverCity}} {{usualAddress.receiverDistrict}}{{usualAddress.receiverAddress}}
              <span>修改</span>
            </p>
          </div>
          <div class="btn-group">
            <span class="btn btn-back" @click="$router.push({name:'cart'})">返回购物车</span>
            <span class="btn btn-pay" @click="toOrder">去结算</span>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <Modal :modalShow="false"></Modal>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader";
import Modal from "../components/Modal";
import { getCartList } from "../api";
export default {
  name: "confirm-order",
  data() {
    return {
      selectedProductList: [],
      usualAddress: {},
      isSelected: false
    };
  },
  methods: {
    toOrder() {
      this.$router.push({
        name: 'orderPay'
      });
    },
    getAddress() {
      this.$axios
        .get("/shippings", {
          params: {
            pageNum: 1,
            pageSize: 1
          }
        })
        .then(res => {
          console.log(res);
          this.usualAddress = res.list[0];
        });
    }
  },
  components: {
    OrderHeader,
    Modal
  },
  mounted() {
    this.getAddress();
    getCartList().then(res => {
      this.selectedProductList = res.cartProductVoList.filter(item => {
        return item.productSelected;
      });
    });
  }
};
</script>

<style lang="scss" >
.order-comfirm {
  color: #333;
  .order-info-area {
    padding: 40px 0 60px;
    background-color: #f5f5f5;
    .container {
      width: 1226px;
      margin: 0 auto;
      .order-content {
        box-sizing: border-box;
        padding: 48px;
        background-color: #fff;
        h3 {
          font-size: 18px;
          line-height: 40px;
        }
        .address-wrapper {
          margin-bottom: 24px;
          .address {
            display: flex;
            .addr-box {
              box-sizing: border-box;
              width: 268px;
              height: 178px;
              border: 1px solid #e0e0e0;
              cursor: pointer;
              &.user-address {
                position: relative;
                margin-right: 17px;
                padding: 16px 24px;
                &.selected {
                  border-color: #ff6700;
                }
                .consignee {
                  font-size: 18px;
                  color: #333;
                  margin-bottom: 10px;
                }
                p {
                  font-size: 14px;
                  color: #757575;
                  line-height: 22px;
                }
                .btn-modify {
                  position: absolute;
                  right: 24px;
                  bottom: 16px;
                  font-size: 14px;
                  color: #ff6700;
                }
              }
              &.add-address {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #b0b0b0;
                transition: color 0.4s, background-color 0.4s, border-color 0.4s;
                &:hover {
                  color: #757575;
                  border-color: #757575;
                  .icon-plus {
                    background-color: #757575;
                  }
                }
                .icon-plus {
                  width: 30px;
                  height: 30px;
                  line-height: 30px;
                  background: #e0e0e0;
                  border-radius: 50%;
                  text-align: center;
                  font-weight: bolder;
                  color: #fff;
                  font-size: 26px;
                  margin-bottom: 10px;
                }
              }
            }
          }
        }
        .product-wrapper {
          .product-list {
            border-top: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
            padding: 5px 0;
            .product-item {
              display: flex;
              height: 50px;
              font-size: 14px;
              color: #424242;
              .col {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .col-img {
                width: 30px;
                margin-right: 10px;
                img {
                  width: 30px;
                }
              }
              .col-name {
                justify-content: flex-start;
                width: 650px;
                a {
                  color: #424242;
                }
              }
              .col-price {
                width: 150px;
              }
              .col-total {
                width: 230px;
                color: #ff6700;
                padding-left: 60px;
              }
            }
          }
        }
        .dilivery-ways {
          height: 90px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          .ways {
            color: #ff6700;
            margin-left: 70px;
          }
        }
        .order-views-wrapper {
          display: flex;
          justify-content: space-between;
          .order-views {
          }
        }
      }
      .order-footer {
        display: flex;
        justify-content: space-between;
        border-top: 2px solid #f5f5f5;
        padding: 20px 48px;
        background-color: #fff;
        .reveiver-address {
          font-size: 14px;
          color: #424242;
          line-height: 21px;
          span {
            cursor: pointer;
            color: #ff6700;
          }
        }
        .btn {
          margin-left: 30px;
          display: inline-block;
          width: 160px;
          height: 40px;
          font-size: 14px;
          line-height: 40px;
          text-align: center;
          border: 1px solid #b0b0b0;
          cursor: pointer;
          &.btn-back {
            color: rgba(0, 0, 0, 0.27);
            border-color: rgba(0, 0, 0, 0.27);
          }
          &.btn-pay {
            background: #ff6700;
            border-color: #ff6700;
            color: #fff;
            transition: all 0.4s;
            &:hover {
              background-color: #f25807;
              border-color: #f25807;
            }
          }
        }
      }
    }
  }
}
</style>