<template>
    <div class="flight-summary">
        <font-awesome-icon icon="fa-solid fa-plane" />
        <div class="flight-summary-infos">
            <div class="flight-summary-elements">
                <div class="flight-summaries multiple-summaries">
                    <div class="flight-summary-airline">
                        <img :src="img1">
                        <span>{{ planeName1 }}</span>
                    </div>

                    <div class="flight-summary-airline">
                        <img :src="img2">
                        <span>{{ planeName2 }}</span>
                    </div>

                    <div class="flight-city-codes">
                        <span>{{ city_code_from1 }} > </span>
                        <span>{{ city_code_from2 }} > </span>
                        <span>{{ city_code_to2 }}</span>
                    </div>

                </div>

                <div class="flight-summary-promo flight-summaries">
                    <div>
                        <span><font-awesome-icon icon="fa-briefcase" /></span>
                        <span>1x15 kg</span>
                    </div>
                    <div>Connecting Flight</div>
                </div>
                <div class="flight-summary-time">
                    <div class=" flight-summaries">
                        {{ departureTime1 }} --> {{ arrivalTime2 }}
                    </div>
                    <div class="total-flight-time">
                        <span>{{ totalTime(departureTime1, arrivalTime2) }}</span>
                    </div>
                </div>
                <div class="flight-summary-price flight-summaries">
                    {{ price1 + price2 }} TL
                </div>
            </div>
            <button @click="selectFlight" class="slct-btn">Select ></button>
        </div>
        <div v-if="detailVisible" class="segment-detail">
            <div class="segment-info">
                <span>{{ planeName1 }} |</span>
                <span>Flight: Code |</span> <!--Buraya flight code'u gelecek !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                <span>Class: {{ className1 }}</span>
            </div>
            <div class="segment-airports">
                <div class="segment-airports-origin">
                    <span class="dprtr-time">{{ departureTime1 }} - </span>
                    <span>{{ formatDate(date1) }} - </span>
                    <span>{{ from1 }}</span>
                </div>

                <div class="segment-airport-destination">
                    <span class="arrvl-time">{{ arrivalTime1 }} - </span>
                    <!--!!!!!!!!!! Eğer arrival time gece 12'yi geçerse date'e 1 gün eklenecek-->
                    <span>{{ formatDate(midnightDateIncrease(date1, arrivalTime1, departureTime1)) }} - </span>
                    <span>{{ to1 }}</span>
                </div>
                    <div>
                         <span><font-awesome-icon :icon="'fas fa-concierge-bell'" class="custom-bell-icon" /></span>
                         <span>{{ roomService(planeName1) }}</span>
                    </div>
            </div>
            <br>
            <div class="line">
                <div>Transfer <strong>{{ totalTime(arrivalTime1, departureTime2) }}</strong> Waiting Time</div>
            </div>
            <br>
            <div class="segment-info">
                <span>{{ planeName2 }} |</span>
                <span>Flight: Code |</span> <!--Buraya flight code'u gelecek !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                <span>Class: {{ className2 }}</span>
            </div>
            <div class="segment-airports">
                <div class="segment-airports-origin">
                    <span class="dprtr-time">{{ departureTime2 }} - </span>
                    <span>{{ formatDate(date2) }} - </span>
                    <span>{{ from2 }}</span>
                </div>

                <div class="segment-airport-destination">
                    <span class="arrvl-time">{{ arrivalTime2 }} - </span>
                    <!--!!!!!!!!!! Eğer arrival time gece 12'yi geçerse date'e 1 gün eklenecek-->
                    <span>{{ formatDate(midnightDateIncrease(date2, arrivalTime2, departureTime2)) }} - </span>
                    <span>{{ to2 }}</span>
                </div>
                    <div>
                         <span><font-awesome-icon :icon="'fas fa-concierge-bell'" class="custom-bell-icon" /></span>
                         <span>{{ roomService(planeName2) }}</span>
                    </div>
            </div>

        </div>
        <button @click="toggleDetail" class="detail-btn">Detail ></button>
    </div>
</template>

<script>
export default {
    props: ['id','id1', 'id2', 'date1', 'date2', 'from1', 'from2', 'to1', 'to2', 'city_code_from1', 'city_code_from2', 'city_code_to1', 'city_code_to2',
        'planeName1', 'planeName2', 'img1', 'img2', 'departureTime1', 'departureTime2', 'arrivalTime1', 'arrivalTime2',
        'price1', 'price2', 'className1', 'className2', 'formatDate', 'totalTime'],
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
        midnightDateIncrease(newDate, arrT, dprT) {
               const arrivalInt = Math.floor(parseFloat(arrT));
               const departureInt = Math.floor(parseFloat(dprT));
               if (departureInt > arrivalInt) {
                    const dateArray = newDate.split('.');
                    console.log(dateArray)
                    dateArray.splice(0, 1, (parseFloat(dateArray[0]) + 1));
                    newDate = dateArray.join('.');
               }
               return newDate;
          },
          selectFlight(){
               this.$router.push(`/passangerInfos/${this.id}`);
          }
    }
}
</script>

<style scoped>
.flight-summary {
    border: solid 1px #ccd1cf;
    box-shadow: 2px 2px 10px rgba(196, 196, 196, 0.3), -2px -2px 1px rgba(191, 191, 191, 0.3);
    margin-bottom: 10px;
    cursor: pointer;
    min-width: 40rem;
    font-size: 14px;
}

.fa-plane {
    position: relative;
    top: -18px;
    left: 50%;
    color: #53605e; 
    width: 15px;
}

.flight-summary-infos {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
}

.flight-summary-elements {
    display: flex;
    justify-content: space-between;
}

.flight-summary:hover {
    background: rgb(241, 249, 240);
}

.flight-summaries {
    flex: 1;
    white-space: normal;
    word-wrap: break-word;
    /* Kelimeler arası taşmayı engeller */
    min-width: 7rem;
}

.multiple-summaries div:nth-child(1) {
    margin-bottom: 12px;
}

.flight-summary-airline {
    display: flex;
    align-items: center;
    height: 20%;
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

.fa-briefcase {
     margin-right: 7px;
     color: #53605e;
}

.flight-summary-promo div:nth-child(2) {
    color: #e12424;
    margin-top: 5px;
}

.flight-summary-time {
    margin-left: 7rem;
}

.total-flight-time {
    margin: 3px 0;
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
    margin: auto 0;
    /* 'auto' is used to center elements */
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

.custom-bell-icon {
     color: orange;
     margin-right: 5px;
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

.line {
    border-top: 1px dashed #727e7c;
    height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
}


.line div {
    display: inline-block;
    padding: 0.3rem 1rem;
    background-color: #fff;
}
</style>


