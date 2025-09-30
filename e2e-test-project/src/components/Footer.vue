<script setup lang="ts">
defineProps({
  author: {
    type: String,
    default: 'Your Name',
  },
  aboutUrl: {
    type: String,
    default: '/about',
  },
})
</script>

<template>
  <footer>
    <p>
      &copy; {{ new Date().getFullYear() }} <a :href="aboutUrl">{{ author }}</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 2rem;
  border-top: 1px solid var(--color-border);
}
</style>
