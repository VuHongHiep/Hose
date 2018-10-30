<template>
  <div>
    <h1>Sign up</h1>

    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <form accept-charset="UTF-8" @submit.prevent="signUp" class="new_user" id="new_user" method="post">
          <input name="utf8" type="hidden" value="&#x2713;"/>
          <input name="authenticity_token" type="hidden" value="NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo="/>

          <template>
            <Error v-bind:errors="error"></Error>
          </template>

          <label for="user_name">Name</label>
          <input id="user_name" v-model="name" type="text"/>

          <label for="user_email">Email</label>
          <input id="user_email" v-model="email" type="email"/>

          <label for="user_password">Password</label>
          <input id="user_password" v-model="password" type="password"/>

          <label for="user_password_confirmation">Confirmation</label>
          <input id="user_password_confirmation" v-model="c_password" type="password"/>

          <input class="btn btn-primary" name="commit" type="submit" value="Create my account"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Error from '../shared/Error'
  import axios from 'axios'

  export default {
    name: 'New',
    component: {
      Error
    },
    data() {
      return {
        error: [],
        name: '',
        email: '',
        password: '',
        c_password: ''
      }
    },
    methods: {
      validate() {
        var result = true
        this.error = []
        if (this.name.length === 0) {
          this.error.push('Name is empty')
          result = false
        }

        // let re = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!this.email.includes('@')) {
          this.error.push('Email is not valid')
          result = false
        }

        if (this.password.length < 6) {
          this.error.push('Pass is short')
          result = false
        }

        if (this.password !== this.c_password) {
          this.error.push('Pass is not match')
          result = false
        }

        return result
      },
      signUp() {
        if (this.validate()) {
          const formData = new FormData()
          formData.append('name', this.name)
          formData.append('email', this.email)
          formData.append('password', this.password)
          axios.post('http://localhost:8080/api/users', formData, {
            headers: {}
          }).then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', res.data.user)
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
