<template>
  <div v-if="user !== null" class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <Info v-bind:user="user" v-bind:microposts="microposts"/>
      </section>
      <section class="stats">
        <Stats v-bind:id="user.id" v-bind:followingCount="followingCount" v-bind:followerCount="followerCount"/>
      </section>
      <section class="micropost_form">
        <PostNew v-on:newPost="reload"/>
      </section>
    </aside>
    <div class="col-md-8">
      <h3>Micropost Feed</h3>
      <ol class="microposts">
        <ul>
          <li v-for="feed in microposts" :id="'micropost-' + feed.micropost.id">
            <PostShow v-bind:user="feed.user" v-bind:micropost="feed.micropost"/>
          </li>
        </ul>
      </ol>
    </div>
  </div>
  <div v-else>
    <div class="center jumbotron">
      <h1>Welcome to the Sample App</h1>
      <h2>
        This is the home page for the
        <a href="http://www.railstutorial.org/">Ruby on Rails Tutorial</a>
        sample application.
      </h2>
      <router-link to="/users/signup" class="btn btn-lg btn-primary">Sign up now!</router-link>
    </div>
    <a href="http://rubyonrails.org/"><img src="../assets/rails.png" alt="Rails logo"/></a>
  </div>
</template>

<script>
  import Info from './users/Info'
  import Stats from './shared/Stats'
  import PostNew from './microposts/New'
  import PostShow from './microposts/Show'
  import axios from 'axios'

  export default {
    name: 'Home',
    data() {
      return {
        user: null,
        microposts: [],
        followingCount: 0,
        followerCount: 0
      }
    },
    components: {
      Info,
      Stats,
      PostNew,
      PostShow
    },
    methods: {
      load() {
        try {
          this.user = JSON.parse(localStorage.getItem('user'))
          axios.get(`http://localhost:8080/api/users/${this.user.id}`, {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
          }).then(res => {
            console.log(res)
            // this.microposts = res.data.microposts
            this.followingCount = res.data.followingCount
            this.followerCount = res.data.followerCount
          })
          axios.get(`http://localhost:8080/api/users/feed`, {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
          }).then(res => {
            console.log('feed: ')
            console.log(res)
            this.microposts = res.data
          })
        } catch (e) {
          this.user = null
        }
      },
      reload() {
        this.load()
      }
    },
    mounted() {
      this.load()
    }
  }
</script>

<style scoped>

</style>
