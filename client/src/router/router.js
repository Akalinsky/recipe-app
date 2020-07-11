import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import SingleRecipe from '../views/SingleRecipe.vue'
import { readStorage } from '../store/helpers/localStorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // ID takes the form of any letters and numbers, separated by hyphen and ending with an underscore.
    path: '/recipe/:id([A-Za-z0-9-]+)_:name',
    name: 'SingleRecipe',
    component: SingleRecipe
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { loggedOut: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { loggedOut: true }
  },
  {
    path: '*',
    component: NotFound

  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.loggedOut) {
    if (readStorage().token !== null) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
