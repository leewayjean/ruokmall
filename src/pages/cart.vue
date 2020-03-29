<template>
  <div class="cart">
    <order-header title="我的购物车" :tipsShow="true"></order-header>
    <div class="main-wrapper">
      <!-- 购物车 -->
      <div class="cart-list" v-if="cartList.length > 0">
        <!-- 购物车列表头 -->
        <div class="cart-list-header">
          <div class="col col-check">
            <span class="btn-check" :class="{'checked':selectedAll}" @click="selectedAllClick">
              <i class="iconfont icon-right"></i>
            </span> 全选
          </div>
          <div class="col col-img"></div>
          <div class="col col-name">商品名称</div>
          <div class="col col-price">单价</div>
          <div class="col col-amount">数量</div>
          <div class="col col-total">小计</div>
          <div class="col col-action">操作</div>
        </div>
        <!-- 购物车列表 -->
        <ul class="cart-list-body">
          <li class="cart-list-item" v-for="(listItem,index) in cartList" :key="index">
            <div class="col col-check">
              <span
                class="btn-check"
                :class="{'checked':listItem.productSelected}"
                @click="selectedProduct(listItem.productId,listItem.productSelected)"
              >
                <i class="iconfont icon-right"></i>
              </span>
            </div>
            <div class="col col-img">
              <a href>
                <img v-lazy="listItem.productMainImage" alt />
              </a>
            </div>
            <div class="col col-name">
              <a href>{{listItem.productName}}</a>
            </div>
            <div class="col col-price">{{listItem.productPrice}}元</div>
            <div class="col col-amount">
              <div class="count">
                <span
                  class="btn minus"
                  @click="decreaseProduct(listItem.productId,listItem.quantity)"
                >-</span>
                <input
                  class="num"
                  v-model="listItem.quantity"
                  @blur="changeQuantity(listItem.productId,listItem.quantity,listItem.productStock)"
                />
                <span
                  class="btn plus"
                  @click="increaseProduct(listItem.productId,listItem.quantity,listItem.productStock)"
                >+</span>
              </div>
            </div>
            <div class="col col-total">{{listItem.productTotalPrice}}元</div>
            <div class="col col-action">
              <span class="btn-delete" @click="deleteProduct(listItem.productId)">
                <i class="iconfont icon-close"></i>
              </span>
            </div>
          </li>
        </ul>
        <!-- 购物车脚部 -->
        <div class="cart-bar">
          <a href class="backup-shopping">继续购物</a>
          <div class="count">
            <div class="total-mount">
              共
              <span class="hignlight">{{cartTotalQuantity}}</span>件商品，已选择
              <span class="hignlight">{{selectedQuantity}}</span>件
            </div>
            <div class="total-price">
              合计:
              <span class="price">{{cartTotalPrice}}</span>元
            </div>
          </div>
          <router-link
            class="btn-pay"
            :class="{active:cartTotalPrice > 0}"
            to="/order/orderComfirm"
          >去结算</router-link>
        </div>
      </div>
      <!-- 购物车为空 -->
      <div class="cart-empty" v-show="cartList.length == 0 && showLoading == false">
        <h2>你的购物车还是空的!</h2>
        <div class="btn-tobuy" @click="$router.push({name:'index'})">马上去购物</div>
      </div>
      <!-- loading -->
      <Loadding v-show="showLoading"/>
      <!-- 删除购物车商品modal -->
      <Modal
        :modalShow="delModalShow"
        title="移除商品"
        @close="delModalShow = false"
        @cancle="delModalShow = false"
        @confirm="removeProduct"
        msg="确定要移除这件商品吗？"
      ></Modal>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader";
