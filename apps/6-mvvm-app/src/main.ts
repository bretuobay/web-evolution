// apps/6-mvvm-app/src/main.ts
import { createApp } from 'vue';
import App from './App.vue';

// Import the design system styles
import '@wees/design-system/src/styles/base.css'
import '@wees/design-system/src/styles/components.css'
import '@wees/design-system/src/styles/10s.css'

const app = createApp(App);
app.mount('#app');
