import { createStore } from 'vuex';

import ticketModule from './modules/tickets/index.js';
import passangerModule from './modules/passangers/index.js';

const store = createStore({
    modules: {
        tickets: ticketModule,
        passangers: passangerModule,
    }
});


export default store;