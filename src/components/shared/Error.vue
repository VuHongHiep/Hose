<template>

  <div v-if="errors.length > 0" id="error_explanation">
    <div class="alert alert-danger">
      The form contains {{errors.length}} error.
    </div>
    <ul>
      <li v-for="error in errors">{{error}}</li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'Error',
    props: ['errors']
  }
</script>

<style scoped>

</style>
