<template>
  <div v-if="(getCurrentRecipe && editingRecipe)" class="recipe-editor">
    <div class="recipe-info recipe-list">
      <h1>Edit Recipe</h1>

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

      <div class="recipe-actions">
        <div @click="saveRecipe" class="save-recipe recipe-action">Save</div>
        <div @click="endEditing" class="cancel-edit recipe-action">Cancel</div>
      </div>
    </div>

    <div class="recipe-ingredients recipe-list">
        <textarea v-model="ingredients"></textarea>
    </div>

    <div class="recipe-steps recipe-list">
      <textarea v-model="directions"></textarea>
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
    ...mapActions({
      changedRecipe: 'changedRecipe',
      saveRecipe: 'saveRecipe',
      endEditing: 'endEditing',
      updateDetected: 'updateDetected'
    })
  },
  computed: {
    ...mapState({
      editingRecipe: 'editingRecipe'
    }),
    ...mapGetters({
      getCurrentRecipe: 'getCurrentRecipe'
    }),
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
  .recipe-editor {
    background: #f5f5f5;
    overflow-y: scroll;
    scrollbar-width: thin;
    min-height: 0;
    height: 100%;
    flex-basis: 80%;
    align-self: stretch;
    text-align: left;
    padding: 2%;
    display: flex;
    flex-flow: row wrap;
    .recipe-list {
      flex-basis: 35%;
      display: flex;
      flex-flow: column wrap;
      .field-group {
        display: flex;
        flex-flow: column wrap;
        margin: 10px;
        label {
          font-size: 18px;
        }
        input{
          border-radius: 4px;
          font-size: 16px;
        }
        input:not(.new-tag) {
          padding: 12px 20px;
          border: 1px solid #ccc;
        }
        .vue-input-tag-wrapper {
          span.input-tag {
            font-size: 16px;
          }
          input.new-tag {
            font-size: 16px;
            padding: 0 20px;
          }
        }
      }
      &.recipe-info {
        flex-basis: 30%;
        h1 {
          font-size: 42px;
          margin: 0;
          padding: 0 0 20px 0;
        }
        .recipe-actions {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-flow: row wrap;
          margin: 10px;
          .recipe-action {
            display: inline-block;
            margin: 0 15px 0 0;
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
</style>
