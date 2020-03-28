<template>
  <div class="product">
    <product-params @btn-click="buy" :productName="product.name"></product-params>
    <div class="product-detail">
      <div class="product-intro">
        <h1 class="name">{{product.name}}</h1>
        <p class="subtitle">{{product.subtitle}}</p>
        <p class="keyword"></p>
        <p class="price" v-if="product.price">{{product.price}}元</p>
      </div>
      <img src="/imgs/product-intro/intro-2.png" alt />
    </div>
    <div class="container">
      <img src="/imgs/product-intro/intro-1.png" alt />
    </div>
    <img src="/imgs/product-intro/intro.png" alt />
  </div>
</template>
<script>
import ProductParams from "../components/ProductParams";
import { getProductDetail } from "../api";
export default {
  name: "product",
  data() {
    return {
      id: this.$route.params.id,
      product: {}
    };
  },
  components: {
    ProductParams
  },
  methods: {
    buy() {
      this.$router.push(`/detail/${this.id}`);
    },
    getProduct() {
      getProductDetail(this.id).then(res => {
        this.product = res;
      });
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>
<style lang="scss" >
.product {
  img {
    width: 100%;
  }
  .product-detail {
    position: relative;
    .product-intro {
      position: absolute;
      width: 100%;
      text-align: center;
      .name {
        font-size: 80px;
        color: #333;
        margin: 30px 0;
      }
      .subtitle {
        font-size: 24px;
        margin: 20px 0;
      }
      .price {
        font-size: 38px;
      }
    }
  }
  .container {
    width: 1226px;
    margin: 0 auto;
    padding: 0 38px;
  }
}
</style>