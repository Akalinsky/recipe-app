<template>
  <div class="recipe-single">
    <h2>{{ recipeName  }}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState({
      recipes: 'recipes',
      currentRecipe: 'currentRecipe'
    }),
    recipeName: function () {
      return this.recipes[this.currentRecipe].name
    }
  }
}
</script>

<style lang="scss">
.recipe-single {
  background: #f5f5f5;
  overflow-y: scroll;
  scrollbar-width: thin;
  min-height: 0;
  height: 100%;
  flex-basis: 80%;
  align-self: stretch;
}
</style>
