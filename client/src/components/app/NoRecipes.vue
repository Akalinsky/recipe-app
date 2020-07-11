<template>
  <div class="no-recipes">
    <h1>No Recipes Found</h1>
    <h3 v-if="getCurrentCookbookName === 'search'">Check your search for typos and try again</h3>
    <h3 v-if="getCurrentCookbookName === 'normal'">Add a Recipe to begin</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getCurrentCookbookName'
    ])
  }
}
</script>

<style>
.no-recipes {
  padding: 1.5%;
}

</style>
