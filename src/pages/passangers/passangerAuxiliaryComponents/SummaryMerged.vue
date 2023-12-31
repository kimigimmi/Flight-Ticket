<template>
   <div class="flight-summary">
       <header>
           <span><font-awesome-icon icon="fa-plane-departure" /></span>
           <span class="title">Outward Flight</span>
       </header>
       <div class="plane-name">
           <img :src="planeImg1">
           <span>{{ planeName1 }}</span>
       </div>
       <div class="flight-infos">
           <div class="departure-arrival-infos">
               <header>
                   <span class="title">Departure</span>
                   <div class="flight-contents">
                       <span class="dprT-arrT">{{ departureTime1 }}</span>
                       <span class="flight-date-and-city">{{ formatDate(date1) }}</span>
                       <div class="flight-date-and-city">{{ from1 }}</div>
                   </div>
               </header>
           </div>
           <div class="departure-arrival-infos">
               <header>
                   <span class="title">Arrival</span>
                   <div class="flight-contents">
                       <span class="dprT-arrT arrT">{{ arrivalTime1 }}</span>
                       <span class="flight-date-and-city">{{ formatDate(midnightDateIncrease(date1, arrivalTime1, departureTime1)) }}</span>
                       <div class="flight-date-and-city">{{ to1 }}</div>
                   </div>
               </header>
           </div>
           <div class="flight-class plane-name">
                <span><font-awesome-icon icon="fa-ticket" /></span>
                <span>Flight class - {{ classType1 }}</span>
            </div>
       </div>
       <br> <hr> <br>
       <div class="plane-name">
           <img :src="planeImg2">
           <span>{{ planeName2 }}</span>
       </div>
       <div class="flight-infos">
           <div class="departure-arrival-infos">
               <header>
                   
                   <span class="title">Departure</span>
                   <div class="flight-contents">
                       <span class="dprT-arrT">{{ departureTime2 }}</span>
                       <span class="flight-date-and-city">{{ formatDate(date2) }}</span>
                       <div class="flight-date-and-city">{{ from2 }}</div>
                   </div>
               </header>
           </div>
           <div class="departure-arrival-infos">
               <header>
                   <span class="title">Arrival</span>
                   <div class="flight-contents">
                       <span class="dprT-arrT arrT">{{ arrivalTime2 }}</span>
                       <span class="flight-date-and-city">{{ formatDate(midnightDateIncrease(date2, arrivalTime2, departureTime2)) }}</span>
                       <div class="flight-date-and-city">{{ to2 }}</div>
                   </div>
               </header>
           </div>
           <div class="flight-class plane-name">
                <span><font-awesome-icon icon="fa-ticket" /></span>
                <span>Flight class - {{ classType2 }}</span>
            </div>
       </div>
   </div>
</template>

<script>
export default {
   props: ['from1', 'from2', 'to1', 'to2', 'planeImg1', 'planeImg2', 'planeName1', 'planeName2', 'departureTime1', 'departureTime2',
    'arrivalTime1', 'arrivalTime2', 'classType1', 'classType2', 'date1', 'date2', 'midnightDateIncrease'],
    data(){
        return {
            formatDate: null,
        }
    },
    created(){
        this.formatDate = this.$store.getters['tickets/getFormatDate'];
    }
}
</script>

<style>

</style>