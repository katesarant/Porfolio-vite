<script setup>
  import router from "../router";
  import { reactive, onMounted, computed } from "vue";
  import { useToast } from "vue-toastification";
  import axios from "axios";

  const props = defineProps({
    class: {
      type: String,
      default:
        "mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400",
    },
  });

  const today = new Date().toISOString().split("T")[0];

  const state = reactive({
    allSkills: [],
    selectedSkills: [],
    inputSkill: "",
    expiriences: [],
  });

  // Fetch skills from API
  onMounted(async () => {
    const res = await axios.get("http://localhost:9002/skills");
    state.allSkills = res.data.map((x) => x);
  });

  // Computed filtered list (optional: based on input)
  const filteredSkills = computed(() => {
    return state.allSkills.filter((skill) =>
      skill.name.toLowerCase().includes(state.inputSkill.toLowerCase())
    );
  });

  // Add selected skill to the list
  const addSkill = () => {
    const skill = state.inputSkill.trim();

    if (skill && !state.selectedSkills.includes(skill)) {
      state.selectedSkills.push(skill);
    }
    state.inputSkill = "";
  };

  // --- todo!
  const isNotValid = (exp) => {
    if (!exp.date_from || !exp.date_to) return true;

    const from = new Date(exp.date_from);
    const to = new Date(exp.date_to);

    return to < from; // true means invalid
  };

  const addExperience = () => {
    state.expiriences.push({
      date_from: "",
      date_to: "",
      position: "",
      company_name: "",
    });
  };

  const removeExperience = (index) => {
    state.expiriences.splice(index, 1);
  };

  const form = reactive({
    fullname: "",
    jobTitle: "",
    cvfile: "",
    avatarImg: "",
    description: "",
    skills: [],
    exp_prof: [],
    contact: {
      github: "",
      linkedin: "",
      email: "",
    },
    showEmailError: false,
  });
  const toast = useToast();

  const handleSubmit = async () => {
    const checkForErrors = () => {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
        form.contact.email.trim()
      );
      const isValidMessage = /[a-zA-Z0-9.s,()]/.test(form.description.trim());
      const isValidFullname = /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})+$/.test(
        form.fullname
      );
      const isValidSkills = state.selectedSkills.length > 0;
      const isValidSkillsGithubLink = /^https:\/\/github\.com\/.*$/.test(
        form.contact.github.trim()
      );
      const isValidLinkedinLink =
        /^https:\/\/(www\.)?linkedin\.com\/in\/.+$/.test(
          form.contact.linkedin.trim()
        );

      // Check experience validity
      const hasValidExperiences =
        state.expiriences.length > 0 &&
        state.expiriences.every((exp) => {
          if (isNotValid(exp)) {
            toast.error(
              `Invalid dates for experience: "${exp.position || "Unknown"}"`
            );
            return false;
          }
          return true;
        });

      if (
        isValidEmail &&
        isValidMessage &&
        isValidFullname &&
        isValidLinkedinLink &&
        isValidSkillsGithubLink &&
        isValidSkills &&
        hasValidExperiences
      ) {
        return true;
      }

      toast.error("Please check your input fields.");
      return false;
    };

    if (checkForErrors() == true) {
      const newPorfolio = {
        fullname: form.fullname,
        jobTitle: form.jobTitle,
        // cvfile: form.cvfile,
        // avatarImg: form.avatarImg,
        description: form.description,
        skills: state.selectedSkills,
        exp_prof: state.expiriences,
        contact: {
          github: form.contact.github.trim(),
          linkdin: form.contact.linkedin.trim(),
          email: form.contact.email.trim(),
        },
      };

      try {
        await axios.post("http://localhost:9005/portfolio", newPorfolio);
        toast.success("portfolio added Successfully");
        router.push("/main");
      } catch (error) {
        console.error(
          "Error fetching portfolio:",
          error.$event,
          error.response?.status,
          error.response?.data || error.message
        );

        toast.error("Portfolio Was Not Added");
      }
    }
  };
</script>

