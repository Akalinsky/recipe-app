<template>
  <div class="sidebar-container">
    <div class="cookbook-actions">
      <input id="search-recipes" :value="searchCookbook" @input="filterCookbook" placeholder="Filter Cookbook..." type="search">
      <AddRecipe v-if="userLoggedIn" />
      <div @click="collapseCookbook" class="collapse-recipes">Hide Recipes</div>
    </div>
    <ul class="recipes-list open" :class="{'adjust-margin': (userLoggedIn == false)}">
      <li @click="changeRecipe(index)" :class="{ 'selected':(index == currentRecipeIndex), 'missing-title':(recipe.name == 'New Recipe')}" v-for="(recipe, index) in cookbook" :key="index">
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
    ...mapState({
      searchCookbook: state => state.cookbook.searchCookbook,
      filteredCookbook: state => state.cookbook.filteredCookbook,
      currentRecipeIndex: state => state.cookbook.currentRecipeIndex,
      editingRecipe: state => state.editRecipe.editingRecipe,
      changesDetected: state => state.editingRecipe.changesDetected
    }),
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
        this.$confirm(
          {
            title: 'Unsaved Changes',
            message: 'Changing recipes will cause you to lose unsaved changes. Continue?',
            button: {
              no: 'Cancel',
              yes: 'Change Recipe'
            },
            callback: confirm => {
              if (confirm) {
                this.endEditing()
                this.updateDetected(false)
                this.changeCurrentRecipe(index)
              }
            }
          }
        )
      } else {
        this.endEditing()
        this.changeCurrentRecipe(index)
      }
    },
    collapseCookbook (event) {
      const cookbookList = document.getElementsByClassName('recipes-list')[0]
      cookbookList.classList.toggle('open')
      event.target.classList.toggle('open')
      if (event.target.textContent.includes('Show')) {
        event.target.textContent = 'Hide Recipes'
      } else {
        event.target.textContent = 'Show Recipes'
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
    background: #ffffff;
    border-right: 1px solid #d3d3d3;
    .cookbook-actions {
      display: flex;
      flex-flow: column nowrap;
      input#search-recipes {
        border: none;
        border-right: 1px solid #f5f5f5;
        font-size: 20px;
        padding: 7px;
        width: 100%;
        height: 40px;
        background: #f3f3f3;
        &:focus {
          outline: none;
        }
      }
      .collapse-recipes {
        background: #a0a0a0;
        color: #ffffff;
        text-align: center;
        padding: 10px 0;
        font-weight: bold;
        border-bottom: 1px solid #ffffff;
        height: 40px;
        display: inline-block;
        cursor: pointer;
        transition: background .2s;
        &:hover {
          background: darken(#a0a0a0, 10%);
        }
      }
    }
    ul.recipes-list {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow-y: scroll;
      // Firefox Hack because scrollbars are fucking dumb
      scrollbar-width: thin;
      background: #dfdfdf;
      display: flex;
      flex-flow: column nowrap;
      max-height: 0;
      &.open {
        max-height: none;
      }
      li {
        border-bottom: 1px solid #f5f5f5;
        text-align: left;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        padding: 1.5%;
        cursor: pointer;
        transition: background .2s;
        &:hover {
          background: #d6d6d6;
        }
        &.missing-title {
          background: #f4c430;
          &:hover {
            background: darken(#f4c430, 10%);
          }
        }
        &.selected {
          background: var(--color-light-green);
        }
        h3 {
          margin: 5px 10px;
          font-weight: normal;
        }
        .tags-list {
          display: none;
        }
      }
    }
    @media screen and (min-width: 1024px) {
      position: relative;
      grid-area: cookbook;
      height: auto;
      overflow: auto;
      .cookbook-actions {
        input#search-results{
          position: absolute;
          top: 0;
          left: 0;
        }
        .collapse-recipes {
          position: absolute;
          width: 100%;
          top: 80px;
          padding: 10px 0;
          &:not(.open) {
            display: none;
          }
        }
      }
      ul.recipes-list {
        margin-top: 40px;
        &.adjust-margin {
          margin-top: 0px;
        }
        li {
          h3 {
            font-size: 16px;
          }
        }
      }
    }
    @media screen and (min-width: 1400px) {
      ul.recipes-list {
        li {
          .tags-list {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            margin: 0 0 0 20px;
            span.recipe-tag {
              margin: 5px;
              padding: 7px;
              background: var(--color-green);
              border-radius: 5px;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
