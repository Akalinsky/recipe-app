<template>
<transition name="fade-slide" mode="out-in">
  <div class="loading-message">
    <div class="message-container">
      {{ message }}...
    </div>
  </div>
</transition>
</template>

<script>

const loadingMessages = [
  'Peeling Garlic',
  'Shredding Cheese',
  'Chopping Onions',
  'Tenderizing Beef',
  'Boling Water',
  'Steaming Rice',
  'Grilling Burgers',
  'Kneading Dough',
  'Melting Chocolate',
  'Scrambling Eggs',
  'Roasting Chicken',
  'Carving Ham',
  'Reducing Sauce',
  'Whisking Batter',
  'Mashing Potatoes',
  'Slicing Tomatoes',
  'Squeezing Lemons',
  'Pouring Coffee',
  'Sprinkling Salt',
  'Spreading Butter',
  'Basting Turkey',
  'Straining Pasta',
  'Peeling Apples',
  'Crushing Walnuts',
  'Soaking Beans',
  'Measuring Spices',
  'Baking Bread'

]
export default {
  data () {
    return {
      message: ''
    }
  },
  created () {
    this.message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  }
}
</script>

<style lang="scss">
.loading-message {
  background: #0000005a;
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .message-container{
    text-align: center;
    color: var(--color-green);
    width: auto;
    background: #ffffff;
    padding: 1rem 3rem;
    border-radius: 5px;
    font-size: 20px;
  }
}
</style>
