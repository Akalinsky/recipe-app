<template>
  <header>
    <Logos />
    <Navigation />
  </header>
</template>

<script>
import Logos from '@/components/header/Logos'
import Navigation from '@/components/header/Navigation'

export default {
  components: {
    Logos,
    Navigation
  }
}
</script>

<style lang="scss">
header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: #42b983;
  width: 100%;
  max-height: 50px;
}

</style>
