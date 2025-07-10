<script setup>
const props = defineProps({
  skills: {
    type: Array,
    default: () => [
      "C#",
      "Razor Pages",
      "Web-apps",
      "JS",
      "Jquery",
      "DevExpress/DevExtreme",
      "TailwindCss",
      "Git",
      "SQL",
      "Linux",
    ],
  },
});
</script>

<template>
  <div class="mt-20 mb-20 bg-white rounded-xl shadow-md p-4" id="ExpTimeline">
    <div class="text-center lg:text-2xl mb-3 flex ">Skills</div>
 <div class="flex flex-wrap gap-3 justify-center m-auto ">
    <div 
      v-for="skill in skills"
      :key="skill"
      class="text-center w-fit border-2xl text-sm xl:text-lg rounded-2xl p-2 text-pretty shadow-md hover:shodow-lg hover:text-shadow-2xs"
    >
    
     [{{ skill }}]
     
    </div>
    </div>
  </div>
</template>
