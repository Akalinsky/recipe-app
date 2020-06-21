<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="loginUser( {username: username, password: password} )">
      <label>Username</label>
      <input type="text" required v-model="username">
      <label>Password</label>
      <input type="password" required v-model="password">
      <div class="login-action">
        <button type="submit" class="login-button">Login</button>
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
      'loginUser'
    ])

  }

}
</script>

<style lang="scss">
  .login-form {
    width: 20%;
    min-width: 500px;
    margin: 20px auto;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
    padding: 20px;
    h2 {
      padding: 0 0 10px 0;
      margin: 0;
    }
    form {
      display: flex;
      justify-content: center;
      flex-flow: column nowrap;
      label {
        font-size: 16px;
        margin: 10px;
      }
      input {
        align-self: center;
        border-radius: 4px;
        font-size: 16px;
        padding: 12px 20px;
        border: 1px solid #ccc;
      }
      .login-action {

        .login-button {
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
