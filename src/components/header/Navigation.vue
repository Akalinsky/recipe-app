<template>
  <nav>
    <ul>
      <li><router-link v-if="!userLoggedIn" :to="'/register'">Register</router-link></li>
      <li><router-link v-if="!userLoggedIn" :to="'/login'">Login</router-link></li>
      <li @click="logout"><router-link v-if="userLoggedIn" :to="'/'">Logout</router-link></li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { clearStorage } from '../../store/helpers/localStorage.js'

export default {
  computed: {
    ...mapGetters([
      'userLoggedIn'
    ])
  },
  methods: {
    ...mapMutations([
      'setToken',
      'setUser'
    ]),
    logout () {
      this.setToken(null)
      this.setUser(null)
      clearStorage(['token', 'username'])
    }
  }
}
</script>

<style lang="scss">
nav {
  align-self: center;
  margin: 0 1rem 0 0;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li{
      display: inline;
      margin: .5rem;
      a,div{
        display: inline;
        color: #ffffff;
        text-decoration: none;
      }
    }
  };
}

</style>
