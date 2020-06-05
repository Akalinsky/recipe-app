<template>
  <div class="recipe-view">
    <RecipeList />
    <RecipeSingle />
  </div>
</template>

<script>
import RecipeList from '@/components/app/RecipeList'
import RecipeSingle from '@/components/app/RecipeSingle'
// @ is an alias to /src

export default {
  components: {
    RecipeList,
    RecipeSingle
  }
}
</script>

<style lang="scss">
  .recipe-view {
    display: flex;
    height: 100%;
  }
</style>
