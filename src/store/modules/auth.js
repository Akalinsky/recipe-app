import router from '../../router/router.js'
import { setStorage, readStorage } from '../helpers/localStorage.js'
const dbURL = 'http://localhost:3000/'

export default {
  state: {
    user: null,
    token: null
  },

  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, username) {
      state.user = username
    }
  },

  actions: {
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
    userFromStorage ({ commit }) {
      const user = readStorage()
      if (user) {
        commit('setUser', user.username)
        commit('setToken', user.token)
      }
    }
  },

  getters: {
    userLoggedIn: state => {
      if (state.token !== null) {
        return true
      } else {
        return false
      }
    }
  }

}
