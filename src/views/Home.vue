<template>
  <div class="recipe-view">
    <Cookbook />
    <Recipe />
    <EditRecipe />
  </div>
</template>

<script>
import Cookbook from '@/components/app/Cookbook'
import Recipe from '@/components/app/Recipe'
import EditRecipe from '@/components/app/EditRecipe'
// @ is an alias to /src

export default {
  components: {
    Cookbook,
    Recipe,
    EditRecipe
  }
}
</script>

<style lang="scss">
  .recipe-view {
    display: flex;
    height: 100%;
  }
</style>
