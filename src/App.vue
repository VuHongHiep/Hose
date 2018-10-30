<template>
  <div>
    <Header v-bind:user="user"/>
    <div class="container">
      <router-view/>
      <Footer/>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'app',
    data() {
      return {
        user: null
      }
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style>

</style>
