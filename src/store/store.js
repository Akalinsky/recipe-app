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
    filteredCookbook: [],
    searchCookbook: '',
    currentRecipeIndex: 0,
    editingRecipe: false,
    changesDetected: false,
    changedRecipe: {},
    singleRecipe: null,
    user: null,
    token: null
  },
  mutations: {
    addRecipe (state, uuid) {
      state.cookbook.unshift({
        _id: uuid,
        name: 'New Recipe',
        tags: [],
        description: '',
        directions: '',
        ingredients: ''
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
    },
    filterCookbook (state, search) {
      state.searchCookbook = search
      state.filteredCookbook = filterCookbook(state.cookbook, search)
      state.currentRecipeIndex = 0
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
    addRecipe (context) {
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
          directions: '',
          ingredients: ''
        })
      })
        .then(res => {
          if (res.ok) {
            context.commit('addRecipe', uuid)
            context.commit('changeCurrentRecipe', 0)
          } else {
            console.log(`Error ${res.status} ${res.statusText}`)
          }
        })
        .catch(err => console.error(err))
    },
    changeCurrentRecipe (context, recipeIndex) {
      context.commit('changeCurrentRecipe', recipeIndex)
    },
    updateDetected (context, status) {
      context.commit('updateChanges', status)
    },
    deleteRecipe (context, deletedRecipe) {
      if (window.confirm(`Do you really want to delete ${deletedRecipe.name}`)) {
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
              // Should I be committing a mutation to the cookbook here?
              // Or fetching the cookbook again from the DB?
              // Works on Second click - super odd. Undecided - **REVISIT**
              // .then(context.dispatch('getCookbook'))
              context.commit('deleteRecipe', deletedRecipe)
            } else {
              console.log(`Error ${res.status} ${res.statusText}`)
            }
          })
          .catch(err => console.error(err))
      }
    },
    startEditing (context, editingRecipe) {
      context.commit('editingStatus', true)
      context.commit('updateContent', editingRecipe)
    },
    endEditing (context) {
      context.commit('editingStatus', false)
      context.commit('clearRecipeChanges')
    },
    filterCookbook (context, search) {
      context.commit('filterCookbook', search.target.value)
    },
    fetchCookbook (context) {
      window.fetch(dbURL)
        .then(response => response.json())
        .then(data => context.commit('setCookbook', data))
        .catch(err => console.error(err))
    },
    fetchSingleRecipe (context, id) {
      const singleRecipeURL = dbURL + 'recipe/' + id
      window.fetch(singleRecipeURL)
        .then(response => response.json())
        .then(data => context.commit('setSingleRecipe', data))
        .catch(err => console.error(err))
    },
    loginUser (context, credentials) {
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
            console.log(data.error)
          } else {
            context.commit('setUser', data.username)
            context.commit('setToken', data.token)
            setStorage({
              token: data.token,
              username: data.username
            })
            router.push('/')
          }
        })
    },
    registerUser (context, credentials) {
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
            console.log(data.error)
          } else {
            context.commit('setUser', data.username)
            context.commit('setToken', data.token)
            setStorage({
              token: data.token,
              username: data.username
            })
            router.push('/')
          }
        })
    },
    saveRecipe (context) {
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
            context.commit('updateCookbook')
            context.commit('editingStatus', false)
            context.commit('updateChanges', false)
          } else {
            console.log(`Error ${res.status} ${res.statusText}`)
          }
        })
        .catch(err => console.error(err))
    },
    userFromStorage (context) {
      const user = readStorage()
      if (user) {
        context.commit('setUser', user.username)
        context.commit('setToken', user.token)
      }
    }
  },
  getters: {
    getCurrentRecipe: state => {
      return state.cookbook[state.currentRecipeIndex]
    },
    getCurrentCookbook: state => {
      if (state.searchCookbook !== '') {
        return state.filteredCookbook
      } else {
        return state.cookbook
      }
    },
    userLoggedIn: state => {
      if (state.token !== null) {
        return true
      } else {
        return false
      }
    }
  },
  modules: {
  }
})
