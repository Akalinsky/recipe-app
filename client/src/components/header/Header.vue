<template>
  <header>
    <Logos />
    <Navigation v-if="!verifying" />
  </header>
</template>

<script>
import Logos from '@/components/header/Logos'
import Navigation from '@/components/header/Navigation'
import { mapState } from 'vuex'

export default {
  components: {
    Logos,
    Navigation
  },
  computed: {
    ...mapState({
      verifying: state => state.auth.verifying
    })
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
