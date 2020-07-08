export default {

  state: () => ({
    notifications: []
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
    }
  },

  actions: {
    pushNotification ({ commit }, notification) {
      commit('pushNotification', notification)
    },
    removeNotification ({ commit }, notification) {
      commit('removeNotification', notification)
    }

  },

  getters: {

  }
}
