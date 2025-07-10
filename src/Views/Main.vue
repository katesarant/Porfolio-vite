<script setup>
  import HeroSection from "../components/HeroSection.vue";
  import AboutMe from "../components/AboutMe.vue";
  import SkillsSection from "../components/SkillsSection.vue";
  import ExpTimelines from "../components/ExpTimeline.vue";
  import Contact from "../components/Contact.vue";
  import { ref, onMounted } from "vue";
  import router from "@/router";
  import axios from "axios";

  const item = ref(null); // This will hold your fetched portfolio data

  onMounted(async () => {
    const res = await axios.get("http://localhost:9005/portfolio");
    const last = res.data.length-1
    item.value = res.data[last];
  
  });

</script>

<template>
  <div v-if="item">
    <HeroSection
      :name="item.fullname"
      :JobTitle="item.jobTitle"
      :github="item.contact.github"
    />
    <AboutMe :description="item.description" />
    <SkillsSection :skills="item.skills" />
    <ExpTimelines :workingexpirience="item.exp_prof" />
    <Contact :links="item.contact" />
  </div>
  <div v-else>{{}}</div>
</template>
