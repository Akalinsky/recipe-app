<template>
  <div class="sidebar-header">
    <div v-on:click="addRecipe()" class="add-recipe-button">Add Recipe</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      addRecipe: 'addRecipe'
    })
  }
}
</script>

<style lang="scss">
  .sidebar-header {
    width: 100%;
    margin: 0 auto;
    .add-recipe-button {
      width: 100%;
      display: inline-block;
      padding: 10px 0;
      background: #1991eb;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      border-bottom: 2px solid #fff;
      &:hover {
        background: darken(#1991eb, 10%);
        transition: background .3s;
      }
    }
  }
</style>
