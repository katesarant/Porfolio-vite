import './assets/main.css'
import Toast from "vue-toastification";
import router from './router';
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

app.use(router);
app.mount('#app')




