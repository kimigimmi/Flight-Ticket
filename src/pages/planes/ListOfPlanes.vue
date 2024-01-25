<template>
    <div class="container">
            <div class="short-info" v-if="chosenFlightNormalInfos && chosenFlightNormalInfos.length > 0">
                <div class="short-info-part">
                    <span v-if="chosenFlightNormalInfos[0].from">{{ chosenFlightNormalInfos[0].from }} => </span>
                    <span v-if="chosenFlightNormalInfos[0].to">{{ chosenFlightNormalInfos[0].to }} | </span>
                    <span v-if="chosenFlightNormalInfos[0].date">{{ chosenFlightNormalInfos[0].date }} | </span>
                    <span v-if="chosenFlightNormalInfos[0].passangerCount">{{ chosenFlightNormalInfos[0].passangerCount }}
                        Passangers | </span>
                    <span v-if="chosenFlightNormalInfos[0].class">{{ chosenFlightNormalInfos[0].class }}</span>
                </div>
        </div>

        <div class="planes-row">
            <div class="filter-column">
                <div class="favorite-search search">
                    <button class="favorite-search-add-btn favourite-search-and-price-alert-btn">
                        <span class="icon-joint-features"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="24" fill="none" stroke="#888888" stroke-width="2">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                       </span>
                       <span>Add The Search To Favourites</span>
                    </button>
                </div>
                <div class="price-alert search">
                    <button class="price-alert-btn favourite-search-and-price-alert-btn">
                        <span class="icon-joint-features"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16"> 
                            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/> 
                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 
                            3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/> </svg>
                       </span>
                       <span>Create Price Alarm</span>
                    </button>
                </div>
                <div class="filter-accordion">
                    <div class="filter-header">
                        <div class="filter-header-title">Filter</div>
                        <div class="filter-header-clear">Clear</div>
                    </div>
                    <div class="filter-card">         
                        <div @click="toggleOptions('transferItems')" class="transfer-header filter-type">
                            <div>
                               <span class="icon-joint-features"><font-awesome-icon icon="fa-solid fa-flag" /></span>
                               <span>Transferring</span>
                            </div>
                            <span v-if="!transferItems"><img class="expand_icon" src="@/assets/expand_more_icon.png"></span>
                            <span v-else-if="transferItems"><img class="expand_icon" src="@/assets/expand_less_icon.png"></span>
                        </div>
                        <div v-if="transferItems" class="transfer-options">
                            <div class="transfer-direct-option flight-option">
                                <input type="checkbox" name="direct-flights" v-model="directChecked">
                                <label for="direct-flights">Direct Flights</label>
                            </div>
                            <div class="transfer-connecting-option flight-option">
                                <input type="checkbox" name="connecting-flights" v-model="connectingChecked">
                                <label for="connecting-flights">Connecting Flights</label>
                            </div>
                        </div>
                    </div>
                    <div class="filter-card ">
                        <div @click="toggleOptions('ticketPriceItems')" class="filter-type">
                            <div>
                               <span class="icon-joint-features"><font-awesome-icon :icon="'fas fa-poll'" /></span>
                               <span>Ticket Price</span>
                            </div>
                            <span v-if="!ticketPriceItems"><img class="expand_icon" src="@/assets/expand_more_icon.png"></span>
                            <span v-else-if="ticketPriceItems"><img class="expand_icon" src="@/assets/expand_less_icon.png"></span>
                        </div>
                        <div v-if="ticketPriceItems" class="price-and-time-filter">
                            <div class="price-and-time-value">
                                <div>Maximum Price :</div>
                                <div class="rangeValue">{{ priceValue }}</div>
                            </div>
                            <div>
                                <input type="range" id="price-slider" :value="priceValue" :min="minPrice" :max="maxPrice"
                                    @input="rangePrice"> 
                            </div>
                        </div>
                    </div>
                    <div class="filter-card ">
                        <div @click="toggleOptions('departureArrivalTimeItems')" class="filter-type">
                            <div>
                               <span class="icon-joint-features"><font-awesome-icon icon="fa-clock" /></span>
                               <span>Departure/Arrival Times</span>
                            </div>   
                            <span v-if="!departureArrivalTimeItems"><img class="expand_icon" src="@/assets/expand_more_icon.png"></span>
                            <span v-else-if="departureArrivalTimeItems"><img class="expand_icon" src="@/assets/expand_less_icon.png"></span>
                        </div>
                        <div v-if="departureArrivalTimeItems">Alt divi</div>
                    </div>
                    <div class="filter-card ">
                        <div @click="toggleOptions('flightTimeItems')" class="filter-type">
                            <div>
                               <span class="icon-joint-features"><font-awesome-icon icon="fa-clock" /></span>
                               <span>Flight Time</span>
                            </div>   
                            <span v-if="!flightTimeItems"><img class="expand_icon" src="@/assets/expand_more_icon.png"></span>
                            <span v-else-if="flightTimeItems"><img class="expand_icon" src="@/assets/expand_less_icon.png"></span>
                        </div>
                        <div v-if="flightTimeItems" class="price-and-time-filter">
                            <div class="price-and-time-value">
                                <div>Maximum Time :</div>
                                <div class="rangeValue">{{ timeValue }}</div>
                            </div>
                            <div>
                                <input type="range" id="price-slider" :value="timeValue" :min="minTime" :max="maxTime"
                                    :step="0.01" @input="rangeTime"> 
                            </div>
                        </div>
                    </div>
                    <div class="filter-card ">
                        <div @click="toggleOptions('airWayItems')" class="filter-type">
                            <div>
                               <span class="icon-joint-features"><font-awesome-icon icon="fa-solid fa-plane-up" /></span>
                               <span>AirWays</span>
                            </div>   
                            <span v-if="!airWayItems"><img class="expand_icon" src="@/assets/expand_more_icon.png"></span>
                            <span v-else-if="airWayItems"><img class="expand_icon" src="@/assets/expand_less_icon.png"></span>
                        </div>
                        <div v-if="airways && airways.length > 0 && airWayItems">
                            <ul>
                                <li v-for="plane in airways" :key="plane">
                                    <div class="transfer-direct-option flight-option">
                                        <input type="checkbox" :name="plane" @change="selectedAirways">
                                        <label :for="plane">{{ plane }}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--If needed add airports div like airways-->
                </div>
            </div>

            <div class="search-result-column">
                <div class="flight-list-header">
                    <div class="flight-list-date">
                        <span class="flight-list-date-prev btn">Buraya önceki gün fiyati</span>
                        <span v-if="chosenFlightNormalInfos[0] && chosenFlightNormalInfos[0].date"
                            class="flight-list-date-current">{{ formatDate(chosenFlightNormalInfos[0].date) }}</span>
                        <span class="flight-list-date-next btn">Sonraki gun fiyati</span>
                    </div>
                    <div class="flight-list-sorting">
                        <div class="header-summary">Kaç uçuştan kaçi gösteriliyor</div>
                        <div class="result-sorting">
                            <div class="cheaper sorting-option sub-result-sorting" @click="sortingCheapest()"
                                :class="{ 'selected': selectedSortingOption === 'cheapest' }">
                                <span v-if="selectedSortingOption === 'cheapest'"><font-awesome-icon icon="fa-check" /></span>
                                <span>The Cheapest</span>
                            </div>
                            <div class="faster sorting-option sub-result-sorting" @click="sortingFastest()"
                                :class="{ 'selected': selectedSortingOption === 'fastest' }">
                                <span v-if="selectedSortingOption === 'fastest'"><font-awesome-icon icon="fa-check" /></span>
                                <span>The Fastest</span>
                            </div>
                            <div class="more-option sub-result-sorting" @click="moreClick">
                                <div class="sorting-option" :class="{ 'selected': selectedSortingOption === 'more' }">
                                    <span v-if="selectedSortingOption === 'more'"><font-awesome-icon icon="fa-check" /></span>
                                    <span v-if="selectedSortingOption !=='more'"><img class="more-icon" src="@/assets/more.png" alt="Menu Icon"></span>
                                    <span>More</span>
                                    <span><img class="expand_icon" src="@/assets/expand_more_icon.png"></span>
                                </div>
                                <div v-if="moreClicked" class="select-box-alternative">
                                    <div @click="earlyLate('departureEarly')">Departure early to late</div>
                                    <div @click="earlyLate('departureLate')">Departure late to early</div>
                                    <div @click="earlyLate('arrivalEarly')">Arrival early to late</div>
                                    <!-- <div @click="earlyLate('arrivalLate')">Arrival late to early</div> -->
                                    <!--Similar like above-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flight-list-heading">
                    <div class="flight-list-heading-airline">AirLine</div>
                    <div class="flight-list-heading-promo">Flight Detail</div>
                    <div class="flight-list-heading-time">Departure</div>
                    <div class="flight-list-heading-price">Price</div>
                </div>
                <div class="flight-list-body">
                    <ul>
                        <template
                            v-if="chosenFlightNormalInfos && chosenFlightNormalInfos.length > 0 && (directChecked || (!directChecked && !connectingChecked))">
                            <li v-for="flightItem in chosenFlightNormalInfos" :key="flightItem.id">
                                <summary-normal 
                                    :id="flightItem.id"      
                                    :date="flightItem.date"       
                                    :from="flightItem.from"      
                                    :to="flightItem.to"      
                                    :city_code_from="flightItem.city_code_from"
                                    :city_code_to="flightItem.city_code_to" 
                                    :planeName="flightItem.name"
                                    :img="flightItem.img" 
                                    :departureTime="flightItem.departureTime"
                                    :arrivalTime="flightItem.arrivalTime" 
                                    :price="flightItem.price"
                                    :className="flightItem.class" 
                                    :formatDate="formatDate" 
                                    :totalTime="totalTime">
                                </summary-normal>
                            </li>
                        </template>

                        <template
                            v-if="chosenFlightConnectingInfos && chosenFlightConnectingInfos.length > 0 && (connectingChecked || (!directChecked && !connectingChecked))">
                            <li v-for="flightItem in chosenFlightConnectingInfos" :key="flightItem.selectedFlightId">
                                <summary-connecting
                                    :id="flightItem.selectedFlightId"   
                                    :id1="flightItem.id1"                               :id2="flightItem.id2"   
                                    :date1="flightItem.date1"                           :date2="flightItem.date2" 
                                    :from1="flightItem.from1"                           :from2="flightItem.from2"
                                    :to1="flightItem.to1"                               :to2="flightItem.to2"
                                    :city_code_from1="flightItem.city_code_from1"       :city_code_from2="flightItem.city_code_from2" 
                                    :city_code_to1="flightItem.city_code_to1"           :city_code_to2="flightItem.city_code_to2" 
                                    :planeName1="flightItem.name1"                      :planeName2="flightItem.name2" 
                                    :img1="flightItem.img1"                             :img2="flightItem.img2"
                                    :departureTime1="flightItem.departureTime1"         :departureTime2="flightItem.departureTime2"
                                    :arrivalTime1="flightItem.arrivalTime1"             :arrivalTime2="flightItem.arrivalTime2"
                                    :price1="flightItem.price1"                         :price2="flightItem.price2" 
                                    :className1="flightItem.class1"                     :className2="flightItem.class2" 
                                    :formatDate="formatDate" 
                                    :totalTime="totalTime">
                                </summary-connecting>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import SummaryNormal from './flightSummaryComponents/SummaryNormal.vue';
