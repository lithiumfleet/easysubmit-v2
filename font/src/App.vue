<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="page">
    <NavBar />
    <div class="main">
      <RouterView />
    </div>
  </div>
  <footer>Powered by Vue3 & Express.</footer>
</template>

<style scoped>
footer {
  height: 5em;
  font-size: xx-small;
  text-align: center;
  color: #c5c5c6;
}
</style>
