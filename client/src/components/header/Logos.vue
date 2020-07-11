<template>
  <div class="header-left">
    <h2 class="page-title"><router-link :to="'/'">Andrew's Recipes</router-link></h2>
  </div>
</template>

<script>
export default {
  name: 'Logos'

}
</script>

<style lang="scss">
  .header-left {
    h2.page-title {
      color: #fff;
      margin: 0;
      padding: 10px 0 10px 10px;
      font-weight: normal;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
</style>
