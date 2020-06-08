import Vue from 'vue'
import Vuex from 'vuex'
const dbURL = 'http://localhost:3000/'

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
    },
    deleteRecipe (state, recipeName) {
      state.cookbook = state.cookbook.filter(recipe => {
        if (recipeName !== recipe.name) {
          return recipe
        }
      })
    }
  },
  actions: {
    getCookbook (context) {
      window.fetch(dbURL)
        .then(response => response.json())
        .then(data => context.commit('getCookbook', data))
        .catch(err => console.error(err))
    },
    changeCurrentRecipe (context, recipeIndex) {
      context.commit('changeCurrentRecipe', recipeIndex)
    },
    deleteRecipe (context, recipeName) {
      if (window.confirm(`Do you really want to delete ${recipeName}`)) {
        window.fetch(dbURL, {
          method: 'delete',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: recipeName
          })
        })
          .then(res => {
            if (res.ok) return res.json()
          })
          // Should I be committing a mutation to the cookbook here?
          // Or fetching the cookbook again from the DB?
          // Works on Second click - super odd. Undecided - **REVISIT**
          // .then(context.dispatch('getCookbook'))
          .then(context.commit('deleteRecipe', recipeName))
          .catch(err => console.error(err))
      }
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
