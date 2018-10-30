<template>
  <div class="stats">
    <router-link :to="`/users/${id}/following`">
      <strong id="following" class="stat">
        {{followingCount}}
      </strong>
      following
    </router-link>
    <router-link :to="`/users/${id}/follower`">
      <strong id="followers" class="stat">
        {{followerCount}}
      </strong>
      followers
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Stats',
    props: ['id', 'followingCount', 'followerCount']
  }
</script>

<style scoped>

</style>
