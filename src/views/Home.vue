<template>
  <div class="recipe-view">
    <Cookbook />
    <Recipe />
  </div>
</template>

<script>
import Cookbook from '@/components/app/Cookbook'
import Recipe from '@/components/app/Recipe'
// @ is an alias to /src

export default {
  components: {
    Cookbook,
    Recipe
  }
}
</script>

<style lang="scss">
  .recipe-view {
    display: flex;
    height: 100%;
  }
</style>
