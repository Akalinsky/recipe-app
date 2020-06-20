<template>
  <div class="cookbook-view">
    <Cookbook />
    <RecipeView />
    <EditRecipe />
  </div>
</template>

<script>
import Cookbook from '@/components/app/Cookbook'
import RecipeView from '@/components/app/RecipeView'
import EditRecipe from '@/components/app/EditRecipe'
// @ is an alias to /src

export default {
  components: {
    Cookbook,
    RecipeView,
    EditRecipe
  }
}
</script>

<style lang="scss">
  .cookbook-view {
    display: flex;
    height: 100%;
  }
</style>
