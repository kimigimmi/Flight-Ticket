export default {
   chosenFlightNormal(context, payload){
       context.commit('chosenFlightNormal', payload);
   },
   chosenFlightConnecting(context, payload){
       context.commit('chosenFlightConnecting', payload);
   },
   mergedChosenConnecting(context, payload){
       context.commit('mergedChosenConnecting', payload);
   },
   setFormatDate(context, payload) {
    context.commit('setFormatDate', payload);
  }
};