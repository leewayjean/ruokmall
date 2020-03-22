<template>
    <div class="cart">
        <order-header></order-header>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader"
import NavFooter from "../components/NavFooter"
import {getCartList} from '../api'
export default {
    name:'cart',
    components:{
        OrderHeader,
        NavFooter
    },
    methods:{

    },
    mounted(){
        getCartList().then(res =>{
            console.log(res);
        }).catch(err =>{
            alert(err)
        })
    }
}
</script>
<style lang="scss" scoped>

</style>