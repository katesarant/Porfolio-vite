<script setup>
const props = defineProps({
  workingexpirience: {
    type: Array,
    default: () => [
      { date_from: '2025-07-06', date_to: '2025-07-24',
       jobPosition:"Job position",company_name: 'Donor inc.' }
    ]
  }
});



</script>

<template>
  <div class="mb-20" id="ExpTimeline">
    <div class="text-lg text-center font-bold mb-5">
      Profecional Experience/Timeline
    </div>
    <ul class="text-shadow-md flex flex-col items-center gap-1 mb-3"
     v-for="(exp, index) in workingexpirience" :key="index"
>
 <li class="flex gap-4">
  <div class="text-md text-gray-600">
    {{ exp.date_from.split("-").join("/") }} - {{ exp.date_to.split("-").join("/") }}
  </div>
  <div class="font-semibold text-md text-gray-800">
    {{ exp.jobPosition }} <span class="text-gray-500">@{{ exp.company_name }}</span>
  </div>
</li>

 
    </ul>
  </div>
</template>
