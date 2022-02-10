<template>
  <div class="cookbook-view">
    <LoadingMessage v-if="loading" />
    <Cookbook />
    <RecipeView />
    <EditRecipe />
    <NoRecipes v-if="!hasRecipes && recipesFetched"/>
  </div>
</template>

<script>
import LoadingMessage from '@/components/utilities/LoadingMessage'
import Cookbook from '@/components/app/Cookbook'
import RecipeView from '@/components/app/RecipeView'
import EditRecipe from '@/components/app/EditRecipe'
import NoRecipes from '@/components/app/NoRecipes'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    LoadingMessage,
    Cookbook,
    RecipeView,
    EditRecipe,
    NoRecipes
  },
  computed: {
    ...mapState({
      recipesFetched: state => state.cookbook.recipesFetched,
      loading: state => state.util.loading,
      isMobile: state => state.cookbook.isMobile
    }),
    ...mapGetters([
      'hasSearchResults',
      'hasRecipes'
    ])
  },
  methods: {
    ...mapActions([
      'changeMobileState'
    ]),

    onResize () {
      const newScreenSize = window.screen.width < 1024
      if (newScreenSize !== this.isMobile) {
        this.changeMobileState(newScreenSize)
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
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
