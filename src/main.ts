import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import i18n from "./i18n";
import router from "./router";

import "./style.css";
import "./styles/reset.scss";
import "./styles/main.scss";

const pinia = createPinia();

// Resiter 'this.$router' in store instance
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

createApp(App).use(i18n).use(router).use(pinia).mount("#app");
