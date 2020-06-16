import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import VueDirectiveMarkdown from 'vue-directive-markdown'

Vue.directive('md', VueDirectiveMarkdown)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
