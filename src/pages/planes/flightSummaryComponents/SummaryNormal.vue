<template>
     <div class="flight-summary">
          <div class="flight-summary-infos">
               <div class="flight-summary-elements">
                    <div class="flight-summaries">
                         <div class="flight-summary-airline">
                              <img :src="img">
                              <span>{{ planeName }}</span>
                         </div>
                         <div class="flight-city-codes">
                              <span>{{ city_code_from }} > </span>
                              <span>{{ city_code_to }}</span>
                         </div>
                    </div>
                    <div class="flight-summary-promo flight-summaries">
                         <div>1x15 kg</div>
                         <div>Direct Flight</div>
                    </div>
                    <div class="flight-summary-time">
                         <div class=" flight-summaries">
                              {{ departureTime }} --> {{ arrivalTime }}
                         </div>
                         <div class="total-flight-time">
                              <span>{{ totalTime(departureTime, arrivalTime) }}</span>
                         </div>
                    </div>
                    <div class="flight-summary-price flight-summaries">
                         {{ price }} TL
                    </div>
               </div>
               <button @click="selectFlight" class="slct-btn">Select ></button>
          </div>
          <div v-if="detailVisible" class="segment-detail">
               <div class="segment-info">
                    <span>{{ planeName }} |</span>
                    <span>Flight: Code |</span> <!--Buraya flight code'u gelecek !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                    <span>Class: {{ className }}</span>
               </div>
               <div class="segment-airports">
                    <div class="segment-airports-origin">
                         <span class="dprtr-time">{{ departureTime }} - </span>
                         <span>{{ formatDate(date) }} - </span>
                         <span>{{ from }}</span>
                    </div>

                    <div class="segment-airport-destination">
                         <span class="arrvl-time">{{ arrivalTime }} - </span>
                         <!--!!!!!!!!!! Eğer arrival time gece 12'yi geçerse date'e 1 gün eklenecek-->
                         <span>{{ formatDate(midnightDateIncrease(date)) }} - </span>
                         <span>{{ to }}</span>
                    </div>
                    <div>{{ roomService(planeName) }}</div>
               </div>

          </div>
          <button @click="toggleDetail" class="detail-btn">Detail ></button>
     </div>
</template>

<script>
export default {
     props: ['id', 'date', 'from', 'to', 'city_code_from', 'city_code_to', 'planeName', 'img', 'departureTime', 'arrivalTime', 'price', 'className', 'formatDate'
          , 'totalTime'],
     data() {
          return {
               detailVisible: false
          }
     },

     methods: {
          toggleDetail() {
               this.detailVisible = !this.detailVisible;
          },
          roomService(name) {
               if (name === '' || name === undefined) {
                    return 'Invalid'
               } else {
                    if (name === 'THY' || name === 'Sun Express') {
                         return 'Foods are paid.  '
                    } else {
                         return 'Foods are free.'
                    }
               }
          },
          midnightDateIncrease(newDate) { // Ay değişim muhabbeti(ayın 31'ine 1 ekle 32 oluyor) burada da var. Düzelt !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
               const arrivalInt = Math.floor(parseFloat(this.arrivalTime));
               const departureInt = Math.floor(parseFloat(this.departureTime));
               if (departureInt > arrivalInt) {
                    const dateArray = newDate.split('.');
                    dateArray.splice(0, 1, (parseFloat(dateArray[0]) + 1));
                    newDate = dateArray.join('.');
               }
               return newDate;
          },
          selectFlight(){
               this.$router.push(`/passangerInfos/${this.id}`)
          }
     }
}
</script>

<style scoped>       /* İki sub-component'te de birçok style özelliği aynı, bunları teke indir !!!!!!!!!!!!!!!!!!!!!!! */
.flight-summary {
     border: solid 1px black;
     margin-bottom: 10px;
     cursor: pointer;
     min-width: 40rem;
     font-size: 14px;
}

.flight-summary-infos {
     display: flex;
     justify-content: space-between;
     padding: 10px 20px;
}

.flight-summary-elements {
     display: flex;
     justify-content: space-between;
}

.flight-summary:hover {
     background: rgb(212, 210, 210);
}

.flight-summaries {
     flex: 1;
     white-space: normal;
      word-wrap: break-word;
      /* Kelimeler arası taşmayı engeller */
     min-width: 7rem;
}

.flight-summary-airline {
     display: flex;
     align-items: center;
     height: 20%;
     margin: 10px 0;
}

.flight-city-codes {
     font-size: 12px;
     margin-top: 15px;
}

.flight-summary-airline img {
     width: 27px;
     margin-right: 5px;
}

.flight-summary-promo {
     margin-left: 9.5rem;
}

.flight-summary-promo div:nth-child(2) {
     color: #2dc44d;
     margin-top: 5px;
}

.flight-summary-time {
     margin-left: 7rem;
}

.total-flight-time {
     margin: 3px 0;
}

.total-flight-time span:nth-child(1) {
     margin-right: 4px;
}

.flight-summary-price {
     color: #2f2f2f;
     line-height: 22px;
     font-size: 25px;
     font-weight: 700;
     margin-left: 6.5rem;
}

.slct-btn {
     height: 20%;
     background: #2dc44d;
     color: #fff;
     font-weight: 700;
     font-size: 1rem;
     cursor: pointer;
     border: transparent;
     border-radius: 5px;
     padding: 15px 13px;
     display: flex;
     align-items: center;
     margin: auto 0;   /* 'auto' is used to center elements */
}

.slct-btn:hover {
     background: #0aa12b;
}

.detail-btn {
     line-height: 22px;
     color: #0087ff;
     background: transparent;
     border: none;
     margin: 10px 0 10px 22px;
     cursor: grab;
}

.segment-detail {
     font-size: 13px;
     color: #53605e;
     margin: 3px 8px;
}

.segment-info :nth-child(2) {
     margin: 0 6px;
}

.segment-airports {
     margin: 8px 0 0 20px;
}

.segment-airport-destination {
     margin: 3px 0 15px 0;
}
</style>


