<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/keystroke">Key Stroke</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  border-bottom: 1px solid #e2e8f0;
}

nav {
  display: flex;
  gap: 1.25rem;
  padding: 1rem;
}

nav a {
  color: #475569;
  text-decoration: none;
}

nav a:hover {
  color: #0f172a;
}

nav a.router-link-active {
  color: #16a34a;
  font-weight: 600;
}
</style>
