<script setup>
  const props = defineProps({
    description: {
      type: String,
      default:
        "This is a demo consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
    },
    avatarImage: {
      type: String,
      default: "../assets/profile-user.png",
    },
  });
</script>

<template>
  <div class="flex justify-center lg:flex-row flex-col mt-14">
    <div class="w-full sm:mb-5" id="About">
      <img
        src="../assets/profile-user.png"
        alt="My photo"
        class="rounded-full shadow-lg max-w-[200px] m-auto "
      />
    </div>

    <div class="w-50%">
      <div class="text-lg p-5 bg-zing-50 text-shadow-sm text-pretty">
        {{ description }}
      </div>
    </div>
  </div>
</template>
