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
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
    ...mapActions([
      'pushNotification'
    ]),
    logout () {
      this.setToken(null)
      this.setUser(null)
      clearStorage(['token', 'username'])
      this.pushNotification({ message: 'You Have Been Logged Out', type: 'normal', duration: 5000 })
    }
  }
}
</script>

<style lang="scss">
nav {
  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    li{
      display: inline-block;
      margin: 0 5px;
      a,div{
        display: inline;
        color: #ffffff;
        text-decoration: none;
      }
    }
  };
}

</style>
