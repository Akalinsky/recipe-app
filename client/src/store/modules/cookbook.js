import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { filterCookbook } from '../helpers/search.js'
import { setStorage } from '../helpers/localStorage.js'

const fetchURL = 'http://akalinsky.com/recipe-api'

export default {
  state: {
    cookbook: [],
    recipesFetched: false,
    filteredCookbook: [],
    searchCookbook: '',
    currentRecipeIndex: 0
  },

  mutations: {
    addRecipe (state, uuid) {
      state.cookbook.unshift({
        _id: uuid,
        name: 'New Recipe',
        tags: [],
        description: '',
        directions: '@start\n@end',
        ingredients: '@start\n@end'
      })
    },
    changeCurrentRecipe (state, recipeIndex) {
      state.currentRecipeIndex = recipeIndex
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
    },
    setCookbook (state, recipes) {
      state.cookbook = recipes
      state.recipesFetched = true
    },
    filterCookbook (state, search) {
      state.searchCookbook = search
      state.filteredCookbook = filterCookbook(state.cookbook, search)
      state.currentRecipeIndex = 0
    },
    updateCookbook (state, payload) {
      Vue.set(state.cookbook, state.currentRecipeIndex, payload)
    }
  },

  actions: {
    addRecipe ({ commit, dispatch, rootState }) {
      const uuid = uuidv4()
      window.fetch(fetchURL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${rootState.auth.token}`
        },
        body: JSON.stringify({
          _id: uuid,
          name: 'New Recipe',
          tags: [],
          description: '',
          directions: '@start\n@end',
          ingredients: '@start\n@end'
        })
      })
        .then(res => {
          if (res.ok) {
            commit('addRecipe', uuid)
            commit('changeCurrentRecipe', 0)
            dispatch('pushNotification', { message: 'Added New Recipe', type: 'normal', duration: 3000 })
            res.json()
              .then(data => {
                if (data.token) {
                  commit('setToken', data.token)
                  setStorage({ token: data.token })
                }
              })
          } else {
            console.error(`Error ${res.status} ${res.statusText}`)
            if (res.error) {
              dispatch('pushNotification', { message: res.error, type: 'error', duration: null })
            }
          }
        })
        .catch(err => {
          if (err.error) {
            dispatch('pushNotification', { message: err.error, type: 'error', duration: null })
          }
        })
    },
    changeCurrentRecipe ({ commit }, recipeIndex) {
      commit('changeCurrentRecipe', recipeIndex)
    },
    deleteRecipe ({ commit, dispatch, rootState }, deletedRecipe) {
      Vue.$confirm({
        title: 'Delete Recipe',
        message: `Are you sure you want to delete ${deletedRecipe.name}?`,
        button: {
          no: 'Cancel',
          yes: 'Delete'
        },
        callback: confirm => {
          if (confirm) {
            window.fetch(fetchURL, {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${rootState.auth.token}`
              },
              body: JSON.stringify({
                _id: deletedRecipe._id
              })
            })
              .then(res => {
                if (res.ok) {
                  commit('deleteRecipe', deletedRecipe)
                  dispatch('pushNotification', { message: `Deleted ${deletedRecipe.name}`, type: 'normal', duration: 3000 })
                  res.json()
                    .then(data => {
                      if (data.token) {
                        commit('setToken', data.token)
                        setStorage({ token: data.token })
                      }
                    })
                } else {
                  console.error(`Error ${res.status} ${res.statusText}`)
                  if (res.error) {
                    dispatch('pushNotification', { message: res.error, type: 'error', duration: null })
                  }
                }
              })
              .catch(err => {
                if (err.error) {
                  dispatch('pushNotification', { message: err.error, type: 'error', duration: null })
                }
              })
          }
        }
      })
    },
    filterCookbook ({ commit }, search) {
      commit('filterCookbook', search.target.value)
    },
    fetchCookbook ({ commit, dispatch }) {
      window.fetch(fetchURL)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            dispatch('pushNotification', { message: data.error, type: 'error', duration: null })
          } else {
            dispatch('updateLoading', false)
            commit('setCookbook', data)
          }
        })
        .catch(err => {
          if (err.error) {
            dispatch('pushNotification', { message: err.error, type: 'error', duration: null })
          }
        }
        )
    }
  },

  getters: {
    getCurrentRecipe: (state, getters) => {
      const cookbook = getters.getCurrentCookbook
      return cookbook[state.currentRecipeIndex]
    },
    getCurrentCookbook: state => {
      if (state.searchCookbook !== '') {
        return state.filteredCookbook
      } else {
        return state.cookbook
      }
    },
    getCurrentCookbookName: state => {
      if (state.searchCookbook !== '') {
        return 'search'
      } else {
        return 'normal'
      }
    },
    hasSearchResults: (state, getters) => {
      if (state.searchCookbook !== '' && getters.getCurrentCookbook.length === 0) {
        return false
      } else {
        return true
      }
    },
    hasRecipes: (state, getters) => {
      if (getters.getCurrentCookbook.length === 0) {
        return false
      } else {
        return true
      }
    }
  }

}
