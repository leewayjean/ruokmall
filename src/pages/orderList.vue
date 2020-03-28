<template>
    <div class="order-list">
        <order-header title="我的订单"></order-header>
    </div>
</template>
<script>
import OrderHeader from '../components/OrderHeader'
export default {
    name:'order-list',
    components:{
        OrderHeader,
    },
    mounted(){
        this.$axios.get('/orders').then(res =>{
            console.log(res)
        })
    }
}
</script>