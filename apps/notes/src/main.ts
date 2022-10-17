import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { marked } from 'marked';
const markedMixin = {
  methods: {
    md: (input: string) => {
      return marked(input);
    },
  },
};

createApp(App).mixin(markedMixin).use(router).mount('#app');
