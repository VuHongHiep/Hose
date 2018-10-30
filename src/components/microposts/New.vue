<template>
  <form accept-charset="UTF-8" @submit.prevent="send" class="new_user" id="new_post" method="post"
        enctype="multipart/form-data">
    <input name="utf8" type="hidden" value="&#x2713;"/>
    <input name="authenticity_token" type="hidden" value="NNb6+J/j46LcrgYUC60wQ2titMuJQ5lLqyAbnbAUkdo="/>
    <Error v-bind:errors="error"/>
    <div class="field">
      <textarea v-model="content" form="new_post" placeholder="Compose new micropost..."></textarea>
    </div>
    <span class="picture">
      <input type="file" ref="picture" accept="image/jpeg, image/gif, image/png" @change="onFileChanged">
    </span>
    <input class="btn btn-primary" name="commit" type="submit" value="Post"/>
  </form>
</template>

<script>
  import Error from '../shared/Error'
  import axios from 'axios'

  export default {
    name: 'PostNew',
    props: ['user'],
    component: {
      Error
    },
    data() {
      return {
        error: [],
        content: '',
        picture: null
      }
    },
    methods: {
      onFileChanged(event) {
        this.picture = event.target.files[0]
      },
      validate() {
        this.error = []
        let contentLength = this.content.length
        if (contentLength === 0 || contentLength > 80) {
          this.error.push('Content length fail')
          return false
        }
        return true
      },
      send() {
        if (this.validate()) {
          const formData = new FormData()
          formData.append('content', this.content)
          if (this.picture !== null) {
            formData.append('picture', this.picture)
          }
          axios.post('http://localhost:8080/api/microposts', formData, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$emit('newPost')
              this.content = ''
              this.$refs.picture.value = ''
            }
          })
        }
      }
    }
  }
</script>


<style scoped>
</style>
