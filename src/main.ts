import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

import App from "./App.vue";
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
library.add(faBell);


import "./assets/main.css";

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(plugin, defaultConfig({
    config: {
        classes: generateClasses({
            submit: {
                input: 'bg-altara-blue w-full py-2 text-lg rounded text-white formkit-loading:bg-gray-300 ',

            }
        })
    }
}));

app.use(createPinia());
app.use(router);

app.mount("#app");
