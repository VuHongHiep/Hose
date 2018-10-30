<template>
  <div class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <img :src="'https://secure.gravatar.com/avatar/' + avatar(user)" class="gravatar" :alt="name(user)"/>
        <h1>{{name(user)}}</h1>
        <span><router-link :to="`/users/${id(user)}`">view my profile</router-link></span>
        <span>Microposts {{microposts.count}}</span>
      </section>
      <section class="stats">
        <Stats v-bind:id="id(user)" v-bind:followingCount="followingCount" v-bind:followerCount="followerCount"/>
        <div class="user_avatars">
          <router-link v-for="u in follows" :key="u.id" :to="`/users/${u.id}`">
            <img :src="'https://secure.gravatar.com/avatar/' + avatar(u)" class="gravatar" :alt="u.name"/>
          </router-link>
        </div>
      </section>
    </aside>
    <div class="col-md-8">
      <h3>{{title}}</h3>
      <ul class="users follow">
        <li v-for="u in follows">
          <img :src="'https://secure.gravatar.com/avatar/' + avatar(u)" class="gravatar" :alt="u.name"/>
          <router-link :to="`/users/${u.id}`">{{u.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Stats from '../shared/Stats'
  import axios from 'axios'

  let md5 = require('md5')

  export default {
    name: 'Profile',
    props: ['title'],
    component: {
      Stats
    },
    data() {
      return {
        current: null,
        user: null,
        microposts: [],
        followingCount: 0,
        followerCount: 0,
        follows: []
      }
    },

    methods: {
      avatar(user) {
        if (user !== null) {
          return md5(user.email)
        } else {
          return ''
        }
      },
      name(user) {
        if (user !== null) {
          return user.name
        } else {
          return ''
        }
      },
      id(user) {
        if (user !== null) {
          return user.id
        } else {
          return 0
        }
      },
      load() {
        axios.get(`http://localhost:8080/api/users/${this.$route.params.id}/${this.title}`, {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(res => {
          console.log(res)
          this.follows = res.data
        })
      }
    },
    watch: {
      'title': function() {
        if (this.title === 'following' || this.title === 'follower') {
          this.load()
        }
      }
    },
    created() {
      try {
        this.current = JSON.parse(localStorage.getItem('user'))
        axios.get(`http://localhost:8080/api/users/${this.$route.params.id}`, {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(res => {
          this.user = res.data.user
          this.microposts = res.data.microposts
          this.followingCount = res.data.followingCount
          this.followerCount = res.data.followerCount
        })
        this.load()
      } catch (e) {
        this.user = null
      }
    }
  }
</script>

<style scoped>
  .user_avatars img {
    max-height: 30px;
    max-width: 30px;
  }
</style>
