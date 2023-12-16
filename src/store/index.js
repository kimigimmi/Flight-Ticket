import { createStore } from 'vuex';

import ticketModule from './modules/tickets/index.js';
import passangerModule from './modules/passangers/index.js';
import calendarModule from './modules/calendar/index.js';

const store = createStore({
    modules: {
        tickets: ticketModule,
        passangers: passangerModule,
        calendar: calendarModule
    }
});


export default store;