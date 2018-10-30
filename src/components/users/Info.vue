<template>
  <div>
    <img :src="'https://secure.gravatar.com/avatar/' + avatar" class="gravatar" :alt="user.name"/>
    <h1>{{user.name}}</h1>
    <span><router-link :to="'/users/' + user.id">view my profile</router-link></span>
    <span>{{microposts.length}} microposts</span>
  </div>
</template>

<script>
  let md5 = require('md5')

  export default {
    name: 'Info',
    props: ['user', 'microposts'],
    computed: {
      avatar() {
        return md5(this.user.email)
      }
    }
  }
</script>

<style scoped>

</style>
