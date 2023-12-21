export default {
     chosenFlightNormal(state, payload){
         state.chosenFlightNormal = payload;
     },
     chosenFlightConnecting(state, payload){
        state.chosenFlightConnecting = payload;
     },
     mergedChosenConnecting(state, payload){
        state.mergedChosenConnecting = payload;
     },
     setFormatDate(state, payload) {
      state.formatDate = payload;
    }
};