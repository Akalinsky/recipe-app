<template>
  <div v-if="(getCurrentRecipe && !editingRecipe)" class="recipe-view">
    <div class="recipe-header">

      <div class="title-container">

          <h1 class="recipe-title">{{ getCurrentRecipe.name  }}</h1>
            <div class="description">{{ getCurrentRecipe.description }} </div>
          <div class="recipe-tag-container">
            <div @click="searchByTag" class="recipe-tag" v-for="tag in getCurrentRecipe.tags" :key="tag">{{ tag }}</div>
          </div>

      </div>

      <div class="recipe-actions">
        <router-link class="share-recipe-action recipe-action" :to="'/recipe/'+getCurrentRecipe._id + '_' + urlEncodeShare(getCurrentRecipe.name)">Share Recipe</router-link>
        <div v-if="userLoggedIn" @click="startEditing(getCurrentRecipe)" class="edit-recipe-action recipe-action">Edit Recipe</div>
        <div v-if="userLoggedIn" @click="deleteRecipe(getCurrentRecipe)" class="delete-recipe-action recipe-action">Delete Recipe</div>
      </div>

    </div>

    <div class="recipe-content">
      <div class="recipe-list">
        <h2 v-if="getCurrentRecipe.ingredients">Ingredients</h2>
        <VueShowdown :markdown="getCurrentRecipe.ingredients" :extensions="[subListify]" tag="section" />
      </div>

      <div class="recipe-list">
        <h2 v-if="getCurrentRecipe.directions">Directions</h2>
        <VueShowdown :markdown="getCurrentRecipe.directions" :extensions="[subListify]" tag="section" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { VueShowdown } from 'vue-showdown'

export default {
  data () {
    return {
      subListify: () => [
        {
          type: 'output',
          filter: function (text, converter, options) {
            text = text.replace(/@start/g, '<div class="sub-list">')
            text = text.replace(/@end/g, '</div>')
            return text
          }
        }
      ]
    }
  },
  components: {
    VueShowdown
  },
  computed: {
    ...mapState([
      'editingRecipe'
    ]),
    ...mapGetters([
      'getCurrentRecipe',
      'userLoggedIn'
    ])
  },
  methods: {
    ...mapActions([
      'deleteRecipe',
      'startEditing'
    ]),
    ...mapMutations([
      'filterCookbook'
    ]),
    copyShareLink () {
      const shareLink = document.querySelector('.share-recipe-action')
      shareLink.setAttribute('type', 'text')
      shareLink.select()
      document.execCommand('copy')
    },
    urlEncodeShare (string) {
      return encodeURI(string.replace(/\s+/g, '-').toLowerCase())
    },
    searchByTag (event) {
      const term = event.target.textContent
      const search = document.getElementById('search-recipes')
      search.value = term
      this.filterCookbook(search.value)
    }
  }
}
</script>

<style lang="scss">
.recipe-view {
  background: #ffffff;
  text-align: left;
  padding: 1.5%;
  .recipe-header {
    margin: 10px;
    .title-container {
      h1.recipe-title {
        font-size: 42px;
        padding: 0;
        margin: 0 0 15px;
      }
      .recipe-tag-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        margin-bottom: 10px;
        .recipe-tag {
          font-size: 18px;
          margin: 5px 5px 5px 0;
          padding: 7px;
          background: var(--color-green);
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
        }
      }
      .description {
        font-size: 18px;
        display: inline-block;
        margin-bottom: 10px;
      }
    }
    .recipe-actions {
      display: flex;
      justify-content: space-evenly;
      flex-flow: row wrap;
      box-shadow: var(--simple-box-shadow);
      padding: 15px 5px;
      max-width: 500px;
      .recipe-action {
        display: inline-block;
        color: #ffffff;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        transition: background .3s;
        &.share-recipe-action {
          background: var(--color-blue);
          text-decoration: none;
          &:hover {
            background: var(--color-blue-darken);
          }
        }
        &.edit-recipe-action {
          background: var(--color-blue);
          &:hover {
            background: var(--color-blue-darken);
          }
        }
        &.delete-recipe-action {
          background: var(--color-light-red);
          &:hover {
            background: var(--color-light-red-darken);
          }
        }
      }
    }
  }
  .recipe-content {
    display: flex;
    flex-flow: column nowrap;
    .recipe-list {
      margin: 10px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      h3 {
        margin: 0;
      }
      section {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        p {
          display: none;
        }
        .sub-list {
          flex-shrink: 1;
          box-shadow: var(--simple-box-shadow);
          padding: 25px 0 25px 25px;
          margin: 1% 2% 0 0;
          ul {
            display: flex;
            flex-flow: column wrap;
            margin: 0;
            padding: 0;
            width: auto;
            max-width: 100%;
            li {
              overflow-wrap: break-word;
              margin: 0 10px;
            }
          }
          ul + h3 {
            margin-top: 12px;
          }
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    grid-area: recipe;
    max-height: 100vh;
    overflow: scroll;
    box-sizing: border-box;
  }
}
</style>
