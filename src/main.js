import { createApp } from 'vue';
import App from './App.vue';
import mitt from 'mitt';
import emitterPlugin from './app/emitter.js';
const createdApp = createApp(App);
createdApp.use(emitterPlugin);
createdApp.mount('#app');