<template>
  <div>
    <h1>Log in</h1>

    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <form accept-charset="UTF-8" @submit.prevent="login" method="post">

          <input name="utf8" type="hidden" value="&#x2713;"/>
          <input name="authenticity_token" type="hidden" value="NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo="/>

          <label for="session_email">Email</label>
          <input class="form-control" id="session_email" v-model="email" type="text"/>

          <label for="session_password">Password</label>
          <input class="form-control" id="session_password" v-model="password" type="password"/>

          <input class="btn btn-primary" name="commit" type="submit" value="Log in"/>
        </form>

        <p>New user?
          <router-link to="/users/signup">Sign up now!</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      validate() {

      },
      login() {
        const formData = new FormData()
        formData.append('email', this.email)
        formData.append('password', this.password)
        axios.post('http://localhost:8080/api/users/login', formData, {
          headers: {}
        }).then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          this.$router.push({
            name: 'Home'
          })
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
