<template>
  <div class="row">
    <aside class="col-md-4">
      <section class="user_info">
        <h1>
          <img :src="'https://secure.gravatar.com/avatar/' + avatar" class="gravatar" :alt="name"/>
          {{name}}
        </h1>
      </section>
      <section class="stats">
        <Stats v-bind:id="id" v-bind:followingCount="followingCount" v-bind:followerCount="followerCount"/>
      </section>
    </aside>
    <div class="col-md-8">
      <Follow v-bind:user="user"/>
      <h3>Microposts ({{microposts.length}})</h3>
      <ol v-if="user != null" class="microposts">
        <li v-for="post in microposts" :id="'micropost-' + post.id">
          <PostShow v-bind:user="user" v-bind:micropost="post"/>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import Stats from '../shared/Stats'
  import PostShow from '../microposts/Show'
  import Follow from '../users/Follow'
  import axios from 'axios'

  let md5 = require('md5')

  export default {
    name: 'Show',
    component: {
      Stats,
      PostShow,
      Follow
    },
    data() {
      return {
        id: 0,
        name: '',
        avatar: '',
        user: null,
        microposts: [],
        followingCount: 0,
        followerCount: 0
      }
    },
    mounted() {
      axios.get(`http://localhost:8080/api/users/${this.$route.params.id}`, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }).then(res => {
        console.log(res)
        this.user = res.data.user
        this.id = this.user.id
        this.name = this.user.name
        this.avatar = md5(this.user.email)
        this.microposts = res.data.microposts
        this.followingCount = res.data.followingCount
        this.followerCount = res.data.followerCount
      })
    }
  }
</script>

<style scoped>

</style>
