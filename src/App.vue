<template>
  <div id="app">
    <Header />
    <router-view/>
    <notifications-list />
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import NotificationsList from '@/components/notification/NotificationsList'
import { mapActions } from 'vuex'

export default {
  components: {
    Header,
    NotificationsList
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

:root {
  // colors
  --color-blue: #1991eb;
  --color-blue-darken: #0078d2;
  --color-green: #42b983;
  --color-green-darken: #29A06A;
  --color-light-green: #56f1ab;
  --color-light-red: #ff4c4c;
  --color-light-red-darken: #e63333;

  // effects
  --simple-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
}
</style>
