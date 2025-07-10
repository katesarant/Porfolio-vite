<script setup>
import NavBar from './Views/NavBar.vue'
// import Main from  './Views/Main.vue'
import Footer from './Views/Footer.vue'
import { RouterView } from 'vue-router';    
</script>

<template>
<div class="min-h-screen bg-zinc-50 text-gray-800 max-w-[1200px] min-w-[270px] m-auto px-8"  >
  
<NavBar />
<RouterView />
<Footer></Footer>

</div>
</template>



