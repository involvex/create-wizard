<script setup lang="ts">
import { ref, onMounted } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})
</script>

<template>
  <button @click="toggleTheme">
    Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
</style>
