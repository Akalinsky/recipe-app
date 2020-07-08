const dbURL = 'http://localhost:3000/'

export default {
  state: {
    editingRecipe: false,
    changesDetected: false,
    changedRecipe: {}
  },

  mutations: {
    clearRecipeChanges (state) {
      state.changedRecipe = {}
    },
    editingStatus (state, status) {
      state.editingRecipe = status
    },
    updateChanges (state, status) {
      state.changesDetected = status
    },
    // Rename This
    updateContent (state, values) {
      state.changedRecipe = Object.assign({}, state.changedRecipe, values)
    }
  },

  actions: {
    saveRecipe ({ state, commit, dispatch, rootState }) {
      window.fetch(dbURL, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${rootState.auth.token}`
        },
        body: JSON.stringify(state.changedRecipe)
      })
        .then(res => {
          if (res.ok) {
            commit('updateCookbook', state.changedRecipe)
            commit('editingStatus', false)
            commit('updateChanges', false)
            dispatch('pushNotification', { message: 'Recipe Saved', type: 'success', duration: 3000 })
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
    updateDetected ({ commit }, status) {
      commit('updateChanges', status)
    },
    startEditing ({ commit }, editingRecipe) {
      commit('editingStatus', true)
      commit('updateContent', editingRecipe)
    },
    endEditing ({ commit }) {
      commit('editingStatus', false)
      commit('clearRecipeChanges')
    }
  },

  getters: {

  }
}
