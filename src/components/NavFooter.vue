<template>
  <div class="nav-footer">
    <div class="container">
      <service-bar></service-bar>
    </div>
  </div>
</template>
<script>
import ServiceBar from "./ServiceBar";
export default {
  name: "nav-footer",
  data() {
    return {};
  },
  components: {
    ServiceBar
  }
};
</script>
<style lang="scss" scoped>
.nav-footer {
  background-color: #fff;
  .container {
    width: 1226px;
    margin: 0 auto;
  }
}
</style>