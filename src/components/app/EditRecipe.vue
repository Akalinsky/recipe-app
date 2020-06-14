<template>
  <div v-if="(getCurrentRecipe && editingRecipe)" class="recipe-editor">
    <h1>Edit Recipe</h1>
    <label for="name">Name</label>
    <input type="text" name="name" v-model="name">

    <label for="description">Description</label>
    <input type="text" name="description" v-model="description">

    <input-tag v-model="tags"></input-tag>

    <div @click="saveRecipe" class="save-recipe">Save</div>
    <div @click="endEditing" class="cancel-edit">Cancel</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import InputTag from 'vue-input-tag'

export default {
  components: {
    InputTag
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
        this.changesDetected(true)
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
        this.changesDetected(true)
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
        this.changesDetected(true)
        this.$store.commit('updateContent', {
          _id: this.getCurrentRecipe._id,
          tags: tags
        })
      },
      get () {
        return this.getCurrentRecipe.tags
      }
    }
  },
  methods: {
    ...mapActions({
      saveRecipe: 'saveRecipe',
      endEditing: 'endEditing',
      changesDetected: 'changesDetected',
      changedRecipe: 'changedRecipe'
    }),
    formChanged (event) {
      this.changesDetected(true)
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
    h1 {
      font-size: 42px;
      margin: 0;
      padding: 0 0 20px 0;
    }
    input, label {
      display: block;
    }
  }
</style>
