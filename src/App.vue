<script setup lang="ts">
import { ref } from 'vue'

const SIZE = 10

const green = ref(new Set<number>())

function handleClick() {
  green.value.add(green.value.size + 1)
}

function checkGreen(i: number) {
  return green.value.has(i)
}
</script>

<template>
  <main class="container">
    <div
      v-for="i in SIZE"
      :key="i"
      class="rect"
      :class="{
        green: checkGreen(i)
      }"
    >
      {{ i }}
    </div>

    <button @click="handleClick">Add blue</button>
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

.green {
  background-color: green;
}
</style>
