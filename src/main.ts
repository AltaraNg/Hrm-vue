import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
library.add(faBell);


import "./assets/main.css";

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia());
app.use(router);

app.mount("#app");
