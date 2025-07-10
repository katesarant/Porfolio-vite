<script setup>
const props = defineProps({
  socialmedia: {
    type: Object,
    required: true
  }
});


</script>

<template>


 <ul class="lg:direction-row direction-col flex gap-8 justify-center my-10">
  <li class="text-shadow-md text-white px-4 tracking-wide text-lg font-bold hover:bg-orange-400 bg-orange-500 rounded-lg p-1 shadow-md hover:text-md">
    <a :href="socialmedia.github">GitHub</a>
  </li>
  <li class="text-shadow-md text-white px-4 tracking-wide text-lg font-bold hover:bg-orange-400 bg-orange-500 rounded-lg p-1 shadow-md hover:text-md">
    <a :href="socialmedia.linkedin">LinkedIn</a>
  </li>
  <li class="text-shadow-md text-white px-4 tracking-wide text-lg font-bold hover:bg-orange-400 bg-orange-500 rounded-lg p-1 shadow-md hover:text-md">
    <a :href="'mailto:' + socialmedia.email">Email</a>
  </li>
</ul> 

</template>