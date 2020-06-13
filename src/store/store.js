import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'
const dbURL = 'http://localhost:3000/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookbook: [],
    currentRecipeIndex: 0
  },
  mutations: {
    addRecipe (state, uuid) {
      state.cookbook.unshift({
        _id: uuid,
        name: '',
        tags: [],
        description: '',
        directions: [],
        ingredients: {}
      })
    },
    changeCurrentRecipe (state, recipeIndex) {
      state.currentRecipeIndex = recipeIndex
    },
    getCookbook (state, recipes) {
      state.cookbook = recipes
    },
    deleteRecipe (state, deletedRecipe) {
      state.cookbook = state.cookbook.filter(recipe => {
        if (deletedRecipe._id !== recipe._id) {
          return recipe
        }
      })
      if (state.currentRecipeIndex > 0) {
        state.currentRecipeIndex = state.currentRecipeIndex - 1
      } else {
        state.currentRecipeIndex = 0
      }
    }
  },
  actions: {
    addRecipe (context) {
      const uuid = uuidv4()
      window.fetch(dbURL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          _id: uuid,
          name: '',
          tags: [],
          description: '',
          directions: [],
          ingredients: {}
        })
      })
        .then(res => {
          if (res.ok) console.log(res.json)
        })
        .then(
          context.commit('addRecipe', uuid)
          // context.dispatch('getCookbook')
        )
        .catch(err => console.error(err))
    },
    getCookbook (context) {
      window.fetch(dbURL)
        .then(response => response.json())
        .then(data => context.commit('getCookbook', data))
        .catch(err => console.error(err))
    },
    changeCurrentRecipe (context, recipeIndex) {
      context.commit('changeCurrentRecipe', recipeIndex)
    },
    deleteRecipe (context, deletedRecipe) {
      if (window.confirm(`Do you really want to delete ${deletedRecipe.name}`)) {
        window.fetch(dbURL, {
          method: 'delete',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: deletedRecipe._id
          })
        })
          .then(res => {
            if (res.ok) return res.json()
          })
          // Should I be committing a mutation to the cookbook here?
          // Or fetching the cookbook again from the DB?
          // Works on Second click - super odd. Undecided - **REVISIT**
          // .then(context.dispatch('getCookbook'))
          .then(context.commit('deleteRecipe', deletedRecipe))
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