import SummaryConnecting from './flightSummaryComponents/SummaryConnecting.vue';

export default {
    components: {
        SummaryNormal,
        SummaryConnecting
    },
    data() {
        return {
            activeComponent: null,
            selectedSortingOption: '',
            moreClicked: false,
            directChecked: false,
            connectingChecked: false,
            stableAirways: null,
            currentAirways: {},
            activeAirways: [],
            priceValue: 10000000,  // default value must be high due the slider value starts with the highest price value of the day
            maxPrice: 0,
            minPrice: 0,
            timeValue: 1000000,
            maxTime: 0,
            minTime: 0,
            transferItems: false,
            ticketPriceItems: false,
            departureArrivalTimeItems: false,
            flightTimeItems: false,
            airWayItems: false
        }
    },
    created(){
        this.$store.dispatch('tickets/setFormatDate', this.formatDate);
    },
    mounted() {   // After the page loaded mounted works
        const chosenNormalFlights = this.$store.getters['tickets/chosenFlightNormal'];
        const mergedChosenConnecting = this.$store.getters['tickets/mergedChosenConnecting'];
        const prices = [];
        const times = [];

        chosenNormalFlights.map(flight => prices.push(flight.price) && times.push(this.totalTime(flight.departureTime, flight.arrivalTime)));
        mergedChosenConnecting.map(flight => prices.push(flight.price1 + flight.price2) && times.push(this.totalTime(flight.departureTime1, flight.arrivalTime2)));

        this.priceFilter(prices);
        this.timeFilter(times);
    },
    computed: {
        chosenFlightNormalInfos() {
            let chosenFlight = this.$store.getters['tickets/chosenFlightNormal'];
            chosenFlight = chosenFlight.filter(flight => flight.price <= this.priceValue);
            chosenFlight = chosenFlight.filter(flight => this.stringToFloatOfTime(this.totalTime(flight.departureTime, flight.arrivalTime)) <= this.timeValue);
            if (this.activeAirways.length > 0) {
                return chosenFlight.filter(flight => this.activeAirways.includes(flight.name));  // filter ile orijinal data değişmiyor.Ama splice ile değişiyor.Yani state'teki array'i splice ile silmemeliyiz !!!
            }
            return chosenFlight;
        },
        chosenFlightConnectingInfos() {
            let isCoherent = true;
            let allPairedFlights = [];
            let chosenFlight = this.$store.getters['tickets/chosenFlightConnecting'];
            if (chosenFlight && chosenFlight.length > 0) {
                for (let i = 0; i < chosenFlight[0].length; i++) {
                    for (let j = 0; j < chosenFlight[1].length; j++) {
                        if (chosenFlight[0][i].to === (chosenFlight[1][j].from) ) {
                            if (chosenFlight[0][i].date === chosenFlight[1][j].date  ) {
                                isCoherent = parseFloat(chosenFlight[0][i].arrivalTime) < parseFloat(chosenFlight[1][j].departureTime) &&
                                    parseFloat(chosenFlight[0][i].departureTime) < parseFloat(chosenFlight[0][i].arrivalTime);
                            } else if(parseFloat(chosenFlight[0][i].date.substring(0,5)) < parseFloat(chosenFlight[1][j].date.substring(0,5))){
                                if(parseFloat(chosenFlight[0][i].departureTime) < parseFloat(chosenFlight[0][i].arrivalTime)) {
                                    isCoherent = true;
                                } else if(parseFloat(chosenFlight[0][i].departureTime) > parseFloat(chosenFlight[0][i].arrivalTime)) {
                                    isCoherent = parseFloat(chosenFlight[0][i].arrivalTime) < parseFloat(chosenFlight[1][j].departureTime);
                                }
                            }
                           if(isCoherent) {
                            allPairedFlights.push({
                                selectedFlightId: Math.floor(Math.random() * Math.pow(10, 7)), // Daha sonra bunu üste al, öncekilerle(silinenlerden değil) eşit çıkarırsa değiştir
                                id1: chosenFlight[0][i].id,                                  id2: chosenFlight[1][j].id,
                                passangerCount: chosenFlight[0][i].passangerCount,          
                                adultCount: chosenFlight[0][i].adultCount,                 
                                babyCount: chosenFlight[0][i].babyCount,                    
                                class1: chosenFlight[0][i].class,                            class2: chosenFlight[1][j].class,
                                name1: chosenFlight[0][i].name,                              name2: chosenFlight[1][j].name,
                                img1: chosenFlight[0][i].img,                                img2: chosenFlight[1][j].img,
                                date1: chosenFlight[0][i].date,                              date2: chosenFlight[1][j].date,
                                from1: chosenFlight[0][i].from,                              from2: chosenFlight[1][j].from,
                                to1: chosenFlight[0][i].to,                                  to2: chosenFlight[1][j].to,
                                city_code_from1: chosenFlight[0][i].city_code_from,          city_code_from2: chosenFlight[1][j].city_code_from,
                                city_code_to1: chosenFlight[0][i].city_code_to,              city_code_to2: chosenFlight[1][j].city_code_to,
                                departureTime1: chosenFlight[0][i].departureTime,            departureTime2: chosenFlight[1][j].departureTime,
                                arrivalTime1: chosenFlight[0][i].arrivalTime,                arrivalTime2: chosenFlight[1][j].arrivalTime,
                                price1: chosenFlight[0][i].price,                            price2: chosenFlight[1][j].price
                            });
                          }  
                        }
                    }
                }
            }
            this.$store.dispatch('tickets/mergedChosenConnecting', allPairedFlights);
            allPairedFlights = allPairedFlights.filter(flight => flight.price1 + flight.price2 <= this.priceValue);
            allPairedFlights = allPairedFlights.filter(flight => this.stringToFloatOfTime(this.totalTime(flight.departureTime1, flight.arrivalTime2)) <= this.timeValue);
            if (this.activeAirways.length > 0) {
                return allPairedFlights.filter(flight => this.activeAirways.includes(flight.name1) && this.activeAirways.includes(flight.name2));
            }
            return allPairedFlights;
        },
        airways() {         // computed değerleri return etmeye yarar. Yani this.stableAirways=this.calculateAirways diyerek değişim yapamayız.
            this.updateStableAirways();     // Bunun için de method'larda gerekli işlemleri yapıp onları buraya çağırıyoruz.
            return this.stableAirways;
        },
    },
    watch: {
        timeValue: function (newValue) {   // 12.05 yerine 12.50 almış düzelt !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            let intPartOfTime = parseInt(newValue);
            let decimalPartOfTime = (newValue - intPartOfTime) * 100;
            if (decimalPartOfTime >= 60) {
                intPartOfTime += 1;
                decimalPartOfTime = 0;
            }
            this.timeValue = parseFloat(`${intPartOfTime}.${decimalPartOfTime >= 60 ? '00' : decimalPartOfTime}`).toFixed(2);
        }
    },
    methods: {
        rangePrice(event) {
            this.priceValue = event.target.value;
        },
        rangeTime(event) {
            this.timeValue = event.target.value;
        },
        priceFilter(prices) {
            this.maxPrice = prices.reduce((max, current) => (current > max ? current : max), prices[0]);
            this.minPrice = prices.reduce((min, current) => (current < min ? current : min), prices[0]);
            this.priceValue = this.maxPrice;
        },
        timeFilter(times) {
            const intTimes = times.map(time => {
                return this.stringToFloatOfTime(time);
            });
            this.maxTime = Math.max(...intTimes);
            this.minTime = Math.min(...intTimes);
            this.timeValue = this.maxTime;
        },
        stringToFloatOfTime(time) {
            const indexOfh = time.indexOf('h');
            const intTime = time.substring(0, indexOfh);
            const indexOfGap = time.indexOf(' ');
            const indexOfM = time.indexOf('m');
            const decimalTime = parseFloat(time.substring(indexOfGap + 1, indexOfM));
            const formattedDecimalTime = decimalTime < 10 ? `0${decimalTime}` : `${decimalTime}`;
            return parseFloat(`${intTime}.${formattedDecimalTime}`);
        },

        calculateAirways() {
            const selectedAirWays = [];
            for (let i = 0; i < this.chosenFlightNormalInfos.length; i++) {
                const value = this.chosenFlightNormalInfos[i].name;
                if (!selectedAirWays.includes(value)) {
                    selectedAirWays.push(value);
                }
            }
            for (let i = 0; i < this.chosenFlightConnectingInfos.length; i++) {
                const value1 = this.chosenFlightConnectingInfos[i].name1;
                const value2 = this.chosenFlightConnectingInfos[i].name2;
                if (!selectedAirWays.includes(value1)) {
                    selectedAirWays.push(value1);
                } else if (!selectedAirWays.includes(value2)) {
                    selectedAirWays.push(value2);
                }
            }
            return selectedAirWays;
        },
        updateStableAirways() {
            if (!this.stableAirways) {
                this.stableAirways = this.calculateAirways();
            }
        },
        selectedAirways(event) {
            const inputName = event.target.name;
            const isActive = event.target.checked;
            this.currentAirways[inputName] = isActive;
            this.activeAirways = Object.keys(this.currentAirways).filter(input => this.currentAirways[input]);    // activeAirways = activeAirways
        },
        formatDate(dateString) {
            if (!dateString) {
                return "Invalid Date";  // Handle the case where dateString is undefined or null
            }
            const options = { weekday: 'long', year: 'numeric', day: 'numeric', month: 'long' };
            // We are replacing month and day parts. Because in index.js they are in the wrong side. It must be "months.days.years"
            const dateToArray = dateString.split('.');
            const splicedValue = dateToArray.splice(1, 1).join();
            dateToArray.unshift(splicedValue);
            const formattedDate = new Date(dateToArray.join('.')).toLocaleDateString('en-US', options);
            return formattedDate;
        },
        totalTime(dprT, arrT) {
            let dprTFloat = parseFloat(dprT);
            let arrTFloat = parseFloat(arrT);
            let dprTInt = Math.floor(dprTFloat);
            let arrTInt = Math.floor(arrTFloat);
            let dprTDecimal = parseFloat(((dprTFloat - dprTInt) * 100).toFixed(0));
            let arrTDecimal = parseFloat(((arrTFloat - arrTInt) * 100).toFixed(0));
            if (dprTDecimal > arrTDecimal) {
                arrTDecimal += 60;
                arrTInt -= 1;
            }
            if (arrTDecimal > dprTDecimal) {
                if (arrTInt > dprTInt) {
                    return `${arrTInt - dprTInt}h ${(arrTDecimal - dprTDecimal)}min`;
                } else if (arrTInt === dprTInt) {
                    return `${(arrTDecimal - dprTDecimal)}min`;
                }
                else {
                    return arrTInt + 24 - dprTInt === 0 ? `${(arrTDecimal - dprTDecimal)}min` : `${arrTInt + 24 - dprTInt}h ${(arrTDecimal - dprTDecimal)}min`;
                }
            } else if (arrTDecimal === dprTDecimal) {
                if (arrTInt >= dprTInt) {
                    return `${arrTInt - dprTInt}h`;
                }
                else {
                    return `${arrTInt + 24 - dprTInt}h`;
                }
            }
        },
        sortingCheapest() {
            this.moreClicked = false;
            this.selectedSortingOption = 'cheapest'; // For class
            if (this.chosenFlightNormalInfos && this.chosenFlightNormalInfos.length > 1) {
                this.chosenFlightNormalInfos.sort((p1, p2) => {
                    if (p1.price < p2.price) return -1;
                    if (p1.price > p2.price) return 1;
                    return 0;
                });
            }
            if (this.chosenFlightConnectingInfos.length > 1) {
                this.chosenFlightConnectingInfos.sort((p1, p2) => {
                    if (p1.price1 + p1.price2 < p2.price1 + p2.price2) return -1;
                    if (p1.price1 + p1.price2 > p2.price1 + p2.price2) return 1;
                    return 0;
                });
            }
            // this.$forceUpdate(); 
            /* forceUpdate yazarak render etmeye yani güncellemeye zorladık. Muhtemelen computed'taki 
                  chosenFlightConnectingInfos() kısmında 2 tane iç içe for-loop zaman aldı ve bunun yüzünden geç kaldı. */
            /*Bu işlem async olduğundan yani muhtemelen önce chosenNormalInfos'a göre render ediyordu. O işlem bitmeden, chosenConnectingInfos'u
            render etmeye çalışınca, yani chosenNormal için template'teki güncelleme bitmeden bu method'daki chosenConnectingInfos'u
            çalıştırıp daha erken bitirdiği için template'teki ikinci <li> 'deki chosenConnecting olan için array güncellenmedi. */
        },
        sortingFastest() {
            this.moreClicked = false;
            this.selectedSortingOption = 'fastest';
            if (this.chosenFlightNormalInfos && this.chosenFlightNormalInfos.length > 1) {
                this.chosenFlightNormalInfos.sort((p1, p2) => {
                    if (parseFloat(this.sortingTimeRange(p1.departureTime, p1.arrivalTime)) < parseFloat(this.sortingTimeRange(p2.departureTime, p2.arrivalTime))) return -1;
                    if (parseFloat(this.sortingTimeRange(p1.departureTime, p1.arrivalTime)) > parseFloat(this.sortingTimeRange(p2.departureTime, p2.arrivalTime))) return 1;
                    return 0;
                });
            }
            if (this.chosenFlightConnectingInfos && this.chosenFlightConnectingInfos.length > 1) {
                this.chosenFlightConnectingInfos.sort((p1, p2) => {
                    if (parseFloat(this.sortingTimeRange(p1.departureTime1, p1.arrivalTime2)) < parseFloat(this.sortingTimeRange(p2.departureTime1, p2.arrivalTime2))) return -1;
                    if (parseFloat(this.sortingTimeRange(p1.departureTime1, p1.arrivalTime2)) > parseFloat(this.sortingTimeRange(p2.departureTime1, p2.arrivalTime2))) return 1;
                    return 0;
                });
            }
        },
        sortingTimeRange(dprT, arrT) {   // sortingFastest için yardımcı method. sortingCheapest'tan farkı return'lerin farklı olması.
            let dprTFloat = parseFloat(dprT);
            let arrTFloat = parseFloat(arrT);
            let dprTInt = Math.floor(dprTFloat);
            let arrTInt = Math.floor(arrTFloat);
            let dprTDecimal = parseFloat(((dprTFloat - dprTInt) * 100).toFixed(0));
            let arrTDecimal = parseFloat(((arrTFloat - arrTInt) * 100).toFixed(0));
            if (dprTDecimal > arrTDecimal) {
                arrTDecimal += 60;
                arrTInt -= 1;
            }
            let substitutionOfDecimal = arrTDecimal - dprTDecimal;
            console.log(substitutionOfDecimal)
            if (substitutionOfDecimal < 10) {
                substitutionOfDecimal = substitutionOfDecimal.toString();
                substitutionOfDecimal = '0' + substitutionOfDecimal;
            }
            if (arrTDecimal > dprTDecimal) {
                if (arrTInt > dprTInt) {
                    return `${arrTInt - dprTInt}.${(substitutionOfDecimal)}`;
                } else if (arrTInt === dprTInt) {
                    return `${(substitutionOfDecimal)}`;
                }
                else {
                    return arrTInt + 24 - dprTInt === 0 ? `0.${(substitutionOfDecimal)}` : `${arrTInt + 24 - dprTInt}.${(substitutionOfDecimal)}`;
                }
            } else if (arrTDecimal === dprTDecimal) {
                if (arrTInt >= dprTInt) {
                    return `${arrTInt - dprTInt}`;
                }
                else {
                    return `${arrTInt + 24 - dprTInt}`;
                }
            }
        },
        moreClick() {
            this.moreClicked = !this.moreClicked;
        },
        earlyLate(desiredSorting) {
            this.selectedSortingOption = 'more';
            if ((this.chosenFlightNormalInfos && this.chosenFlightNormalInfos.length > 1) || (this.chosenFlightConnectingInfos && this.chosenFlightConnectingInfos.length > 1)) {
                if (desiredSorting === 'departureEarly') {
                    this.chosenFlightNormalInfos.sort((p1, p2) => {
                        if (parseFloat(p1.departureTime) < parseFloat(p2.departureTime)) return -1;
                        if (parseFloat(p1.departureTime) > parseFloat(p2.departureTime)) return 1;
                        return 0;
                    });
                    this.chosenFlightConnectingInfos.sort((p1, p2) => {
                        if (parseFloat(p1.departureTime1) < parseFloat(p2.departureTime1)) return -1;
                        if (parseFloat(p1.departureTime2) > parseFloat(p2.departureTime2)) return 1;
                        return 0;
                    });
                } else if (desiredSorting === 'departureLate') {
                    this.chosenFlightNormalInfos.sort((p1, p2) => {
                        if (parseFloat(p1.departureTime) > parseFloat(p2.departureTime)) return -1;
                        if (parseFloat(p1.departureTime) < parseFloat(p2.departureTime)) return 1;
                        return 0;
                    });
                    this.chosenFlightConnectingInfos.sort((p1, p2) => {
                        if (parseFloat(p1.departureTime1) > parseFloat(p2.departureTime1)) return -1;
                        if (parseFloat(p1.departureTime2) < parseFloat(p2.departureTime2)) return 1;
                        return 0;
                    });
                } else if (desiredSorting === 'arrivalEarly') {
                    const normalSorting = [];
                    const searchedDayNormalInfos = this.chosenFlightNormalInfos.filter(value => parseFloat(value.departureTime) < parseFloat(value.arrivalTime));
                    if (searchedDayNormalInfos && searchedDayNormalInfos.length > 1) {
                        searchedDayNormalInfos.sort((p1, p2) => {
                            if (parseFloat(p1.arrivalTime) < parseFloat(p2.arrivalTime)) return -1;
                            if (parseFloat(p1.arrivalTime) > parseFloat(p2.arrivalTime)) return 1;
                            return 0;
                        });
                    }
                    const nextDayNormalInfos = this.chosenFlightNormalInfos.filter(value => parseFloat(value.departureTime) > parseFloat(value.arrivalTime));
                    if (nextDayNormalInfos || nextDayNormalInfos.length > 1) {
                        nextDayNormalInfos.sort((p1, p2) => {
                            if (parseFloat(p1.arrivalTime) < parseFloat(p2.arrivalTime)) return -1;
                            if (parseFloat(p1.arrivalTime) > parseFloat(p2.arrivalTime)) return 1;
                            return 0;
                        });
                    }
                    searchedDayNormalInfos.map(value => normalSorting.push(value));
                    nextDayNormalInfos.map(value => normalSorting.push(value));
                    this.$store.dispatch('tickets/chosenFlightNormal', normalSorting); // update the sorting in vuex


                    const connectingSorting = [];
                    const searchedDayConnectingInfos = this.chosenFlightConnectingInfos.filter(value => parseFloat(value.departureTime1) < parseFloat(value.arrivalTime2));
                    if (searchedDayConnectingInfos && searchedDayConnectingInfos.length > 1) {
                        searchedDayConnectingInfos.sort((p1, p2) => {
                            if (parseFloat(p1.arrivalTime2) < parseFloat(p2.arrivalTime2)) return -1;
                            if (parseFloat(p1.arrivalTime2) > parseFloat(p2.arrivalTime2)) return 1;
                            return 0;
                        });
                    }
                    const nextDayConnectingInfos = this.chosenFlightConnectingInfos.filter(value => parseFloat(value.departureTime1) > parseFloat(value.arrivalTime2));
                    if (nextDayConnectingInfos || nextDayConnectingInfos.length > 1) {
                        nextDayConnectingInfos.sort((p1, p2) => {
                            if (parseFloat(p1.arrivalTime2) < parseFloat(p2.arrivalTime2)) return -1;
                            if (parseFloat(p1.arrivalTime2) > parseFloat(p2.arrivalTime2)) return 1;
                            return 0;
                        });
                    }
                    searchedDayConnectingInfos.map(value => connectingSorting.push(value));
                    nextDayConnectingInfos.map(value => connectingSorting.push(value));
                    this.chosenFlightConnectingInfos.splice(0, this.chosenFlightConnectingInfos.length, ...connectingSorting);
                    /* Remove chosenConnecting array in computed, add connectingSorting providing replacement of them.
                    We can't update it in vuex. Because connectingArr in index.js consist of 2 arrays in an array. But here in computed 
                    property we merged these 2 arrays in an array. 
                    As a result we used 3 different methods to change object sorting of the arrays in computed section  */
                }
            }
        },
        toggleOptions(activeItem){
            if(activeItem === 'transferItems') {
                this.transferItems = !this.transferItems;   // veya this[option] = !this[option]  
            } else if(activeItem === 'ticketPriceItems') {
                this.ticketPriceItems = !this.ticketPriceItems;
            } else if(activeItem === 'departureArrivalTimeItems') {
                this.departureArrivalTimeItems = !this.departureArrivalTimeItems;
            } else if(activeItem === 'flightTimeItems' ) {
                this.flightTimeItems = !this.flightTimeItems;
            } else if(activeItem === 'airWayItems') {
                this.airWayItems = !this.airWayItems;
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    padding: 0 5rem;
    overflow: visible !important;
    /* It permits the content to overflow. And !important gives priority to this property before the other rules */
}

/* @media (min-width: 1400px) {
    .container {
        width: 60%;
    }
} */

@media (max-width:1000px) {
    .filter-column {
        width: 100%;
    }
    .planes-row {
        display: block;
        width: 96%;
    }
    .slct-btn {
        font-size: .7rem;
        padding: 6px 4px;
    }
}

.short-info {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    margin: 10px 0;
    font-size: 20px;
}

.fa-plane-up, .fa-flag, .fa-poll, .fa-clock {
    color :#53605e;
}
.short-info-part span:first-child,
.short-info-part span:nth-child(2) {
    font-weight: bold;
}

.planes-row {
    display: flex;
    width: 100%;
}

.flight-list-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #5f6d9a;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    padding: 0.125rem 0.8rem;
    height: 2.5rem;
}

.btn {
    background: #fff;
    color: #000;
    border-radius: 5px;
    padding: 0 5px;
    height: 80%;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.header-summary {
    margin: 10px 0 20px 0;
}

.result-sorting {
    display: flex;
    min-width: 20rem;
}

.sorting-option {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    color: #fff;
    padding: 10px 8px;
    font-size: 13px;
    border-radius: 3px;
    cursor: pointer;
    letter-spacing: 0.05em;
    background-color: #edf0f7;
    color: #53605ed1;
    font-size: 14px;
    font-weight: 500;
}

.sorting-option:hover {
    background-color: #cbcbcb;
}

.result-sorting div.selected {
    background-color: #1b2f6f;
    opacity: 1;
    color: #fff;
}

.sub-result-sorting {
    margin-right: 10px;
}

.fa-check {
    margin-right: 10px;
}


.more-icon { 
    width: 10px;
    margin-right: 6px;
}

.expand_icon {
    width: 17px;
    margin-left: 5px;
}

.select-box-alternative {
    width: 14%;
    text-align: left;
    border-radius: 6px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .12);
    background-color: #fff;
    flex-direction: column;
    position: absolute;
    /* Tıklayıp bu div'i açınca diğer elementleri engellemesin diye */
    min-width: min-content;
    /* Yazıyı tam sığdırsın, normalde nowrap olmasaydı aşağı inecek kadar olan kısmı sağ kısma ekledi ve taşma önlendi */
    font-weight: 400;
    color: #53605e;
    white-space: nowrap;
    /* white-space özelliğinin bir değeri olan nowrap, metni bir satırda tutmayı sağlar. */
    cursor: pointer;
}

.select-box-alternative div {
    padding: 10px;
    /* İçerikle div'in iç kenarlarını artırmak için */
    margin-bottom: 10px;
}

.select-box-alternative div:last-child {
    margin-bottom: 0;
}

.select-box-alternative div:hover {
    background-color: #d7d7d7;
}

.flight-list-heading {
    display: flex;
    justify-content: space-between;
    margin: 20px 1rem 10px 1rem;
    padding: 0 30px;
    min-width: 70%;
    align-items: center;
    /* Yatay hizalama yapma */
}

.flight-list-heading div {
    flex: 1;
    /* Eşit genişlik ayarlama */
    color: #1b2f6fc9;
}

.flight-list-heading-promo {
    margin: 0 5rem;
}

.flight-list-heading-price {
    margin-left: 5rem;
}

ul {
    list-style: none;
}

.filter-column {
    width: 20%;
    margin-right: 10px;
}

.search {
    border: 0.1px solid gray;
    margin-bottom: 5px;
}

.icon-joint-features {
    margin-right: 5px;
}

.favourite-search-and-price-alert-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 800;
    font-style: normal;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    letter-spacing: .5px;
    width: 100%;
    outline: none;
    background-color: rgb(255, 255, 255);
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.favorite-search-add-btn {
    color: rgb(19, 23, 23);
    height: 36px;
    padding: 0px 10px;
}

.price-alert-btn {
    color: #2dc44d;
    height: 36px;
}

.filter-accordion {
    border: 0.1px solid gray;
    border-radius: 3px;
}

.filter-card {
    font-size: 15px;
    border: 0.1px solid rgb(228, 228, 228);
    border-radius: 3px;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    padding: 8px;
}

.filter-card:hover {
    background: #f8faf9;
}

.filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 12px;
    font-weight: 700;
    background: #f8faf9;
}

.filter-header-clear {
    font-size: 13px;
    color: #0087ff;
    font-weight: 400;
    cursor: pointer;
}

label {
    color: #626c6a;
    font-size: 14px;
}

.flight-option {
    display: flex;
    align-items: center;
    margin: 5px 0;
}

.flight-option input {
    margin-right: 8px;
}

.filter-type {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.price-and-time-filter {  
    width: 100%;
}

.price-and-time-value {
    display: flex;
    justify-content: space-between;
    color: #626c6a;
}

input[type="range"] {
    width: 100%;
    /* İnput'u genişletmek için */
    margin: 0;
    /* İnput'un kenar boşluklarını sıfırlamak için */
    cursor: pointer;
}



</style>