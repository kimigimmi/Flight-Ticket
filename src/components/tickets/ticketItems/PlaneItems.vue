<template >
    <div class="container">
        <form @submit.prevent="submitForm">
            <div class="input-group">
                <div class="form-group">
                    <label for="from">From</label>
                    <input type="text" id="from" placeholder="Enter the city from" v-model.trim="from.val">
                </div>


                <div class="form-group">
                    <label for="to">To</label>
                    <input type="text" id="to" placeholder="Enter the city to" v-model.trim="to.val" />
                </div>
            </div>

            <div class="input-group">
                <div class="form-group">
                    <label for="departure-date">Date of Departure</label>
                    <input type="text" id="departure-date" placeholder="" v-model.trim="dateOfDeparture.val" />
                </div>
                <div class="form-group">
                    <div class="c-box-section">
                        <label for="return-date" id="return-label">Date of Return</label>
                        <div class="one-way-box">
                            <input type="checkbox" value="oneWay" v-model="oneWay.val">
                            <label>One Way</label>
                        </div>
                    </div>
                    <input type="text" id="return-date" v-model.trim="dateOfReturn.val" />
                </div>
            </div>

            <div class="input-group">
                <div class="form-group">
                    <div class="c-box-section">
                        <div class="direct-box">
                            <input type="checkbox" value="direct-flight" v-model="onlyDirectFlight.val">
                            <label>Direct Flight</label>
                        </div>
                    </div>
                    <button class="passanger-counts">Here passanger counts/ and which class</button>
                </div>
                <div class="form-group">
                    <button class="find-ticket-btn">Find Ticket</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            from: {
                val: '',
                isValid: true
            },
            to: {
                val: '',
                isValid: true
            },
            dateOfDeparture: {
                val: '',
                isValid: true
            },
            dateOfReturn: {
                val: '',
                isValid: true
            },
            oneWay: {
                val: '',
                isValid: true
            },
            onlyDirectFlight: {
                val: false,
                isValid: true
            },
            passangerCount: 3,
            adultCount: 2,
            babyCount: 1,
            class: 'economy'

        }
    },

    methods: {
        submitForm() {  // Seçtiğin class'a göre price belirle !!!!!!!!!!!!!!!!!!!!!!!!!!!
            const flightInfos = this.$store.getters['tickets/flightInfos'];

            this.$store.dispatch('tickets/chosenFlightNormal', []); // Initialize at the start in case avoiding the last choice
            this.$store.dispatch('tickets/chosenFlightConnecting', []);

            // Normal uçuş kısmı :
            if (flightInfos && flightInfos.length !== 0) {
                let chosenNormalFlights = [];
                for (const flight of flightInfos) {
                    if (
                        flight.from === this.from.val &&
                        flight.to === this.to.val &&
                        flight.date === this.dateOfDeparture.val &&
                        this.passangerCount <= flight[this.class]
                    ) {
                        chosenNormalFlights.push({                // Bu şekilde yapmayınca index.js'teki flightInfos içeriği değişiyor.
                            passangerCount: this.passangerCount,
                            adultCount: this.adultCount,
                            babyCount: this.babyCount,
                            class: this.class,
                            id: flight.id,
                            name: flight.name,
                            img: flight.img,
                            date: flight.date,
                            from: flight.from,
                            to: flight.to,
                            city_code_from: flight.city_code_from,
                            city_code_to: flight.city_code_to,
                            departureTime: flight.departureTime,
                            arrivalTime: flight.arrivalTime,
                            price: flight.price
                        });
                        // Bilet alındıktan sonra mevcut koltuklar 1'er azaltılacak
                        this.$store.dispatch('tickets/chosenFlightNormal', chosenNormalFlights);

                    }
                }


                // Aktarmalı uçuş kısmı :
                //!!!!!!!! Aktarmalı olan uçuşta aynı güne ait olan uçuşlardan 2.uçuşun saati 1.uçuştan önce ise onu ekleme 
                let chosenConnectingFlights = [];
                if(!this.onlyDirectFlight.val) { 
                const fromObjs = flightInfos.filter(fromValue => {
                    return fromValue.from === this.from.val && fromValue.date === this.dateOfDeparture.val && this.passangerCount <= fromValue[this.class]
                });
                const toObjs = flightInfos.filter(toValue => {
                    return toValue.to === this.to.val && (toValue.date === this.dateOfDeparture.val || parseFloat(toValue.date.substring(0, 4)) === parseFloat(this.dateOfDeparture.val.substring(0, 4)) + 1)
                        && this.passangerCount <= toValue[this.class]
                });

                if (fromObjs && fromObjs.length > 0 && toObjs && toObjs.length > 0) {
                    const matchingFromValues = fromObjs.filter(fromFlight => {
                        return toObjs.some(toFlight => fromFlight.to === toFlight.from)
                    });

                    const matchingToValues = toObjs.filter(toFlight => {
                        return fromObjs.some(fromFlight => toFlight.from === fromFlight.to)
                    });

                    const fromValues = [];
                    const toValues = [];

                    for (let i = 0; i < matchingFromValues.length; i++) {
                        fromValues.push({
                            passangerCount: this.passangerCount,
                            adultCount: this.adultCount,
                            babyCount: this.babyCount,
                            class: this.class,
                            id: matchingFromValues[i].id,
                            name: matchingFromValues[i].name,
                            img: matchingFromValues[i].img,
                            date: matchingFromValues[i].date,
                            from: matchingFromValues[i].from,
                            to: matchingFromValues[i].to,
                            city_code_from: matchingFromValues[i].city_code_from,
                            city_code_to: matchingFromValues[i].city_code_to,
                            departureTime: matchingFromValues[i].departureTime,
                            arrivalTime: matchingFromValues[i].arrivalTime,
                            price: matchingFromValues[i].price,
                        })

                    }

                    for (let i = 0; i < matchingToValues.length; i++) {
                        toValues.push({
                            passangerCount: this.passangerCount,
                            adultCount: this.adultCount,
                            babyCount: this.babyCount,
                            class: this.class,
                            id: matchingToValues[i].id,
                            name: matchingToValues[i].name,
                            img: matchingToValues[i].img,
                            date: matchingToValues[i].date,
                            from: matchingToValues[i].from,
                            to: matchingToValues[i].to,
                            city_code_from: matchingToValues[i].city_code_from,
                            city_code_to: matchingToValues[i].city_code_to,
                            departureTime: matchingToValues[i].departureTime,
                            arrivalTime: matchingToValues[i].arrivalTime,
                            price: matchingToValues[i].price,
                        })
                    }

                    if (fromValues && toValues && fromValues.length > 0 && toValues.length > 0) {
                        chosenConnectingFlights.push(fromValues);
                        chosenConnectingFlights.push(toValues);
                    }
                }
            }

                this.$store.dispatch('tickets/chosenFlightConnecting', chosenConnectingFlights);

                if (chosenConnectingFlights.length === 0 && chosenNormalFlights.length === 0) {
                    console.log('no flight found !!!!!!');
                    return;
                }

                // [[obj1, obj2...] , [obj1,obj2...] ]  şu an böyle

                // Bu arada güncel saati geçen uçuşlar index.js'ten çıkarılacak !!!!!!!!!!!!!!!!!!

                this.$router.push('/listOfPlanes');

            } else {
                console.log(JSON.stringify(flightInfos), 'is empty');  // Convert array to string representation
                return;
            }
            // backtick = altgr(sağdaki) + virgül tuşu
        }
    }
}
</script>


