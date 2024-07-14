<script setup>
import NavBar from './components/NavBar.vue'
import WelcomeTitle from './components/WelcomeTitle.vue';
import FlowArea from './components/FlowArea.vue';
</script>

<template>
  <NavBar/>
  <div class="user-area">
    <WelcomeTitle/>  

    <FlowArea/>
  </div>

</template>

<style scoped>
.user-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
