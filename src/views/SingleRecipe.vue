<template>
  <div v-if="(singleRecipe)" class="recipe-single">
    <div class="recipe-header">

      <h1 class="recipe-title">{{ singleRecipe.name  }}</h1>

      <span class="description">{{ singleRecipe.description }} </span>

      <div class="recipe-tag-container">
        <span class="recipe-tag" v-for="tag in singleRecipe.tags" :key="tag">{{ tag }}</span>
      </div>

    </div>
    <div class="recipe-list">
      <h2 v-if="singleRecipe.ingredients">Ingredients</h2>
      <VueShowdown :markdown="singleRecipe.ingredients" />
    </div>

    <div class="recipe-list">
      <h2 v-if="singleRecipe.directions">Directions</h2>
      <VueShowdown :markdown="singleRecipe.directions" />
    </div>

  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { VueShowdown } from 'vue-showdown'

export default {
  components: {
    VueShowdown
  },
  computed: {
    ...mapState([
      'singleRecipe'
    ])
  },
  methods: {
    ...mapActions([
      'fetchSingleRecipe'
    ])
  },
  created () {
    this.fetchSingleRecipe(this.$route.params.id)
  }
}
</script>

<style lang="scss">
.recipe-single {
  background: #dfdfdf;
  overflow-y: scroll;
  scrollbar-width: thin;
  min-height: 0;
  height: 100%;
  text-align: left;
  padding: 2%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .recipe-header {
    flex-basis: 40%;
    h1.recipe-title {
      font-size: 42px;
      margin: 0;
      padding: 0 0 20px 0;
    }
    .description {
      font-size: 18px;
    }
    .recipe-tag-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
      .recipe-tag {
          font-size: 18px;
          margin: 5px 5px 5px 0;
          padding: 7px;
          background: #42b983;
          border-radius: 5px;
          color: #fff;
      }
    }
  }
  .recipe-list {
    flex-basis: 30%;
    h2 {
      margin: 0;
    }
    ul {
      margin: 0;
      .ingredient, .step {
        font-size: 22px;
      }
    }
  }
}
</style>
