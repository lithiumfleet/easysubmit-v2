<script setup>
import NavBar from './components/NavBar.vue'
import WelcomeTitle from './components/WelcomeTitle.vue';
import FlowAreaV2 from './components/FlowAreaV2.vue';
</script>

<template>
  <NavBar/>
  <div class="user-area">
    <WelcomeTitle/>  

    <FlowAreaV2/>
  </div>
  <footer>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  </footer>

</template>

<style scoped>
.user-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