<style scoped> 
.container {
     margin: 0 auto;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 40vh;
 }

 .city-suggestion-list-from {
     width: 22%;
     background: white;
     top: 16rem;
     left: 10rem;
     position: absolute;
 }

 .btn-closer {
     display: flex;
     justify-content: flex-end;
     padding: 0 5px 5px 0;
 }

 .btn-closer button {
     padding: 3px;
     background: #87CEEB;
     border-color: transparent;
     cursor: pointer;
     font-weight: 500;
     margin-top: 5px;
 }

 .input-group {
     display: flex;
     flex-direction: row;
     /* İkinci div'i yan yana getir */
     margin-bottom: 20px;
     flex-wrap: wrap;
 }

 .form-group {
     display: flex;
     flex-direction: column;
     margin: 0 20px;
     width: 15rem;
     /* İkinci form grupları arasındaki boşluk */
 }

 label {
     font-size: 14px;
     cursor: pointer;
     color: #fff;
 }

 input[type=text] {
     padding: 5px;
     border: 1px solid #807b7b;
     border-radius: 4px;
     line-height: 1rem;
     outline: 0;
     color: inherit;
     flex: 1;
     margin-top: 2px;
 }

 input[type=checkbox] {
     margin-right: 5px;
 }

 .one-way-box {
     margin-left: auto;
     /* Checkbox'u en sağa yerleştirir */
 }

 .c-box-section {
     display: flex;
 }

 .find-ticket-btn {
     flex: 1;
     background-color: rgb(187, 22, 91);
     color: #fff;
     font-size: 15px;
     cursor: pointer;
     border-color: transparent;
     border-radius: 5px;
 }

 .find-ticket-btn:hover,
 active {
     background: #2dc44d;
 }

 .passanger-counts {
     padding: 8px 0;
     background: #fff;
     font-size: 13px;
     color: rgb(56, 56, 56);
     cursor: pointer;
     border-color: #e2e2e2;
     border-radius: 5px;
     margin-top: 5px;
 }
</style>



