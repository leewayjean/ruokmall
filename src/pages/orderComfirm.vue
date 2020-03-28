<template>
  <div class="order-comfirm">
    <order-header title="确认订单"></order-header>
    <!-- 订单信息区 -->
    <div class="order-info-area">
      <div class="container">
        <div class="order-section" v-if="addressList.length >0 ||selectedProductList.length >0">
          <div class="order-content">
            <!-- 收获地址 -->
            <section class="address-wrapper">
              <h3>收货地址</h3>
              <div class="address">
                <div
                  v-for="(item,index) in addressList"
                  :key="index"
                  class="addr-box user-address"
                  :class="{selected:isSelected === index + 1}"
                  @click="chooseAddress(item,index)"
                >
                  <h4 class="consignee">{{item.receiverName}}</h4>
                  <p class="phone">{{item.receiverMobile}}</p>
                  <p>{{item.receiverProvince}} {{item.receiverCity}} {{item.receiverDistrict}}</p>
                  <p>{{item.receiverAddress}}</p>
                  <p class="footer" v-if="isSelected === index + 1">
                    <span class="iconfont icon-delete" @click="delModalShow = true"></span>
                    <span class="btn-modify" @click="modifyAddress(item)">修改</span>
                  </p>
                </div>
                <div class="addr-box add-address" @click="modalShow = true">
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
              <div class="right">
                <ul class="title-list">
                  <li>商品件数:</li>
                  <li>商品总价:</li>
                  <li>活动优惠:</li>
                  <li>优惠券抵扣:</li>
                  <li>运费:</li>
                  <li class="total-price-title">应付总额:</li>
                </ul>
                <ul class="nums-list">
                  <li>{{quantityTotal}}件</li>
                  <li>{{productTotal}}元</li>
                  <li>-0元</li>
                  <li>-0元</li>
                  <li>0元</li>
                  <li>
                    <span class="total-price">{{productTotal}}</span> 元
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <!-- 底栏 -->
          <div class="order-footer" v-if="isSelected !== 0">
            <div class="reveiver-address">
              <p v-show="isSelected">{{userInfo}}</p>
              <p v-show="isSelected">
                {{address}}
                <span>修改</span>
              </p>
            </div>
            <div class="btn-group">
              <span class="btn btn-back" @click="$router.push({name:'cart'})">返回购物车</span>
              <span class="btn btn-pay" @click="toOrder">去下单</span>
            </div>
          </div>
        </div>
        <!-- loading -->
        <div class="spinner" v-show="showLoading">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
    </div>
    <!-- 增加地址modal -->
    <Modal
      :modalShow="modalShow"
      title="添加收货地址"
      @close="modalShow = false"
      @cancle="modalShow = false"
      @confirm="addNewAddress"
    >
      <template v-slot:dialog-body>
        <form class="new-address">
          <!-- 收货人姓名 -->
          <div class="input-group">
            <div
              class="input-item"
              :class="{'input-focus':target == 1,'input-active':newAddress.receiverName != ''}"
            >
              <label for="name">姓名</label>
              <input
                type="text"
                :placeholder="target == 1?'收货人姓名':''"
                id="name"
                @focus="target = 1"
                @blur="target = 0"
                v-model="newAddress.receiverName"
              />
            </div>
            <!-- 收货人手机号 -->
            <div
              class="input-item"
              :class="{'input-focus':target == 2,'input-active':newAddress.receiverMobile != ''}"
            >
              <label for="phone">手机号</label>
              <input
                type="text"
                :placeholder="target == 2?'手机号':''"
                id="phone"
                @focus="target = 2"
                @blur="target = 0"
                v-model="newAddress.receiverMobile"
              />
            </div>
          </div>
          <!--详细地址 -->
          <div class="input-group textarea-wrapper">
            <div
              class="input-item"
              :class="{'input-focus':target == 3,'input-active':newAddress.receiverAddress != ''}"
            >
              <label for="name">详细地址</label>
              <textarea
                :placeholder="target == 3?'详细地址，路名或街道名称，门牌号':''"
                id="name"
                @focus="target = 3"
                @blur="target = 0"
                v-model="newAddress.receiverAddress"
              ></textarea>
            </div>
          </div>
          <!-- 地址标签 -->
          <div class="input-group tag-wrapper">
            <div
              class="input-item"
              :class="{'input-focus':target == 4,'input-active':newAddress.receiverAddress != ''}"
            >
              <label for="name">地址标签</label>
              <input
                type="text"
                :placeholder="target == 4?`如&quot;家&quot;、&quot;公司&quot;。限5个字内`:''"
                id="name"
                @focus="target = 4"
                @blur="target = 0"
                v-model="newAddress.receiverAddress"
              />
            </div>
          </div>
        </form>
      </template>
    </Modal>
    <!-- 删除地址modal -->
    <Modal
      :modalShow="delModalShow"
      title="删除收货地址"
      @close="delModalShow = false"
      @cancle="delModalShow = false"
      @confirm="delAddress"
      msg="确定要删除这个地址吗？"
    ></Modal>
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
      showLoading: true, //是否显示加载动画
      delModalShow: false, //是否显示删除地址弹出框
      modalShow: false, //是否显示添加地址弹出框
      target: 0, // modal组件动态绑定样式
      selectedProductList: [], //选中的商品
      addressList: [], //收货地址列表
      isSelected: 0, //选中的收获地址索引
      shippingId: null, //地址的id
      selectedAddress: {}, //用户选择的地址
      newAddress: {
        receiverName: "",
        receiverMobile: "",
        receiverProvince: "广东省",
        receiverCity: "清远市",
        receiverDistrict: "英德市",
        receiverAddress: ""
      } //新增地址
    };
  },
  computed: {
    address() {
      let {
        receiverProvince,
        receiverCity,
        receiverDistrict,
        receiverAddress
      } = this.selectedAddress;
      return `${receiverProvince} ${receiverCity} ${receiverDistrict} ${receiverAddress}`;
    },
    // 收货人信息
    userInfo() {
      let { receiverName, receiverMobile } = this.selectedAddress;
      return `${receiverName} ${receiverMobile}`;
    },
    // 总金额
    productTotal() {
      return this.selectedProductList.reduce((prev, next) => {
        return prev + next.productTotalPrice;
      }, 0);
    },
    // 总数量
    quantityTotal() {
      return this.selectedProductList.reduce((prev, next) => {
        return prev + next.quantity;
      }, 0);
    }
  },
  methods: {
    // 下单
    toOrder() {
      let { shippingId } = this;
      this.$axios
        .post("/orders", {
          shippingId
        })
        .then(res => {
          console.log(res);
          let { orderNo } = res;
          this.$router.push({
            name: "orderSuccess",
            query: {
              orderNo
            }
          });
        });
    },
    // 获取购物车列表
    getCart(resolve) {
      getCartList().then(res => {
        this.selectedProductList = res.cartProductVoList.filter(item => {
          return item.productSelected;
        });
        resolve();
      });
    },
    // 获取收货地址
    getAddress(resolve) {
      this.$axios.get("/shippings").then(res => {
        this.addressList = res.list.slice(0, 3);
        resolve();
      });
    },
    // 增加收货地址
    addNewAddress() {
      this.$axios.post("/shippings", this.newAddress).then(() => {
        this.getAddress();
        this.modalShow = false;
      });
    },
    // 删除收货地址
    delAddress() {
      this.$axios.delete(`/shippings/${this.shippingId}`).then(() => {
        this.getAddress();
        this.delModalShow = false;
      });
    },
    // 修改收货地址
    modifyAddress(item) {
      this.modalShow = true;
      this.newAddress = item;
    },
    // 选择收货地址
    chooseAddress(item, index) {
      this.isSelected = index + 1;
      this.selectedAddress = item;
      this.shippingId = item.id;
    }
  },
  components: {
    OrderHeader,
    Modal
  },
  mounted() {
    new Promise(resolve => {
      this.getAddress(resolve);
      this.getCart(resolve);
    }).then(() => {
      this.showLoading = false;
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
      .order-section {
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
              flex-wrap: wrap;
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
                    &.footer {
                      position: absolute;
                      left: 24px;
                      bottom: 16px;
                      color: #ff6700;
                      font-size: 12px;
                      .icon-delete {
                        display: inline-block;
                        margin-right: 185px;
                        transition: transform 0.3;
                        &:hover {
                          transform: scale(1.2);
                        }
                      }
                    }
                  }
                }
                &.add-address {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: #b0b0b0;
                  transition: color 0.4s, background-color 0.4s,
                    border-color 0.4s;
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
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            .right {
              display: flex;
              text-align: right;
              font-size: 14px;
              color: #757575;
              line-height: 2;
              .title-list {
                width: 126px;
                margin-right: 25px;
                & .total-price-title {
                  padding-top: 20px;
                }
              }
              .nums-list {
                color: #ff6700;
                & .total-price {
                  font-size: 30px;
                }
              }
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
    }
  }
  .new-address {
    .input-group {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      .input-item {
        position: relative;
        width: 283px;
        height: 40px;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;
        font-size: 14px;
        color: #b0b0b0;
        transition: border-color 0.4s;
        &:hover {
          border-color: #b0b0b0;
        }
        label {
          position: absolute;
          font-size: 14px;
          left: 14px;
          top: 10px;
          z-index: 333;
          background-color: #fff;
          padding: 2px 2px;
          transition: all 0.4s;
        }
        input {
          position: absolute;
          left: 0;
          top: 50%;
          outline: none;
          border: none;
          padding-left: 16px;
          transform: translateY(-50%);
          transition: all 0.5s;
          &::placeholder {
            color: #b0b0b0;
          }
        }
        &.input-focus {
          border-color: #ff6700;
          label {
            font-size: 12px;
            top: -10px;
            color: #ff6700;
          }
        }
        &.input-active {
          label {
            font-size: 12px;
            top: -10px;
          }
        }
      }
    }
    .textarea-wrapper {
      width: 100%;
      .input-item {
        width: 100%;
        height: 64px;
        label {
          top: 10px;
        }
        textarea {
          width: 100%;
          height: 100%;
          border: none;
          box-sizing: border-box;
          padding: 8px 16px;
          outline: none;
        }
      }
    }
    .tag-wrapper {
      width: 100%;
      .input-item {
        width: 100%;
        input {
          box-sizing: border-box;
          width: 100%;
        }
      }
    }
  }
}
</style>