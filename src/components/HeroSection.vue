<script setup>
import { useLink } from 'vue-router';

  const props = defineProps({
    name: {
      type: String,
      default: "Jone Doe",
    },
    JobTitle: {
      type: String,
      default: "Web application & Fullstack Developer",
    },
       github: {
      type: String,
      required:true
    },

  });
</script>

<template>
  <div class="text-center mt-5 text-shadow-md">
    <div class="text-2xl py-4">Hi, I'm {{ name }}</div>
    <div class="text-xl py-3">{{ JobTitle }}</div>
    <div class="text-xl py-3 flex-wrap flex justify-center">
      <a class="hover:text-lg hover:text-orange-400 p-1 rounded-lg" href="">
        [ Download CV ]</a
      >
      |
      <a
        class="hover:text-lg hover:text-orange-400 p-1 rounded-lg"
       :href="github"
      >
        [ View Projects ] </a
      >
    </div>
  </div>
</template>
