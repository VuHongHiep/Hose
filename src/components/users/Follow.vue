<template>
  <div v-if="!owned" id="follow_form">
    <form v-if="following" accept-charset="UTF-8" @submit.prevent="unFollow" class="edit_relationship" id="unfollow"
          method="post">
      <input name="utf8" type="hidden" value="&#x2713;"/>
      <input name="authenticity_token" type="hidden" value="NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo="/>
      <input class="btn btn-secondary" name="commit" type="submit" value="Unfollow"/>
    </form>
    <form v-else accept-charset="UTF-8" @submit.prevent="follow" class="edit_relationship" id="follow" method="post">
      <input name="utf8" type="hidden" value="&#x2713;"/>
      <input name="authenticity_token" type="hidden" value="NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo="/>
      <input class="btn btn-primary" name="commit" type="submit" value="Follow"/>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Follow',
    props: ['user'],
    data() {
      return {
        current: null,
        owned: false,
        following: false
      }
    },
    methods: {
      load() {
        try {
          this.current = JSON.parse(localStorage.getItem('user'))
          this.owned = this.current.id === this.user.id
          axios.get(`http://localhost:8080/api/users/following/${this.user.id}`, {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
          }).then(res => {
            console.log(res)
            this.following = res.data.didFollow
          })
        } catch (e) {
          console.log(e)
          this.current = null
        }
      },
      follow() {
        const formData = new FormData()
        axios.post(`http://localhost:8080/api/users/follow/${this.user.id}`, formData, {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(res => {
          console.log(res)
        })
      },
      unFollow() {
        const formData = new FormData()
        axios.post(`http://localhost:8080/api/users/unfollow/${this.user.id}`, formData, {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(res => {
          console.log(res)
        })
      }
    },
    watch: {
      'user': function() {
        if (this.user !== null) {
          this.load()
        }
      }
    }
  }
</script>

<style scoped>

</style>
