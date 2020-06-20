<template>
  <div class="header-left">
    <h2 class="page-title"><router-link :to="'/'">My Recipe App</router-link></h2>
  </div>
</template>

<script>
export default {
  name: 'Logos'

}
</script>

<style lang="scss">
  .header-left {
    .page-title {
      color: #fff;
      margin: 0 0 0 1rem;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
</style>
