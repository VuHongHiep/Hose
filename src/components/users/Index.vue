<template>
  <div>
    <h1>All users</h1>

    <ul class="users">
      <li v-for="u in users">
        <img :src="'https://secure.gravatar.com/avatar/' + avatar(u.email)" class="gravatar" :alt="u.name"/>
        <router-link :to="'/users/' + u.id">{{u.name}}</router-link>
        <span v-if="admin && !u.admin">|</span>
        <a v-if="admin && !u.admin" @click.prevent="deleteUser(u.id)">delete</a>
      </li>

    </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  let md5 = require('md5')

  export default {
    name: 'index',
    data() {
      return {
        user: null,
        users: []
      }
    },
    methods: {
      avatar(mail) {
        return md5(mail)
      },
      deleteUser(id) {
        axios.delete(`http://localhost:8080/api/users/${id}`, {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(res => {
          console.log(res)
          if (res.status === 200) {
          }
        })
      }
    },
    mounted() {
      try {
        this.user = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        this.user = null
      }
      axios.get('http://localhost:8080/api/users', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }).then(res => {
        console.log(res)
        this.users = res.data
      })
    },
    computed: {
      admin() {
        return this.user !== null && this.user.admin
      }
    }
  }
</script>

<style scoped>

</style>
