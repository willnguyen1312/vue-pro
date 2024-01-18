<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <main>
    <div
      @click="
        (event) => {
          console.log(event.target)
        }
      "
    >
      <h1>Click me 🤗</h1>
      <button @click="open = true">Open Modal</button>

      <Teleport to="body">
        <div v-if="open" class="modal">
          <p>Hello from the modal!</p>
          <button @click="open = false">Close</button>
        </div>
      </Teleport>
    </div>
  </main>
</template>

<style scoped></style>
