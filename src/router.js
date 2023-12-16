import { createRouter, createWebHistory } from 'vue-router';

import BookTicket from './pages/tickets/BookTicket.vue';
import ListOfPlanes from './pages/planes/ListOfPlanes.vue';
import PassangerInfos from './pages/passangers/PassangerInfos.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: 'ticket'},
        { path: '/ticket', component: BookTicket},
        { path: '/listOfPlanes', component: ListOfPlanes},
        { path: '/passangerInfos/:id', component: PassangerInfos, props: true }
    ]
});


export default router;