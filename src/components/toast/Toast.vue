<template>
  <div class="toast" v-if="isShow">
    <div class="mask"></div>
    <div class="dialog">
      <div class="dialog-header">
        <span class="iconfont icon-close" @click="isShow = false"></span>
      </div>
      <div class="dialog-body">
        <h3>{{msg}}</h3>
      </div>
      <div class="dialog-footer">
        <span class="btn-confirm" @click="isShow = false">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      msg: "默认文字",
      isShow: false
    };
  },
  methods: {
    show(msg = "默认文字", duration = 0) {
      this.msg = msg;
      this.isShow = true;
      if (duration != 0) {
        //   两秒钟后关闭
        setTimeout(() => {
          this.isShow = false;
          this.msg = "";
        }, duration);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.toast {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .dialog {
    width: 500px;
    height: 270px;
    background: #fff;
    position: fixed;
    top:100px;
    left: 50%;
    transform: translateX(-50%);
    .dialog-header {
      padding: 20px 20px;
      text-align: right;
      .icon-close {
        background: #fff;
        border-radius: 50%;
        font-size: 30px;
        cursor: pointer;
        transition: background-color 0.4s;
        &:hover {
          color: #fff;
          background-color: #e53935;
        }
      }
    }
    .dialog-body {
      padding: 0 60px;
      height: 130px;
      h3 {
        text-align: center;
        font-size: 18px;
        color: #424242;
        font-weight: 400;
      }
    }
    .dialog-footer {
      text-align: center;
      .btn-confirm {
        width: 160px;
        height: 40px;
        background: #ff6700;
        display: inline-block;
        line-height: 40px;
        text-align: center;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>>
