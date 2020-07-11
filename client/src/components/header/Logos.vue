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
      display: flex;
      flex-flow: column nowrap;
      align-self: center;
    h2.page-title {
      color: #fff;
      margin: 0;
      font-weight: normal;
      padding-left: 10px;
      font-size: 20px;
      @media screen and (min-height: 767px) {
        font-size: 24px;
      }
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
</style>
