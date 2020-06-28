<template>
  <div v-if="(getCurrentRecipe && editingRecipe)" class="edit-recipe">

    <div class="edit-header">
      <h1>Edit Recipe</h1>
    </div>

    <div class="recipe-editor">

      <div class="recipe-info recipe-list">
        <div class="recipe-actions">
          <div @click="saveRecipe" class="save-recipe recipe-action">Save</div>
          <div @click="endEditing" class="cancel-edit recipe-action">Cancel</div>
        </div>

        <div class="field-group">
          <label for="name">Name</label>
          <input type="text" name="name" v-model="name">
        </div>

        <div class="field-group">
          <label for="description">Description</label>
          <input type="text" name="description" v-model="description">
        </div>

        <div class="field-group">
          <label>Tags</label>
          <input-tag v-model="tags"></input-tag>
        </div>

      </div>

      <div class="recipe-ingredients recipe-list">
        <div class="field-group">
          <label>Ingredients</label>
          <textarea v-model="ingredients"></textarea>
        </div>
      </div>

      <div class="recipe-steps recipe-list">
        <div class="field-group">
          <label>Directions</label>
          <textarea v-model="directions"></textarea>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import InputTag from 'vue-input-tag'

export default {
  components: {
    InputTag
  },
  methods: {
    ...mapActions([
      'changedRecipe',
      'saveRecipe',
      'endEditing',
      'updateDetected'
    ])
  },
  computed: {
    ...mapState([
      'editingRecipe'
    ]),
    ...mapGetters([
      'getCurrentRecipe'
    ]),
    name: {
      set (name) {
        this.updateDetected(true)
        this.$store.commit('updateContent', {
          _id: this.getCurrentRecipe._id,
          name: name
        })
      },
      get () {
        return this.getCurrentRecipe.name
      }

    },
    description: {
      set (description) {
        this.updateDetected(true)
        this.$store.commit('updateContent', {
          _id: this.getCurrentRecipe._id,
          description: description
        })
      },
      get () {
        return this.getCurrentRecipe.description
      }
    },
    tags: {
      set (tags) {
        this.updateDetected(true)
        this.$store.commit('updateContent', {
          _id: this.getCurrentRecipe._id,
          tags: tags
        })
      },
      get () {
        return this.getCurrentRecipe.tags
      }
    },
    ingredients: {
      set (ingredients) {
        this.updateDetected(true)
        this.$store.commit('updateContent', {
          _id: this.getCurrentRecipe._id,
          ingredients: ingredients
        })
      },
      get () {
        return this.getCurrentRecipe.ingredients
      }
    },
    directions: {
      set (directions) {
        this.updateDetected(true)
        this.$store.commit('updateContent', {
          _id: this.getCurrentRecipe._id,
          directions: directions
        })
      },
      get () {
        return this.getCurrentRecipe.directions
      }
    }
  }
}
</script>

<style lang="scss">
  .edit-recipe {
    background: #ffffff;
    padding: 1.5%;
    .edit-header {
      text-align: left;
      margin: 1% 2% 0 2%;
      padding: 0;
      h1 {
        font-size: 42px;
        margin: 0px;
        padding: 0;
      }
    }
    .recipe-editor {
      text-align: left;
      padding: 2%;
      .recipe-list {
        .field-group {
          margin: 0 10px 20px 10px;
          width: 100%;
          label {
            font-size: 18px;
            display: block;
            font-weight: bold;
          }
          input {
            border-radius: 4px;
            font-size: 16px;
            width: 100%;
          }
          textarea {
            resize: vertical;
            min-height: 175px;
            font-size: 16px;
            width: 100%;
          }
          input:not(.new-tag) {
            padding: 12px 20px;
            border: 1px solid #ccc;
          }
          .vue-input-tag-wrapper {
            span.input-tag {
              font-size: 16px;
              background-color: #42b983;
              color: #ffffff;
              .remove {
                color: #000000;
              }
            }
            input.new-tag {
              font-size: 16px;
            }
          }
        }
        &.recipe-info {
          .recipe-actions {
            width: 200px;
            display: flex;
            justify-content: space-evenly;
            flex-flow: row wrap;
            padding: 15px 5px;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
            margin-bottom: 15px;
            .recipe-action {
              display: inline-block;
              color: #ffffff;
              border-radius: 5px;
              padding: 5px;
              cursor: pointer;
              &.save-recipe {
                background: #1991eb;
                &:hover {
                  background: darken(#1991eb, 10%);
                  transition: background .3s;
                }
              }
              &.cancel-edit {
                background: red;
                &:hover {
                  background: darken(red, 10%);
                  transition: background .3s;
                }
              }
            }
          }
        }
      }
    }
    @media screen and (min-width: 1024px) {
      grid-area: recipe;
      max-height: 100vh;
      overflow: auto;
      box-sizing: border-box;
      scrollbar-width: thin;
    }
  }
</style>
