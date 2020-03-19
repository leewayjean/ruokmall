<template>
  <div class="product">
    <product-params @btn-click="buy"></product-params>
    <img src="/imgs/product-intro/intro-2.png" alt />
    <div class="container">
      <img src="/imgs/product-intro/intro-1.png" alt />
    </div>
    <img src="/imgs/product-intro/intro.png" alt />
  </div>
</template>
<script>
import ProductParams from "../components/ProductParams";
export default {
  name: "product",
  data(){
    return{
      id:this.$route.params.id,
    }
  },
  components: {
    ProductParams
  },
  methods:{
    buy(){
      this.$router.push(`/detail/${this.id}`)
    }
  }
};
</script>
<style lang="scss" scoped>
.product {
  img {
    width: 100%;
  }
  .container {
    width: 1226px;
    margin: 0 auto;
    padding: 0 38px;
  }
}
</style>