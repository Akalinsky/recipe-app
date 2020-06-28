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
    @media screen and (min-width: 1024px) {
      max-height: 100vh;
      height: 100vh;
      margin-top: -50px;
      padding-top: 50px;
      display: grid;
      grid-template-columns: 2fr 8fr;
      grid-template-rows: auto;
      grid-template-areas:
      "cookbook recipe";
    }
  }
</style>
