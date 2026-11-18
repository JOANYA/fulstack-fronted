import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css'; // Asegúrate que apunte a tu archivo CSS con Tailwind
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');