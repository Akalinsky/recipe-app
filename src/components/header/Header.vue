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
  background: var(--color-green);
  height: 50px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

</style>
