import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import SingleRecipe from '../views/SingleRecipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFound

  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // ID takes the form of any letters and numbers, separated by hyphen and ending with an underscore.
    path: '/recipe/:id([A-Za-z0-9-]+)_:name',
    component: SingleRecipe
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
