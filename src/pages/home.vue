<template>
  <div class="home">
    <nav-header @register-click='modalShow = true'></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
    <!-- 协议声明模态框 -->
    <modal 
    title="协议声明" 
    confirmTitle="同意" 
    cancleTitle="不同意"
    :modalShow="modal"
    @confirm="handleConfirm"
    >
      <template v-slot:dialog-body>
        <div class="content-wrapper">
          <p class="tips">
            <a href="" class="link">《小米商城用户协议》</a> 、
            <a href class="link">《小米商城隐私政策》</a> 、
            <a href class="link">《小米帐号用户协议》</a>请您仔细阅读以上协议，其中有对您权利义务的特别约定等重要条款，同意后方可使用本软件
          </p>
          <div class="content">
            <h2>小米商城用户协议</h2>
            <p class="date">版本日期：2018年12月18日</p>
            <p
              class="warn"
            >《小米商城用户协议》（以下简称“本协议”）是您（或称“用户”，指注册、登录、使用、浏览小米商城的个人或组织）与小米科技有限责任公司（平台运营主体）及其关联公司（包括但不限于小米通讯技术有限公司，以下简称“小米”）及其合作单位（包括但不限于第三方商家）之间关于小米商城网站（域名为www.mi.com，简称本网站）与小米产品、程序及服务所订立的协议。小米和合作单位分别就您在本网站接受服务的过程中享受的权利和承担的义务，与您签订本协议，并独立向您承担责任，互不承担保证、连带或共同责任等。</p>
            <em>小米在此特别提醒用户认真阅读 、充分理解---本协议中各条款。您对本协议的接受即自愿接受全部条款的约束，请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款，尤此类条款将以加粗的形式提示您注意。如您同意本协议并完成全部注册程序，即表示您已充分阅读、理解并接受本协议的全部内容，并与小米达成一致，成为小米商城平台用户。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</em>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from "../components/Modal";
import NavHeader from "../components/NavHeader";
import NavFooter from "../components/NavFooter";
export default {
  name: "home",
  data(){
    return{
      modalShow:false
    }
  },
  computed:{
    modal(){
      return this.modalShow
    }
  },
  methods:{
    handleConfirm(){
      this.$router.push({name:'login'})
    }
  },
  components: {
    NavHeader,
    NavFooter,
    Modal
  }
};
</script>

<style lang="scss" >
.content-wrapper {
  .tips {
    font-size: 14px;
    color: #333;
    margin-left: 20px;
    margin-bottom: 20px;
    .link{
      text-decoration: none;
      color: #f60;
    }
  }
  .content {
    h2 {
      font-size: 20px;
      margin: 10px 0;
      font-weight: bold;
      color: #333;
    }
    .date {
      font-size: 20px;
      margin: 10px 0;
      text-align: right;
    }
    .warn {
      font-size: 14px;
      text-indent: 20px;
      line-height: 1.3;
      margin-bottom: 10px;
    }
    em {
      font-weight: bolder;
      color: #000;
      font-size: 14px;
      text-indent: 20px;
      line-height: 1.3;
      margin-bottom: 10px;
    }
  }
}
</style>