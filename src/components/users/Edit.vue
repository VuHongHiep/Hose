<template>
  <div>
    <h1>Update your profile</h1>

    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <form accept-charset="UTF-8" @submit.prevent="update" class="new_user" id="new_user" method="post">
          <input name="data_method" type="hidden" value="patch"/>

          <input name="utf8" type="hidden" value="&#x2713;"/>
          <input name="authenticity_token" type="hidden" value="NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo="/>

          <Error v-bind:errors="error"/>

          <label for="user_name">Name</label>
          <input id="user_name" type="text" v-model="name" class="form-control"/>

          <label for="user_email">Email</label>
          <input id="user_email" type="email" v-model="email" class="form-control"/>

          <label for="user_password">Password</label>
          <input id="user_password" type="password" v-model="password" class="form-control"/>

          <label for="user_password_confirmation">Confirmation</label>
          <input id="user_password_confirmation" name="password_confirmation" type="password" class="form-control"/>

          <input class="btn btn-primary" name="commit" type="submit" value="Update my account"/>
        </form>

        <div class="gravatar_edit">
          <img :src="'https://secure.gravatar.com/avatar/' + avatar" class="gravatar" :alt="name"/>
          <a href="http://gravatar.com/emails" target="_blank">change</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Error from '../shared/Error'
  import axios from 'axios'

  let md5 = require('md5')

  export default {
    name: 'Edit',
    component: {
      Error
    },
    data() {
      return {
        user: null,
        error: [],
        name: '',
        email: '',
        password: '',
        avatar: ''
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

        let re = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(this.email).toLowerCase())) {
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
      update() {
        if (this.validate()) {
          const formData = new FormData()
          formData.append('name', this.name)
          formData.append('email', this.email)
          formData.append('password', this.password)
          axios.patch('http://localhost:8080/api/users', formData, {
            headers: {'Authorization': 'Bearer' + localStorage.getItem('token')}
          }).then(res => {
            console.log(res)
          })
        }
      }
    },
    mounted() {
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user !== null) {
        this.name = this.user.name
        this.email = this.user.email
        this.avatar = md5(this.user.email)
      }
    }
  }
</script>

<style scoped>

</style>
