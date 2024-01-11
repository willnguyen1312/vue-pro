<script setup lang="ts">
import { ref } from 'vue'

const SIZE = 10

const red = ref(new Set<number>())

function handleClick() {
  red.value.add(red.value.size + 1)
}

function checkRed(i: number) {
  return red.value.has(i)
}
</script>

<template>
  <main class="container">
    <!-- IN the dom -->
    <div
      v-for="i in SIZE"
      :key="i"
      class="rect"
      :class="{
        red: checkRed(i)
      }"
    >
      {{ i }}
    </div>

    <button @click="handleClick">Add red color</button>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  gap: 4px;
  padding: 4px;
}

.rect {
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: blue;
}

.red {
  background-color: red;
}
</style>
