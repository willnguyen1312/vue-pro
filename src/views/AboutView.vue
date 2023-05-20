<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts">
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  }
}
</script>
