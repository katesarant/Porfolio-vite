<script setup>
  import ContactForm from "./ContactForm.vue";
  import Socials from "./Socials.vue";

  const props = defineProps({
    links: {
      type: Object,
       required: true
    },
  });


</script>

<template>
  <div id="Contact">
    <ContactForm />
    <Socials :socialmedia="links" />
  </div>
</template>
