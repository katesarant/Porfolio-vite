<script setup>
  import { RouterLink, useRouter } from "vue-router";

  const router = useRouter();

  const goToContact = ($hash) => {
    router.push({ path: "/main", hash: "#" + $hash });
  };
</script>

<template>
  <section>
    <nav class="lg:pt-4  align-baseline justify-center flex-1 lg:flex-row flex-col">
      <ul
        class="pt-4 lg:gap-7 gap-3 flex lg:flex-row flex-col width-fit h-fit bg-white rounded-xl p-4 m-4 shadow-md"
      >
        <li
          class="hover:bg-zinc-50 hover:text-orange-400 p-3 rounded-xl text-center text-shadow-md"
        >
          <RouterLink to="/"> Home </RouterLink>
        </li>
         <li
          class="hover:bg-zinc-50 hover:text-orange-400 p-3 rounded-xl text-center text-shadow-md"
        >
          <RouterLink to="/main"> Main </RouterLink>
        </li>
        <li
          class="hover:bg-zinc-50 hover:text-orange-400 lg:p-3 rounded-xl text-center text-shadow-md"
        >
          <button @click="goToContact('About')">About</button>
        </li>
        <li
          class="hover:bg-zinc-50 hover:text-orange-400 p-3 rounded-xl text-center text-shadow-md"
        >
          <button @click="goToContact('ExpTimeline')">
            Skills & ExpTimeline
          </button>
        </li>
        <li
          class="hover:bg-zinc-50 hover:text-orange-400 p-3 rounded-xl text-center text-shadow-md"
        >
          <button @click="goToContact('Contact')">Contact</button>
        </li>
      </ul>
    </nav>
  </section>
</template>
