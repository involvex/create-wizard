<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <NavigationBar />
  <main>
    <RouterView />
  </main>
  <Footer author="My Awesome Company" aboutUrl="/about" />
</template>

<style scoped>
main {
  min-height: calc(100vh - 10rem);
}
</style>
