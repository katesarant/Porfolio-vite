<script setup>
  import { RouterLink } from "vue-router";
  import { reactive, onMounted } from "vue"; // ref another way of using ref is reactive .

  import axios from "axios";
  const state = reactive({
    messages: [],
    isLoading: true,
  });
  console.log(state.messages);
  onMounted(async () => {
    try {
      const res = await axios.get("/api");
      // jobs.value = res.data;
      state.messages = res.data;

      console.log(state.messages);
    } catch (error) {
      console.error("Error fetching jobs", error);
    } finally {
      state.isLoading = false;
    }
  });
</script>

<template>


<div class="flex justify-center ">

<div v-if="state.loading">Loading...</div>

<div v-else-if="state.messages.length === 0" class="text-2xl text-gray-500 text-center mt-28  h-[250px] w-fit">
  <div class="bg-white p-5 rounded-2xl m-auto shadow-lg" >No messages yet!</div>
</div>

<div v-else class="my-10">
  <ul >
    <li class="bg-white flex gap-5 border-amber-500 border-2 shadow-lg p-3 my-2 rounded-2xl" v-for="msg in state.messages" :key="msg.id">
         <div >{{ msg.fullname }}</div>
         <div> <a :href="`mailto:${msg.email}`">{{ msg.email }}</a></div>
         <div>{{ msg.message }}</div>
    </li>
  </ul>
</div>
</div>


</template>
