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
    background: var(--color-blue);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border-bottom: 1px solid #fff;
    height: 40px;
    transition: background .3s;
    &:hover {
      background: var(--color-blue-darken);
    }
    @media screen and (min-width: 1024px) {
      position: absolute;
      top: 40px;
      left: 0;
    }
  }
</style>
