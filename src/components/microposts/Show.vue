<template>
  <div>
    <a><img :src="'https://secure.gravatar.com/avatar/' + avatar" class="gravatar" :alt="user.name"/></a>
    <span class="user"><router-link :to="'/users/' + user.id">{{user.name}}</router-link></span>
    <span class="content">
        {{micropost.content}}
        <img v-if="micropost.picture" :src="'http://localhost:8080/uploads/' + micropost.picture"/>
      </span>
    <span class="timestamp">
        {{Date(micropost.createAt).toString()}}
          <a v-if="current !== null && current.id === user.id" v-on:click.prevent='deletePost(micropost.id)'>delete</a>
      </span>
  </div>
</template>

<script>
  import axios from 'axios'

  let md5 = require('md5')

  export default {
    name: 'PostShow',
    props: ['user', 'micropost'],
    data() {
      return {
        current: null,
        avatar: ''
      }
    },
    methods: {
      deletePost(id) {
        axios.delete(`http://localhost:8080/api/microposts/${id}`, {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(res => {
          console.log(res)
        })
      }
    },
    mounted() {
      this.avatar = md5(this.user.email)
      try {
        this.current = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>

  .content img {
    max-height: 400px;
    max-width: 400px;
  }

</style>
