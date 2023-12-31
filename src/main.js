import { createApp } from 'vue'

import router from './router.js';
import store from './store/index.js';
import App from './App.vue'
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBriefcase, faUser, faAddressCard, faPlaneDeparture, faTicket, faCircle, faCheck, faPlane, faClock, faFlag, faPoll,
faPlaneUp, faConciergeBell, faCrosshairs, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';

library.add(faBriefcase, faUser, faAddressCard, faPlaneDeparture, faTicket, faCircle, farCircle, faCheck, faPlane, faClock, faFlag, faPoll, 
faPlaneUp, faConciergeBell, faCrosshairs, faLocationDot );



const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');
