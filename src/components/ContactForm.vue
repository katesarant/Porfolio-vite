<script setup>
import router from '../router';
  import { reactive } from "vue";
  import { useToast } from "vue-toastification";
  import axios from "axios";

  const form = reactive({
    fullname: "",
    email: "",
    message: "",
    showEmailError: false,
  });
  const toast = useToast();

  const handleSubmit = async () => {
    const checkForEmailError = () => {
      const isValidemail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
          form.email
        );
      const isValidMessage = /^[a-zA-Z0-9\s.,()]+$/.test(form.message.trim());

      const isValidFullname = /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})+$/.test(
        form.fullname
      );
      if(isValidemail & isValidMessage & isValidFullname){
        return true
      }
    };

    if (checkForEmailError() == true) {
      const newMessage = {
        fullname: form.fullname.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      };

      try {
        await axios.post("/api", newMessage);
        toast.success("Job message added Successfully");
        router.push("/messages")
      } catch (error) {
        console.error("Error fetching message ", error);
        toast.error("Job Was Not Added");
      }
    }
  };
</script>

<template>
  <div class="flex justify-center py-15">
 
    <div class="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">
        Sent Me your message
      </h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label
            for="name"
            type="text"
            pattern="/[a-z]{1,220}"
            class="block text-sm font-medium text-gray-700"
            >Full Name</label
          >
          <input
            type="test"
            v-model="form.fullname"
            id="fullname"
            name="fullname"
            placeholder="Jone Doe"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            v-model="form.email"
            id="email"
            name="email"
            placeholder="youremail@email.com"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <label for="text" class="block text-sm font-medium text-gray-700"
            >Your Message</label
          >
          <textarea
            name="message"
            type="text"
            v-model="form.message"
            placeholder="Write your message"
            id="message"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
          </textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-orange-500 tracking-wide text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
