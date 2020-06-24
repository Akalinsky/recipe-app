<template>
  <div class="sidebar-container">
    <input id="search-recipes" :value="searchCookbook" @input="filterCookbook" placeholder="Filter Cookbook..." type="search">
    <AddRecipe v-if="userLoggedIn" />
    <ul class="recipes-list">
      <li v-on:click="changeRecipe(index)" :class="{ 'selected':(index == currentRecipeIndex), 'missing-title':(recipe.name == 'New Recipe')}" v-for="(recipe, index) in cookbook" :key="index">
        <h3>{{ recipe.name }}</h3>
        <div class="tags-list">
          <span class="recipe-tag" v-for="tag in recipe.tags" :key="tag">{{ tag }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AddRecipe from '@/components/app/AddRecipe'

export default {
  components: {
    AddRecipe
  },
  computed: {
    ...mapState([
      'searchCookbook',
      'filteredCookbook',
      'currentRecipeIndex',
      'editingRecipe',
      'changesDetected'
    ]),
    ...mapGetters({
      cookbook: 'getCurrentCookbook',
      userLoggedIn: 'userLoggedIn'

    })
  },
  methods: {
    ...mapActions([
      'changeCurrentRecipe',
      'fetchCookbook',
      'endEditing',
      'updateDetected',
      'filterCookbook'
    ]),
    changeRecipe (index) {
      if (this.editingRecipe === true && this.changesDetected === true) {
        if (window.confirm('Changing recipes will cause you to lose changes to previous edits. Continue?')) {
          this.endEditing()
          this.updateDetected(false)
          this.changeCurrentRecipe(index)
        }
      } else {
        this.endEditing()
        this.changeCurrentRecipe(index)
      }
    }
  },
  created () {
    this.fetchCookbook()
  }
}
</script>

<style lang="scss">
  .sidebar-container {
    padding: 0;
    margin: 0;
    flex-basis: 20%;
    align-self: stretch;
    display: flex;
    height: 100vh;
    min-height: 0;
    flex-flow: column nowrap;
    background: #dfdfdf;
    @media screen and (max-width: 767px) {
      flex-basis: 10%;
    }
    input#search-recipes {
      border: none;
      border-right: 1px solid #f5f5f5;
      font-size: 20px;
      padding: 7px;
      @media screen and (max-width: 767px) {
        font-size: 16px;
      }
      @media screen and (max-width: 700px) {
        font-size: 12px;
      }
      &:focus {
        outline: none;
      }
    }
    ul.recipes-list {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow-y: scroll;
      // Firefox Hack because scrollbars are fucking dumb
      scrollbar-width: thin;
      min-height: 0;
      height: calc(100% - 150px);
      align-self: stretch;
      display: flex;
      flex-flow: column nowrap;
      background: #dfdfdf;
      li {
        border-bottom: 1px solid #f5f5f5;
        text-align: left;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        cursor: pointer;
        &:hover {
          background: #d6d6d6;
          transition: background .2s;
        }
        &.missing-title {
          background: #f4c430;
          &:hover {
            background: darken(#f4c430, 10%);
          }
        }
        &.selected {
          background: #56f1ab;
        }
        h3 {
          margin: 20px 10px;
          @media screen and (max-width: 767px) {
            font-size: 14px;
          }
        }
        .tags-list {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
          margin: 0 0 0 20px;
          @media screen and (max-width: 767px) {
            display: none;
          }
          span.recipe-tag {
            margin: 5px;
            padding: 7px;
            background: #42b983;
            border-radius: 5px;
            color: #fff;
          }
        }
      }
    }
  }
</style>
