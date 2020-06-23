<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import { mapActions } from 'vuex'

export default {
  components: {
    Header
  },
  methods: {
    ...mapActions([
      'userFromStorage'
    ])
  },
  created () {
    this.userFromStorage()
  }
}
</script>

<style lang="scss">
html {
  body {
    margin: 0;
    height: 100%;
    overflow: hidden;
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
