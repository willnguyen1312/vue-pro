<script setup lang="ts">
const handleClick = (event: MouseEvent) => {
  console.log('click button')

  event.target?.dispatchEvent(new CustomEvent('click'))
}

const onFocusOut = (event: FocusEvent) => {
  // 😱
  console.log('focus out, related target:', event.relatedTarget)
}
</script>

<template>
  <div @focusout="onFocusOut">
    <button @click="handleClick">Click me</button>
    <input type="text" placeholder="Oh wow 1" />
    <input type="text" placeholder="Oh wow 2" />
  </div>
</template>

<style scoped></style>
