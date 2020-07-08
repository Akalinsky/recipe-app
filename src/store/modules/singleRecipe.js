const dbURL = 'http://localhost:3000/'

export default {
  state: {
    singleRecipe: null
  },

  mutations: {
    setSingleRecipe (state, recipe) {
      state.singleRecipe = recipe
    }
  },

  actions: {
    fetchSingleRecipe ({ commit, dispatch }, id) {
      const singleRecipeURL = dbURL + 'recipe/' + id
      window.fetch(singleRecipeURL)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            dispatch('pushNotification', { message: data.error, type: 'error', duration: null })
          } else {
            commit('setSingleRecipe', data)
          }
        })
        .catch(err => {
          dispatch('pushNotification', { message: err.error, type: 'error', duration: null })
        })
    }
  },

  getters: {

  }
}
