<template>
  <div v-if="(singleRecipe)" class="recipe-single">
    <div class="recipe-header">
      <div class="title-container">
        <div class="title-tags">
          <h1 class="recipe-title">{{ singleRecipe.name  }}</h1>

          <div class="recipe-tag-container">
            <span class="recipe-tag" v-for="tag in singleRecipe.tags" :key="tag">{{ tag }}</span>
          </div>

        </div>

        <div class="description">{{ singleRecipe.description }} </div>
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
    ...mapState([
      'singleRecipe'
    ])
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
.recipe-single {
  background: #ffffff;
  overflow-y: scro;
  scrollbar-width: thin;
  min-height: 0;
  height: auto;
  align-self: stretch;
  text-align: left;
  padding: 2%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  .recipe-header {
    margin: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    .title-container {
      display: flex;
      flex-flow: column nowrap;
      .title-tags {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        h1.recipe-title {
          font-size: 42px;
          margin: 0 50px 0 0;
          padding: 0 0 10px 0;
          display: inline-block;
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
      }
      .description {
        font-size: 18px;
        display: inline-block;
      }
    }
  }
    .recipe-content {
    display: flex;
    flex-flow: row nowrap;
    .recipe-list {
      margin: 10px;
      h3 {
        margin: 0;
      }
      section {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;

        p {
          display: none;
        }
        .sub-list {
          flex-shrink: 1;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
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
              // word-wrap: break-word;
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
</style>
