import Vue, { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faUserSecret,
  faUndo,
  faRedo,
  faListOl,
  faListUl,
  faHeading,
  faItalic,
  faBold,
  faBook,
  faStickyNote,
  faNoteSticky,
  faFolder,
  faSave,
  faPencil,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { store } from './store';

/* add icons to the library */
library.add(
  faUserSecret,
  faTableColumns,
  faReadme,
  faUndo,
  faPencil,
  faSave,
  faRedo,
  faFolder,
  faListOl,
  faListUl,
  faHeading,
  faBook,
  faStickyNote,
  faItalic,
  faNoteSticky,
  faBold
);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount('#app');
