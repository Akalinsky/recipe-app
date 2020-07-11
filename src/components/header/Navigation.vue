<template>
  <nav>
    <ul>
      <li><router-link v-if="!userLoggedIn" :to="'/register'">Register</router-link></li>
      <li><router-link v-if="!userLoggedIn" :to="'/login'">Login</router-link></li>
      <li @click="logoutUser"><router-link v-if="userLoggedIn" :to="'/'">Logout</router-link></li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userLoggedIn'
    ])
  },
  methods: {
    ...mapActions([
      'logoutUser'
    ])
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
