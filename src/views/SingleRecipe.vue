<template>
<div class="share-container">
  <div v-if="(singleRecipe)" class="recipe-single">
    <div class="recipe-header">
      <div class="title-container">
        <div class="title-tags">
          <h1 class="recipe-title">{{ singleRecipe.name  }}</h1>
          <div class="description">{{ singleRecipe.description }} </div>
          <div class="recipe-tag-container">
            <span class="recipe-tag" v-for="tag in singleRecipe.tags" :key="tag">{{ tag }}</span>
          </div>

        </div>
      </div>
    </div>

    <div class="recipe-content">
      <div class="recipe-list">
        <h2 v-if="singleRecipe.ingredients">Ingredients</h2>
        <VueShowdown :markdown="singleRecipe.ingredients" :extensions="[subListify]" tag="section"  />
      </div>

      <div class="recipe-list">
        <h2 v-if="singleRecipe.directions">Directions</h2>
        <VueShowdown :markdown="singleRecipe.directions" :extensions="[subListify]" tag="section" />
      </div>
    </div>

  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapState({
      singleRecipe: state => state.singleRecipe.singleRecipe
    })
  },
  methods: {
    ...mapActions([
      'fetchSingleRecipe',
      'userFromStorage'
    ])
  },
  created () {
    this.userFromStorage()
    this.fetchSingleRecipe(this.$route.params.id)
  }
}
</script>

<style lang="scss">
.share-container {
  .recipe-single {
    background: #ffffff;
    scrollbar-width: thin;
    text-align: left;
    padding: 1.5%;
    .recipe-header {
      margin: 10px;
      .title-container {
        .title-tags {
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
            }
          }
        }
        .description {
          font-size: 18px;
          display: inline-block;
          margin-bottom: 10px;
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
            margin: 0 2% 0 0;
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
  }
  @media screen and (min-width: 1024px) {
    max-height: 100vh;
    height: 100vh;
    margin-top: -50px;
    padding-top: 50px;
    overflow: scroll;
  }
}
</style>
