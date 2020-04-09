<template>
  <div class="order-success">
    <order-header title="支付订单"></order-header>
    <div class="wrapper">
      <div class="order-success">
        <div class="success-img">
          <img src="/imgs/slider/success.png" alt />
        </div>
        <div class="order-detail" v-if="order.shippingVo">
          <div class="order-info">
            <div class="fl">
              <h2>订单提交成功！去付款咯~</h2>
              <p class="tips">请在 1小时59分内完成支付，超市后将取消订单</p>
              <p class="receiver-info" v-if="!showMore">{{address}}</p>
            </div>
            <div class="fr">
              <p class="order-money">
                应付总额:
                <span class="total">{{order.payment}}</span>
                <span class="unit">元</span>
              </p>
              <p class="btn-more" @click="showMore = !showMore">
                订单详情
                <span class="iconfont icon-arrow"></span>
              </p>
            </div>
          </div>
          <div class="detail" v-if="showMore">
            <ul class="order-views">
              <li>
                <span class="title">订单号:</span>
                <span class="order-No">{{order.orderNo}}</span>
              </li>
              <li>
                <span class="title">收货信息:</span>
                {{address}}
              </li>
              <li>
                <span class="title">商品名称:</span>
                <span
                  v-for="(item,index) in order.orderItemVoList"
                  :key="index"
                >{{item.productName}}</span>
              </li>
              <li>
                <span class="title">发票信息:</span>电子发票 个人
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="payment-section">
        <div class="payment-header">选择以下支付方式付款</div>
        <p class="title">支付平台</p>
        <div class="payment-body">
          <ul class="payment-list">
            <li>
              <a  @click="alipayClick">
                <img src="/imgs/payment/payOnline_zfb.png" alt />
              </a>
            </li>
            <li>
              <a href>
                <img src="/imgs/payment/weixinpay.png" alt />
              </a>
            </li>
            <li>
              <a href>
                <img src="/imgs/payment/unionpay.png" alt />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader";
import NavFooter from "../components/NavFooter";
export default {
  name: "order-success",
  data() {
    return {
      showMore: false,
    orderId: this.$route.query.orderNo,
      order: {}
    };
  },
  computed: {
    address() {
      let {
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
        receiverAddress
      } = this.order.shippingVo;
      return `${receiverName} ${receiverMobile} ${receiverProvince} ${receiverCity} ${receiverDistrict} ${receiverAddress}`;
    }
  },
  methods: {
    getOrderInfo() {
      this.$axios.get(`orders/${this.orderId}`).then(res => {
        this.order = res;
      });
    },
    alipayClick(){
      window.open('/#/orderPay?orderId='+ this.orderId,'_blank')
        /* this.$axios.post('/pay',{
          orderId:this.orderId,
          orderName:'小米商城支付',
          amount:'0.01',
          payType:1
        }).then(res =>{
          console.log(res)
        }) */
    }
  },
  mounted() {
    this.getOrderInfo();
  },
  components: {
    NavFooter,
    OrderHeader
  }
};
</script>

<style lang="scss">
.order-success {
  font-size: 14px;
  background: #f5f5f5;
  .wrapper {
    width: 1226px;
    margin: 38px auto;
    line-height: 1.5;
    .order-success {
      display: flex;
      justify-content: flex-start;
      padding: 30px 48px;
      background: #fff;
      .success-img {
        padding-right: 30px;
        width: 84px;
        height: 84px;
        img {
          width: 100%;
        }
      }
      .order-detail {
        color: #616161;
        flex: 1;
        .order-info {
          padding: 20px 0;
          padding-bottom: 50px;
          //  清浮动
          &::after {
            content: "";
            display: block;
            height: 0;
            clear: both;
          }
          .fl {
            float: left;
            h2 {
              font-size: 24px;
              color: #424242;
            }
            .tips {
              margin-bottom: 5px;
            }
            .receiver-info {
            }
          }
          .fr {
            float: right;
            .order-money {
              margin-bottom: 10px;
              .total {
                font-size: 24px;
                color: #ff6700;
              }
              .unit {
                color: #ff6700;
              }
            }
            .btn-more {
              text-align: right;
              transition: color 0.4s;
              cursor: pointer;
              &:hover {
                color: #ff6700;
              }
            }
          }
        }
        .detail {
          margin-top: 10px;
          padding-top: 30px;
          border-top: 1px solid #e0e0e0;
          .order-views {
            font-size: 14px;
            color: #333;
            line-height: 24px;
            li {
              margin-bottom: 8px;
              .order-No {
                color: #ff6700;
              }
              span {
                display: inline-block;
                width: 84px;
              }
            }
          }
        }
      }
    }
    .payment-section {
      background: #fff;
      margin: 30px 0;
      padding: 30px 48px;
      .payment-header {
        font-size: 18px;
        color: #424242;
        /* margin-bottom: 30px; */
        height: 50px;
        margin-bottom: 30px;
        border-bottom: 1px solid #e0e0e0;
      }
      .title {
        font-weight: bold;
        font-size: 16px;
        color: #616161;
      }
      .payment-body {
        .payment-list {
            padding: 8px 0;
          display: flex;
          li {
            width: 174px;
            height: 60px;
            border: 1px solid #e0e0e0;
            cursor: pointer;
            transition: border .4s;
            overflow: hidden;
            margin-right: 8px;
            &:hover{
                border-color: #ff6700;
            }
          }
        }
      }
    }
  }
}
</style>