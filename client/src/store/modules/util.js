export default {

  state: () => ({
    notifications: [],
    loading: true
  }),

  mutations: {
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
    updateLoading (state, status) {
      state.loading = status
    }
  },

  actions: {
    pushNotification ({ commit }, notification) {
      commit('pushNotification', notification)
    },
    removeNotification ({ commit }, notification) {
      commit('removeNotification', notification)
    },
    updateLoading ({ commit }, status) {
      commit('updateLoading', status)
    }

  },

  getters: {

  }
}
