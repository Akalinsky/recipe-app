import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { filterCookbook } from './helpers/search.js'
import { setStorage, readStorage } from './helpers/localStorage.js'
import router from '../router/router.js'

const dbURL = 'http://localhost:3000/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookbook: [],
    recipesFetched: false,
    filteredCookbook: [],
    searchCookbook: '',
    currentRecipeIndex: 0,
    editingRecipe: false,
    changesDetected: false,
    changedRecipe: {},
    singleRecipe: null,
    user: null,
    token: null,
    notifications: []
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
    clearRecipeChanges (state) {
      state.changedRecipe = {}
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
    editingStatus (state, status) {
      state.editingRecipe = status
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
    pushNotification (state, notification) {
      state.notifications.push({
        ...notification,
        id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
      })
    },
    removeNotification (state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => {
        return notification.id !== notificationToRemove
      })
    },
    setSingleRecipe (state, recipe) {
      state.singleRecipe = recipe
    },
    setToken (state, token) {
      state.token = token
    },
    setUser (state, username) {
      state.user = username
    },
    updateChanges (state, status) {
      state.changesDetected = status
    },
    updateCookbook (state) {
      Vue.set(state.cookbook, state.currentRecipeIndex, state.changedRecipe)
    },
    updateContent (state, values) {
      state.changedRecipe = Object.assign({}, state.changedRecipe, values)
    }
  },
  actions: {
    addRecipe ({ commit, dispatch }) {
      const uuid = uuidv4()
      window.fetch(dbURL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${this.state.token}`
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
          } else {
            console.error(`Error ${res.status} ${res.statusText}`)
            dispatch('pushNotification', { message: res.error, type: 'error', duration: null })
          }
        })
        .catch(err => {
          dispatch('pushNotification', { message: err.error, type: 'error', duration: null })
        })
    },
    changeCurrentRecipe ({ commit }, recipeIndex) {
      commit('changeCurrentRecipe', recipeIndex)
    },
    updateDetected ({ commit }, status) {
      commit('updateChanges', status)
    },
    deleteRecipe ({ commit, dispatch }, deletedRecipe) {
      Vue.$confirm({
        title: 'Delete Recipe',
        message: `Are you sure you want to delete ${deletedRecipe.name}?`,
        button: {
          no: 'Cancel',
          yes: 'Delete'
        },
        callback: confirm => {
          if (confirm) {
            window.fetch(dbURL, {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${this.state.token}`
              },
              body: JSON.stringify({
                _id: deletedRecipe._id
              })
            })
              .then(res => {
                if (res.ok) {
                  commit('deleteRecipe', deletedRecipe)
                } else {
                  console.error(`Error ${res.status} ${res.statusText}`)
                  dispatch('pushNotification', { message: res.error, type: 'error', duration: null })
                }
              })
              .catch(err => {
                dispatch('pushNotification', { message: err.error, type: 'error', duration: null })
              })
          }
        }
      })
    },
    startEditing ({ commit }, editingRecipe) {
      commit('editingStatus', true)
      commit('updateContent', editingRecipe)
    },
    endEditing ({ commit }) {
      commit('editingStatus', false)
      commit('clearRecipeChanges')
    },
    filterCookbook ({ commit }, search) {
      commit('filterCookbook', search.target.value)
    },
    fetchCookbook ({ commit, dispatch }) {
      window.fetch(dbURL)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            dispatch('pushNotification', { message: data.error, type: 'error', duration: null })
          } else {
            commit('setCookbook', data)
          }
        })
        .catch(err => {
          dispatch('pushNotification', { message: err.error, type: 'error', duration: null })
        }
        )
    },
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
    },
    loginUser ({ commit, dispatch }, credentials) {
      window.fetch(dbURL + 'login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            dispatch('pushNotification', { message: data.error, type: 'error', duration: null })
          } else {
            commit('setUser', data.username)
            commit('setToken', data.token)
            setStorage({
              token: data.token,
              username: data.username
            })
            router.push('/')
            dispatch('pushNotification', { message: 'Successfully Logged in!', type: 'success', duration: 5000 })
          }
        })
    },
    pushNotification ({ commit }, notification) {
      commit('pushNotification', notification)
    },
    registerUser ({ commit, dispatch }, credentials) {
      window.fetch(dbURL + 'register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            dispatch('pushNotification', { message: data.error, type: 'warning', duration: 3000 })
          } else {
            commit('setUser', data.username)
            commit('setToken', data.token)
            setStorage({
              token: data.token,
              username: data.username
            })
            router.push('/')
            dispatch('pushNotification', { message: 'Account Creation Successful', type: 'success', duration: 5000 })
            dispatch('pushNotification', { message: 'You are now logged in!', type: 'success', duration: 5000 })
          }
        })
    },
    removeNotification ({ commit }, notification) {
      commit('removeNotification', notification)
    },
    saveRecipe ({ commit, dispatch }) {
      window.fetch(dbURL, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify(this.state.changedRecipe)
      })
        .then(res => {
          if (res.ok) {
            commit('updateCookbook')
            commit('editingStatus', false)
            commit('updateChanges', false)
          } else {
            console.error(`Error ${res.status} ${res.statusText}`)
            dispatch('pushNotification', { message: res.error, type: 'error', duration: null })
          }
        })
        .catch(err => {
          dispatch('pushNotification', { message: err.error, type: 'error', duration: null })
        })
    },
    userFromStorage ({ commit }) {
      const user = readStorage()
      if (user) {
        commit('setUser', user.username)
        commit('setToken', user.token)
      }
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
    userLoggedIn: state => {
      if (state.token !== null) {
        return true
      } else {
        return false
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
  },
  modules: {
  }
})
