<template>
  <div v-if="getCurrentRecipe" class="recipe-single">
    <div class="recipe-header">

      <h1 class="recipe-title">{{ getCurrentRecipe.name  }}</h1>

      <span class="description">{{ getCurrentRecipe.description }} </span>

      <div class="recipe-tag-container">
        <span class="recipe-tag" v-for="tag in getCurrentRecipe.tags" :key="tag">{{ tag }}</span>
      </div>

      <div @click="deleteRecipe(getCurrentRecipe)" class="delete-recipe">Delete Reipe</div>
    </div>
    <div class="recipe-list">
      <h2>Ingredients</h2>
      <ul class="recipe-ingredients">
        <li class="ingredient" v-for="(ingredient, quantity, index) in getCurrentRecipe.ingredients" :key="index">{{ quantity }}: {{ ingredient }}</li>
      </ul>
    </div>

    <div class="recipe-list">
      <h2>Directions</h2>
      <ul class="recipe-directions">
        <li class="step" v-for="(step, index) in getCurrentRecipe.directions" :key="index">{{step}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getCurrentRecipe: 'getCurrentRecipe'
    })
  },
  methods: {
    ...mapActions({
      deleteRecipe: 'deleteRecipe'
    })
  }
}
</script>

<style lang="scss">
.recipe-single {
  background: #f5f5f5;
  overflow-y: scroll;
  scrollbar-width: thin;
  min-height: 0;
  height: 100%;
  flex-basis: 80%;
  align-self: stretch;
  text-align: left;
  padding: 2%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .recipe-header {
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
          margin: 5px;
          padding: 7px;
          background: #42b983;
          border-radius: 5px;
          color: #fff;
      }
    }
    .delete-recipe {
      display: inline-block;
      text-align: center;
      margin: 10px auto;
      background: red;
      color: #fff;
      border-radius: 5px;
      padding: 5px;
      cursor: pointer;

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
