<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="registerUser( {username: username, password: password})">
      <input type="text" placeholder="Password" required v-model="username">

      <input type="password" placeholder="Password" required v-model="password">

      <div class="register-action">
        <button type="submit" class="register-button">Register Account</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'registerUser'
    ])
  }

}
</script>

<style lang="scss">
  .register-form {
    margin: 50px auto 0;
    width: 80%;
    max-width: 400px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
    padding: 2%;
    h2 {
      padding: 0 0 10px 0;
      margin: 0;
    }
    form {
      text-align: center;
      input {
        border-radius: 4px;
        font-size: 16px;
        border: 1px solid #ccc;
        width: 80%;
        padding: 10px;
        margin: 5px 0;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
      }
      .register-action {
        .register-button {
          margin: 10px;
          background: #42b983;
          width: auto;
          display: inline-block;
          padding: 10px;
          color: #fff;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
      }
    }
  }
</style>
