<template>
    <div class="order-pay">
        <div v-html="content" ></div>
    </div>
</template>
<script>
export default {
    name:'order-pay',
    data(){
        return{
            orderId:this.$route.query.orderId,
            content:''
        }
    },
    components:{
      
    },
    mounted(){
         this.$axios.post('/pay',{
          orderId:this.orderId,
          orderName:'小米商城支付',
          amount:'0.01',
          payType:1
        }).then(res =>{
          console.log(res)
          this.content = res.content;
        }).then(() =>{
            document.querySelector('form').submit();
        })
    }
}
</script>