<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();

const isMessages = () => route.path == '/messages' || route.name == "not-found";
console.log(isMessages())
</script>

<template >
    <section>

 <div
  :class="[
    isMessages() ? 'absolute bottom-0' : '',
    'bg-white',
    'border-xl',
    'text-center',
    'text-sm'
  ]"
>

    
     © 2025 Jane Doe. Built with Vue + Tailwind.
    </div>
    </section>
</template>