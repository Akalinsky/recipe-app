<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="registerUser( {username: username, password: password})">
      <input type="text" placeholder="Username" required v-model="username">

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
    box-shadow: var(--simple-box-shadow);
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
        box-shadow: var(--simple-box-shadow);
      }
      .register-action {
        .register-button {
          margin: 10px;
          background: var(--color-green);
          width: auto;
          display: inline-block;
          padding: 10px;
          color: #fff;
          cursor: pointer;
          border: none;
          border-radius: 5px;
          transition: background .3s;
          &:hover {
            background: var(--color-green-darken);
          }
        }
      }
    }
  }
</style>
