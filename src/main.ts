import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

import App from "./App.vue";
import router from "./router";


import "./assets/main.css";

const app = createApp(App);
app.use(plugin, defaultConfig({
    config: {
        classes: generateClasses({
            submit: {
                input: 'bg-altara-blue w-full py-2 text-lg rounded text-white formkit-loading:bg-gray-300 ',

            }
        })
    }
}));

app.use(router);
app.use(createPinia());


app.mount("#app");
