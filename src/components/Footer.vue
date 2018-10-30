<template>
  <footer class="footer">
    <small>
      The <a href="http://www.railstutorial.org/">Ruby on Rails Tutorial</a>
      by <a href="http://www.michaelhartl.com/">Michael Hartl</a>
    </small>
    <nav>
      <ul>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><a href="http://news.railstutorial.org/">News</a></li>
      </ul>
    </nav>
  </footer>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped>

</style>
