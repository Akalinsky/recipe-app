import router from '../../router/router.js'
import { setStorage, readStorage, clearStorage } from '../helpers/localStorage.js'
const fetchURL = 'http://akalinsky.com/recipe-api/'

export default {
  state: {
    token: null,
    verifying: false
  },

  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setVerifying (state, status) {
      state.verifying = status
    }
  },

  actions: {
    loginUser ({ commit, dispatch }, credentials) {
      window.fetch(fetchURL + 'login', {
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
            commit('setToken', data.token)
            setStorage({
              token: data.token
            })
            router.push('/')
            dispatch('pushNotification', { message: 'Successfully Logged in!', type: 'success', duration: 5000 })
          }
        })
    },
    logoutUser ({ commit, dispatch }) {
      commit('setToken', null)
      clearStorage(['token'])
      dispatch('pushNotification', { message: 'You Have Been Logged Out', type: 'normal', duration: 5000 })
    },
    registerUser ({ commit, dispatch }, credentials) {
      window.fetch(fetchURL + 'register', {
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
            commit('setToken', data.token)
            setStorage({
              token: data.token
            })
            router.push('/')
            dispatch('pushNotification', { message: 'Account Creation Successful', type: 'success', duration: 5000 })
            dispatch('pushNotification', { message: 'You are now logged in!', type: 'success', duration: 5000 })
          }
        })
    },
    userFromStorage ({ commit, dispatch }) {
      const user = readStorage()
      if (user.token) {
        commit('setVerifying', true)
        dispatch('validateUser', user.token)
      }
    },
    validateUser ({ commit, dispatch }, userToken) {
      window.fetch(fetchURL + 'validate', {
        method: 'post',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          token: userToken
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            commit('setVerifying', false)
            clearStorage(['token'])
            dispatch('pushNotification', { message: 'Session Expired, Please Login again', type: 'normal', duration: null })
          } else {
            commit('setToken', userToken)
            commit('setVerifying', false)
            if (data.notification) {
              dispatch('pushNotification', { message: 'Successfully Logged in!', type: 'success', duration: 5000 })
            }
          }
        })
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
