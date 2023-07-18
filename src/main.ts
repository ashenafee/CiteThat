import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import ProgressBar from 'primevue/progressbar';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import './assets/index.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { inputStyle: 'filled' });

app.component('Button', Button);
app.component('InputText', InputText);
app.component('ProgressBar', ProgressBar);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);

app.mount('#app')
