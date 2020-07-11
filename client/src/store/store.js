import Vue from 'vue'
import Vuex from 'vuex'
// Modules
import cookbook from './modules/cookbook.js'
import editRecipe from './modules/editRecipe.js'
import singleRecipe from './modules/singleRecipe.js'
import util from './modules/util.js'
import auth from './modules/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cookbook,
    editRecipe,
    singleRecipe,
    util,
    auth
  }
})
