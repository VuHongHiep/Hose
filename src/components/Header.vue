<template>
  <header class="navbar navbar-fixed-top navbar-inverse">
    <div class="container">
      <a href="/" id="logo"> sample app </a>
      <nav>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/help">Help</router-link>
          </li>
          <li v-if="user != null">
            <router-link to="/users">Users</router-link>
          </li>
          <li v-if="user != null" class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Account <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li>
                <router-link :to="'/users/' + user.id">Profile</router-link>
              </li>
              <li>
                <router-link :to="'/users/' + user.id + '/edit'">Setting</router-link>
              </li>
              <li class="divider"></li>
              <li>
                <a @click.prevent="logOut">Log Out</a>
              </li>
            </ul>
          </li>
          <li v-if="user == null">
            <router-link to="/users/login">Log in</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Header',
    methods: {
      logOut() {
        console.log('Log out')
        axios.delete('http://localhost:8080/api/users/logout', {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(res => {
          console.log(res)
          localStorage.setItem('token', '')
          localStorage.setItem('user', '')
        })
      }
    },
    computed: {
      user() {
        try {
          return JSON.parse(localStorage.getItem('user'))
        } catch (e) {
          return null
        }
      }
    }
  }
</script>

<style scoped>

</style>
