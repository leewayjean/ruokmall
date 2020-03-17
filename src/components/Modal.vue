<template>
  <div class="modal" v-show="modalShow">
    <div class="dialog">
      <!-- 头部 -->
      <div class="dialog-header">
        <span class="title">{{title}}</span>
        <span class="icon-close" @click="modalShow = false">X</span>
      </div>
      <!-- body -->
      <div class="dialog-body">
        <slot name="dialog-body"></slot>
      </div>
      <!-- footer -->
      <div class="dialog-footer">
        <span class="btn btn-confirm" v-if="btnType === 1" @click="$emit('confirm')">{{confirmTitle}}</span>
        <span class="btn btn-cancle" v-if="btnType === 2" @click="modalShow = false">{{cancleTitle}}</span>
        <div class="btn-group" v-if="btnType === 0">
          <span class="btn btn-confirm" @click="$emit('confirm')">{{confirmTitle}}</span>
          <span class="btn btn-cancle" @click="modalShow = false">{{cancleTitle}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    title: {
      title: String,
      default: "标题"
    },
    confirmTitle: {
      type: String,
      default: "确认"
    },
    cancleTitle: {
      type: String,
      default: "取消"
    },
    /* 
    *按钮类型
        0 ==== 确认，取消按钮组
        1 ==== 确认
        2 ==== 取消
    
    
    */
    btnType: {
      type: Number,
      default: 0
    },
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.4);
  .dialog {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translate(-50%, 105px);
    width: 660px;
    background-color: #fff;
    .dialog-header {
      height: 60px;
      background: #f5f5f5;
      padding: 0 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-close {
        width: 26px;
        height: 26px;
        background: #f5f5f5;
        line-height: 26px;
        text-align: center;
        color: #757575;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #e53935;
        }
      }
    }
    .dialog-body {
        padding: 20px;
    }
    .dialog-footer {
      height: 82px;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        background-color: #f60;
        width: 160px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        &.btn-confirm {
          margin-right: 14px;
        }
        &.btn-cancle {
          background-color: #b0b0b0;
        }
      }
      .btn-group {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>