<template>
  <div class="flex justify-center py-15">
    <div class="w-full max-w-md lg:p-6 p-2 bg-white rounded-2xl shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">
        Create your portfolio
      </h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label
            for="name"
            type="text"
            class="block text-sm font-medium text-gray-700"
            >Full Name</label
          >
          <input
            type="text"
            v-model="form.fullname"
            id="fullname"
            name="fullname"
            placeholder="Jone Doe"
            class="mt-1 w-full px-4 py-2 border text-pretty border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <!-- job -->
        <div>
          <label
            for="jobTitle"
            type="text"
            pattern="/[a-z]{1,220}"
            class="block text-sm font-medium text-gray-700"
            >Job Title</label
          >
          <input
            type="text"
            v-model="form.jobTitle"
            id="jobTitle"
            name="jobTitle"
            placeholder="Production Manager"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label
            for="cv"
            type="file"
            class="block text-sm font-medium text-gray-700"
            >CV</label
          >
          <input
            type="file"
            id="cv"
            name="cvfile"
            width="50"
            height="50"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label
            for="avatar_img"
            class="block text-sm font-medium text-gray-700"
            >Profile Image</label
          >
          <input
            type="image"
            src="submit_button.png"
            alt="img"
            width="100"
            height="50"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div class="font-bold text-center my-5">Contact</div>
        <!-- email -->
        <div class="flex content-baseline">
          <label for="email" class="blockt-sm m-1 text-gray-700"
            ><i
              class="pi pi-envelope text-center text-2xl"
              style="margin: 7px 11px 0 3px"
            ></i
          ></label>
          <input
            type="email"
            v-model="form.contact.email"
            id="email"
            name="email"
            placeholder="youremail@email.com"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div class="flex content-baseline">
          <label for="github" class="block font-medium m-1 text-gray-700"
            ><i
              class="pi pi-github text-center text-2xl"
              style="margin: 7px 11px 0 3px"
            ></i>
          </label>
          <input
            type="link"
            v-model="form.contact.github"
            id="github"
            name="github"
            placeholder="http://"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div class="flex content-baseline">
          <label for="linkedin" class="block m-1 text-gray-700"
            ><i
              class="pi pi-linkedin text-center text-2xl"
              style="margin: 7px 11px 0 3px"
            ></i
          ></label>
          <input
            type="link"
            v-model="form.contact.linkedin"
            id="linkedin"
            name="linkedin"
            placeholder="http://"
            class="mt-1 w-full px-4 py-2 border text-sm border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div class="font-bold text-md text-center my-5">
          Profecional Experience/Timeline
          <div
            class="w-fit shadow-md text-center rounded-full active:bg-amber-50 bg-amber-500 cursor-pointer"
            @click="addExperience"
          >
            <i class="pi pi-plus text-center m-2"></i>
          </div>
        </div>

        <!-- working exp -->
        <div
          v-for="(exp, index) in state.expiriences"
          :key="index"
          class="m-2 border p-4 rounded-xl shadow"
        >
          <div
            class="w-fit mb-2 shadow-md text-center text-white rounded-full float-end active:bg-amber-50 bg-red-600 cursor-pointer"
            @click="removeExperience(index)"
          >
            <i class="pi pi-minus text-center m-1"></i>
          </div>
          <div>
            <div>
              <label>Starting date</label>
              <input
                type="date"
                v-model="exp.date_from"
                class="mt-1 w-full px-4 py-2 border text-sm border-gray-300 rounded-xl"
                v-bind:max="today"
                required
              />
            </div>
            <div>
              <label>End date</label>

              <input
                type="date"
                v-model="exp.date_to"
                class="mt-1 w-full px-4 py-2 border text-sm border-gray-300 rounded-xl"
                v-bind:max="today"
                required
              />
            </div>
          </div>
          <input
            type="text"
            v-model="exp.position"
            placeholder="Position"
            class="mt-2 w-full px-4 py-2 border text-sm border-gray-300 rounded-xl"
            required
          />
          <input
            type="text"
            v-model="exp.company_name"
            placeholder="Company name"
            class="mt-2 w-full px-4 py-2 border text-sm border-gray-300 rounded-xl"
            required
          />
        </div>

        <!-- skills -->
        <div>
          <select
            v-model="state.inputSkill"
            @change="addSkill"
            id="skillsInput"
            name="skill"
            class="skill mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option disabled value="">Select a skill</option>
            <option
              v-for="skill in state.allSkills"
              :key="skill.id"
              :value="skill.name"
            >
              {{ skill.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-wrap">
          <div
            class="flex justify-evenly bg-grey-300 direction-row"
            v-for="skill in state.selectedSkills"
          >
            <div class="text-[12px] shadow-md rounded-2xl w-fit m-1 p-2">
              {{ skill }}
            </div>
          </div>
        </div>

        <div class="my-5">
          <label for="text" class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            name="description"
            type="text"
            v-model="form.description"
            id="description"
            class="mt-1 w-full px-4 py-2 tracking-wide text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
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
