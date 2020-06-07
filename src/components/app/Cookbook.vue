<template>
    <ul class="recipes-list">
      <li v-on:click="changeCurrentRecipe(index)" :class="{ 'selected':(index == currentRecipeIndex)}" v-for="(recipe, index) in cookbook" :key="index">
        <h3>{{ recipe.name }}</h3>
        <div class="tags-list">
          <span class="recipe-tag" v-for="tag in recipe.tags" :key="tag">{{ tag }}</span>
        </div>
      </li>
    </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      cookbook: 'cookbook',
      currentRecipeIndex: 'currentRecipeIndex'
    })
  },
  methods: {
    ...mapActions({
      changeCurrentRecipe: 'changeCurrentRecipe',
      getCookbook: 'getCookbook'
    })
  },
  created () {
    this.getCookbook()
  }
}
</script>

<style lang="scss">
  ul.recipes-list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    // Firefox Hack because scrollbars are fucking dumb
    scrollbar-width: thin;
    min-height: 0;
    height: 100%;
    flex-basis: 20%;
    align-self: stretch;
    display: flex;
    flex-flow: column nowrap;
    background: #ffffff;
    cursor: pointer;
    li {
      border-bottom: 1px solid #f5f5f5;
      text-align: left;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      &:hover {
        background: #d6d6d6;
      }
      &.selected {
        background: #56f1ab;
      }
      h3 {
        margin: 20px 10px;
      }
      .tags-list {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        margin: 0 0 0 20px;
        span.recipe-tag {
          margin: 5px;
          padding: 7px;
          background: #42b983;
          border-radius: 20px;
          color: #fff;
        }
      }
    }
  }
</style>
