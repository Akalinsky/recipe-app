import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookbook: [],
    currentRecipeIndex: 0
  },
  mutations: {
    changeCurrentRecipe (state, recipeIndex) {
      state.currentRecipeIndex = recipeIndex
    },
    getCookbook (state, recipes) {
      state.cookbook = recipes
    }
  },
  actions: {
    getCookbook (context) {
      window.fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(data => context.commit('getCookbook', data))
    },
    changeCurrentRecipe (context, recipeIndex) {
      context.commit('changeCurrentRecipe', recipeIndex)
    }
  },
  getters: {
    getCurrentRecipe: state => {
      return state.cookbook[state.currentRecipeIndex]
    }
  },
  modules: {
  }
})
