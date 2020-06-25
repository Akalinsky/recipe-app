<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm'

// @ is an alias to /src

export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
}
</style>
