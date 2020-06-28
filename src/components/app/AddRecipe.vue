<template>
    <div v-on:click="addRecipe()" class="add-recipe-button">Add Recipe</div>
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
  .add-recipe-button {
    text-align: center;
    width: 100%;
    display: inline-block;
    padding: 10px 0;
    background: #1991eb;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border-bottom: 1px solid #fff;
    height: 40px;
    &:hover {
      background: darken(#1991eb, 10%);
      transition: background .3s;
    }
    @media screen and (min-width: 1024px) {
      position: absolute;
      top: 40px;
      left: 0;
    }
  }
</style>
