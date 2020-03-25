<template>
  <div class="buy-success">
    <div class="container">
      <div class="success-tips">
        <img src="/imgs/slider/success.png" alt />
        <div>
          <h3>已成功加入购物车！</h3>
          <p>{{productName}}</p>
        </div>
      </div>
      <div class="btn-group">
        <span class="btn btn-gray"   @click="$router.go(-1)">返回上一级</span>
        <router-link class="btn btn-primary" tag='span' to='/cart'>去购物车结算</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {getProductDetail} from '../api'
export default {
  name:'buy-scuuess',
  data(){
    return{
      id:this.$route.params.id,
      productName:''
    }
  },
  mounted(){
    getProductDetail(this.id).then(res =>{
      this.productName = res.name;
    })
  }
}
</script>
<style lang="scss">
.buy-success {
  background-color: #f5f5f5;
  height: 200px;
  .container {
    width: 1226px;
    height: 135px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    .success-tips {
      height: inherit;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 64px;
        height: 64px;
        margin-right: 20px;
      }
      h3 {
        font-size: 24px;
        color: #424242;
      }
      p {
        font-size: 14px;
        color: #757575;
        margin-top: 4px;
      }
    }
    .btn-group {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn {
        display: inline-block;
        width: 158px;
        height: 38px;
        margin-left: 12px;
        border: 1px solid #b0b0b0;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        color: #b0b0b0;
        cursor: pointer;
        transition: all 0.4s;
        &.btn-gray {
          &:hover {
            background: #fff;
            color: #757575;
          }
        }
        &.btn-primary {
          background: #ff6700;
          border-color: #ff6700;
          color: #fff;
          &:hover {
            background-color: #f25807;
            border-color: #f25807;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>