import NavFooter from "../components/NavFooter";
import Modal from "../components/Modal";
import Loadding from "../components/Loadding";
import { getCartList, getCartCount } from "../api";
export default {
  name: "cart",
  components: {
    OrderHeader,
    NavFooter,
    Modal,
    Loadding
  },
  data() {
    return {
      delModalShow: false,
      showLoading: true,
      isEmpty: false,
      cartList: [], //购物车商品
      cartTotalQuantity: 0, //购物车总数
      selectedAll: false, //是否全选
      cartTotalPrice: 0, // 购物车总金额
      selectedQuantity: 0, // 已选择件数
      productId: 0
    };
  },
  methods: {
    storeCartCount() {
      getCartCount().then(res => {
        //未登录时，接口返回不是数字类型时，设置为0
        if (typeof res !== "number") {
          this.$store.dispatch("saveCartCount", 0);
        } else {
          this.$store.dispatch("saveCartCount", res);
        }
      });
    },
    // 修改单个商品数量
    changeQuantity(productId, quantity, productStock) {
      // 判断用户输入的是否为数字
      const NUM_REG = /^[0-9]+$/; //匹配正整数正则
      let isNumber = NUM_REG.test(quantity);
      if (isNumber) {
        if (quantity > productStock) {
          this.toast.show("商品加入购物车数量超过限购数");
          return;
        } else if (quantity <= 0) {
          this.toast.show("商品加入购物车数量不能少于1件");
          return;
        } else if (quantity === productStock) {
          return;
        }
      } else {
        this.toast.show("输入的数量只能是数字！");
        return;
      }

      this.$axios
        .put("/carts/" + productId, {
          quantity: quantity
        })
        .then(res => {
          this.renderCart(res);
        });
    },
    // 商品减一
    decreaseProduct(productId, quantity) {
      if (quantity === 1) return;
      this.$axios
        .put("/carts/" + productId, {
          quantity: --quantity
        })
        .then(res => {
          this.renderCart(res);
        });
    },
    // 商品加一
    increaseProduct(productId, quantity, productStock) {
      if (quantity === productStock) {
        this.toast.show("商品加入购物车数量超过限购数");
        return;
      }
      this.$axios
        .put("/carts/" + productId, {
          quantity: ++quantity
        })
        .then(res => {
          this.renderCart(res);
        });
    },
    // 选择商品
    selectedProduct(productId, productSelected) {
      this.$axios
        .put("/carts/" + productId, {
          selected: !productSelected
        })
        .then(res => {
          this.renderCart(res);
        });
    },
    deleteProduct(id) {
      this.delModalShow = true;
      this.productId = id;
    },
    // 移除商品
    removeProduct() {
      this.$axios.delete("/carts/" + this.productId).then(res => {
        this.renderCart(res);
        this.delModalShow = false;
      });
    },
    // 全选按钮点击
    selectedAllClick() {
      let url = this.selectedAll ? "/carts/unSelectAll" : "/carts/selectAll";
      this.$axios.put(url).then(res => {
        this.renderCart(res);
      });
    },
    // 渲染购物车数据函数
    renderCart(res) {
      this.cartList = res.cartProductVoList || [];
      this.cartTotalQuantity = res.cartTotalQuantity;
      this.selectedAll = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      // 更新购物车数量
      this.storeCartCount();
    }
  },
  mounted() {
    getCartList()
      .then(res => {
        this.renderCart(res);
      })
      .then(() => {
        // 首次加载购物车完成后关闭动画
        this.showLoading = false;
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>
<style lang="scss" scoped>
.cart {
  font-size: 14px;
  color: #424242;
  .main-wrapper {
    padding: 32px 0;
    background-color: #f5f5f5;
    .cart-list {
      width: 1226px;
      margin: 0 auto;
      /* 设置购物车每一列 */
      .col {
        display: flex;
        justify-content: center;
        align-items: center;
        &.col-check {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 110px;
          .btn-check {
            box-sizing: border-box;
            display: inline-block;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            margin: 0 15px 0 24px;
            color: #fff;
            font-weight: bold;
            transition: color 0.3s;
            cursor: pointer;
            &:hover {
              color: #424242;
            }
            &.checked {
              background-color: #f60 !important;
              border: none !important;
              &:hover {
                color: #fff;
              }
            }
          }
        }
        &.col-img {
          width: 120px;
        }
        &.col-name {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 380px;
        }
        &.col-price {
          width: 140px;
          padding-right: 18px;
        }
        &.col-amount {
          width: 150px;
        }
        &.col-total {
          width: 210px;
        }
        &.col-action {
          width: 80px;
        }
      }
      .cart-list-header {
        display: flex;
        height: 70px;
        background-color: #fff;
      }
      .cart-list-body {
        background-color: #fff;
        .cart-list-item {
          display: flex;
          height: 116px;
          border-top: 1px solid #e0e0e0;
          .col-img {
            img {
              width: 80px;
            }
          }
          .col-name {
            a {
              font-size: 18px;
              color: #442244;
            }
          }
          .col-price {
            font-size: 16px;
          }
          .col-amount {
            .count {
              display: flex;
              width: 148px;
              height: 38px;
              line-height: 38px;
              text-align: center;
              border: 1px solid #e0e0e0;
              background-color: #fff;
              .btn {
                display: inline-block;
                width: 38px;
                font-size: 20px;
                color: #757575;
                font-weight: bold;
                cursor: pointer;
                &:hover {
                  background-color: #e0e0e0;
                }
              }
              .num {
                text-align: center;
                outline: none;
                border: none;
                width: 72px;
                font-size: 16px;
                color: #424242;
              }
            }
          }
          .col-total {
            font-size: 16px;
            color: #ff6700;
          }
          .col-action {
            .btn-delete {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              font-size: 20px;
              text-align: center;
              line-height: 24px;
              cursor: pointer;
              transition: background-color 0.4s;
              .icon-close {
                font-size: 20px;
              }
              &:hover {
                color: #fff;
                background-color: #e53935;
              }
            }
          }
        }
      }
      .cart-bar {
        display: flex;
        height: 50px;
        line-height: 50px;
        color: 14px;
        color: #757575;
        background-color: #fff;
        margin: 20px 0;
        .backup-shopping {
          color: #757575;
          margin-left: 32px;
          transition: color 0.5s;
          &:hover {
            color: #ff6700;
          }
        }
        .count {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .total-mount {
            margin-left: 24px;
            padding-left: 8px;
            &::before {
              content: "|";
              color: #eee;
            }
            .hignlight {
              color: #ff6700;
            }
          }
          .total-price {
            color: #ff6700;
            .price {
              font-size: 30px;
            }
          }
        }
        .btn-pay {
          display: inline-block;
          text-align: center;
          width: 202px;
          background-color: #b0b0b0;
          font-size: 18px;
          color: #e0e0e0;
          margin-left: 50px;
          cursor: pointer;
          transition: background-color 0.4s;
          &.active {
            color: #fff;
            background-color: #ff6700;
            &:hover {
              background-color: #f25807;
              border-color: #f25807;
            }
          }
        }
      }
    }
    .cart-empty {
      width: 1226px;
      height: 273px;
      margin: 65px auto 130px;
      box-sizing: border-box;
      background: url("/imgs/cart-empty.png") no-repeat;
      padding-left: 550px;
      background-position-x: 130px;
      h2 {
        font-size: 36px;
        color: #b0b0b0;
        line-height: 145px;
        font-weight: bold;
      }
      .btn-tobuy {
        width: 172px;
        height: 50px;
        background-color: #ff6700;
        color: #fff;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>