<template>
  <div v-if="(getCurrentRecipe && !editingRecipe)" class="recipe-single">
    <div class="recipe-header">

      <h1 class="recipe-title">{{ getCurrentRecipe.name  }}</h1>

      <span class="description">{{ getCurrentRecipe.description }} </span>

      <div class="recipe-tag-container">
        <span class="recipe-tag" v-for="tag in getCurrentRecipe.tags" :key="tag">{{ tag }}</span>
      </div>

      <div class="recipe-actions">
        <div @click="startEditing(getCurrentRecipe)" class="edit-recipe recipe-action">Edit Recipe</div>
        <div @click="deleteRecipe(getCurrentRecipe)" class="delete-recipe recipe-action">Delete Recipe</div>
      </div>

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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      editingRecipe: 'editingRecipe'
    }),
    ...mapGetters({
      getCurrentRecipe: 'getCurrentRecipe'
    })
  },
  methods: {
    ...mapActions({
      deleteRecipe: 'deleteRecipe',
      startEditing: 'startEditing'
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
          margin: 5px 5px 5px 0;
          padding: 7px;
          background: #42b983;
          border-radius: 5px;
          color: #fff;
      }
    }
    .recipe-actions {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-flow: row wrap;
      .recipe-action {
        display: inline-block;
        margin: 0 15px 0 0;
        color: #ffffff;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        &.edit-recipe {
          background: #1991eb;
          &:hover {
            background: darken(#1991eb, 10%);
            transition: background .3s;
          }
        }
        &.delete-recipe {
          background: red;
          &:hover {
            background: darken(red, 10%);
            transition: background .3s;
          }
        }
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
