<template>
  <div class="about">
    <h1>API Example</h1>
    <p>
      This page fetches data from a mock API endpoint (`/api/user`) set up in
      `vite.config.ts`.
    </p>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <pre v-if="data">{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(true)
const error = ref<Error | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/user')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    data.value = await response.json()
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
pre {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
