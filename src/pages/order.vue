<template>
    <div class="order">
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavFooter from '../components/NavFooter'
export default {
    name:'order',
    components:{
        NavFooter
    }
}
</script>