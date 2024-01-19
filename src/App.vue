<script setup lang="ts">
const handleClick = (event: MouseEvent) => {
  console.log('click button')

  event.target?.dispatchEvent(new CustomEvent('click'))
}
</script>

<template>
  <main>
    <div>
      <button @click="handleClick">Click me</button>
    </div>
  </main>
</template>

<style scoped></style>
