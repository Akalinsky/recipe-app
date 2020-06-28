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
* {
  box-sizing: border-box;
}
html,body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow-x: hidden;
  #app {
    height: 100vh;
  }
}
</style>
