<template>
  <div v-if="(getCurrentRecipe && editingRecipe)" class="recipe-editor">
    <h1>Edit Recipe</h1>
    <label for="name">Name</label>
    <input @change="formChanged($event)" type="text" name="name" :value="[getCurrentRecipe.name ? getCurrentRecipe.name : '']">

    <label for="description">Description</label>
    <input @change="formChanged($event)" type="text" name="description" :value="[getCurrentRecipe.description ? getCurrentRecipe.description : '']">

    <input-tag v-model="getCurrentRecipe.tags"></input-tag>

    <div @click="saveRecipe(getCurrentRecipe)" class="save-recipe">Save</div>
    <div @click="endEditing()" class="cancel-edit">Cancel</div>
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
    })
  },
  methods: {
    ...mapActions({
      saveRecipe: 'saveRecipe',
      endEditing: 'endEditing',
      changesDetected: 'changesDetected'
    }),
    formChanged (event) {
      this.changesDetected(true)
      this.getCurrentRecipe[event.target.name] = event.target.value
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
