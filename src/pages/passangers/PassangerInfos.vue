<template>
    <div class="body">
        <div class="body-content">
            <div class="progress-stage"></div>
            <div class="title" v-if="selectedFlight.from">
                <strong>
                    <span>{{ selectedFlight.from }}</span>
                    <span> --> </span>
                    <span>{{ selectedFlight.to }}</span>
                </strong>
            </div>
            <div class="title" v-else-if="selectedFlight.from1">
                <strong>
                    <span>{{ selectedFlight.from1 }}</span>
                    <span> --> </span>
                    <span>{{ selectedFlight.to2 }}</span>
                </strong>
            </div>
            <div class="container">              <!--Form is here !!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                <div class="container-left">
                    <form @submit.prevent="submitForm">
                        <div class="communication-infos">
                            <div class="communication-infos-title">
                                <span><font-awesome-icon icon="fa-address-card" /></span>
                                <span>Communication Infos</span>
                            </div>
                            <div class="communication-infos-context">
                                <div class="context">
                                    <div class="e-mail input-title">E-mail Adress</div>
                                    <input type="e-mail" class="e-mail" id="e-mail" placeholder="Enter e-mail adress" 
                                       v-model.trim="eMail.val"
                                       @blur="clearValidity('eMail')">
                                    <p v-if="!eMail.isValid" class="invalid">Please fill the empty field</p>
                                    
                                </div>
                                <div class="context">
                                    <div class="phone-number input-title">Phone Number</div>
                                    <input type="tel" class="phone-number" id="phone-number" placeholder="Enter phone number" 
                                       v-model.trim="phoneNo.val"
                                       @blur="clearValidity('phoneNo')">
                                    <p v-if="!phoneNo.isValid" class="invalid">Please fill the empty field</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="identity-infos">
                          <ul>
                            <identity-items 
                            :passengers="passengers"
                            :from="from"
                            :to="to"
                            :planeImg="img"
                            :submit-click="submitClick"
                            ></identity-items>
                          </ul>
                        </div>
                        <div class="baggage-limit">
                             <div class="baggage-header">
                                <div class="baggage-increase">
                                  <span><font-awesome-icon icon="fa-briefcase" /></span>
                                  <span><h4>Increase baggage limit</h4></span>
                                </div>
                                <p>Do not pay high amount to your baggage in airport. Increase your baggage allowance now with a price advantage of up to 50%. </p>
                             </div>
                             <div class="baggage-list">
                                <ul>
                                 <baggage-items
                                 @extraFacilities="updatePriceAndWeight"
                                 :passengers="passengers"
                                 :planeImg="img"
                                 ></baggage-items>
                                </ul> 
                             </div>
                        </div>
                        <div class="continue">
                          <div class="total-amount">
                             <label>Total Amount</label>
                             <div><strong>{{ price }} TL</strong></div>
                          </div>  
                          <button type="submit" class="continue-btn">Continue</button>
                        </div>  
                    </form>
                </div>
                <div class="container-right">
                    <summary-norm v-if="selectedFlight.name"
                    :from="selectedFlight.from"
                    :to="selectedFlight.to"
                    :planeImg="selectedFlight.img"
                    :planeName="selectedFlight.name"
                    :departureTime="selectedFlight.departureTime"
                    :arrivalTime="selectedFlight.arrivalTime"
                    :classType="selectedFlight.class"
                    :date="selectedFlight.date"
                    :midnightDateIncrease="midnightDateIncrease"
                    ></summary-norm>

                    <summary-merged v-else-if="selectedFlight.name1"
                    :from1="selectedFlight.from1"
                    :from2="selectedFlight.from2"
                    :to1="selectedFlight.to1"
                    :to2="selectedFlight.to2"
                    :planeImg1="selectedFlight.img1"
                    :planeImg2="selectedFlight.img2"
                    :planeName1="selectedFlight.name1"
                    :planeName2="selectedFlight.name2"
                    :departureTime1="selectedFlight.departureTime1"
                    :departureTime2="selectedFlight.departureTime2"
                    :arrivalTime1="selectedFlight.arrivalTime1"
                    :arrivalTime2="selectedFlight.arrivalTime2"
                    :classType1="selectedFlight.class1"
                    :classType2="selectedFlight.class2"
                    :date1="selectedFlight.date1"
                    :date2="selectedFlight.date2"
                    :midnightDateIncrease="midnightDateIncrease"
                    ></summary-merged>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import IdentityItems from './passangerAuxiliaryComponents/IdentityItems.vue';
import BaggageItems from './passangerAuxiliaryComponents/BaggageItems.vue';
import SummaryNorm from './passangerAuxiliaryComponents/SummaryNorm.vue';
import SummaryMerged from './passangerAuxiliaryComponents/SummaryMerged.vue';

export default {
    components: {
        IdentityItems,
        BaggageItems,
        SummaryNorm,
        SummaryMerged
    },
    props: ['id'],
    data() {
        return {
            selectedFlight: null,   
            adultNum: 0,
            babyNum: 0,
            img: null,
            from: '',
            to:'',
            passengers: [],
            price: 0,
            previousExtraPrice: 0,
            submitClick: false,
            eMail: {
                val: '',
                isValid: true
            },
            phoneNo: {
                val: '',
                isValid: true
            },
            formIsValid: true
        }
    },
    created() {
        const normalFlight = this.$store.getters['tickets/chosenFlightNormal'].find(flight => flight.id === parseInt(this.id));
        const mergedFlight = this.$store.getters['tickets/mergedChosenConnecting'].find(flight => flight.selectedFlightId === parseInt(this.id));
        console.log(normalFlight)
        console.log(mergedFlight)
        if (normalFlight && !mergedFlight) {
            this.selectedFlight = normalFlight;
            this.img = normalFlight.img;
            this.from = normalFlight.from;
            this.to = normalFlight.to;
            this.price = normalFlight.price;
            this.adultNum = normalFlight.adultCount;
            this.babyNum = normalFlight.babyCount;
        } else if (!normalFlight && mergedFlight) {
            this.selectedFlight = mergedFlight;
            this.img = mergedFlight.img1;
            this.from = mergedFlight.from1;
            this.to = mergedFlight.to2;
            this.price = mergedFlight.price1 + mergedFlight.price2;
            this.adultNum = mergedFlight.adultCount;
            this.babyNum = mergedFlight.babyCount;
        } else {
            this.selectedFlight = {};
        }

        while (this.adultNum > 0 || this.babyNum > 0) {
           let index=0;
        if (this.adultNum > 0) {
          this.passengers.push({passengerType: 'Adult', passengerIndex: index, passengerWeight: 0, passengerPrice: 0});
          this.adultNum--;
        } else if (this.babyNum > 0) {
          this.passengers.push({passengerType: 'Baby', passengerIndex: index, passengerWeight: 0, passengerPrice: 0});
          this.babyNum--;
        }
            index++;
      }

    },
    methods: {
        submitForm() {
            this.submitClick = true;
            this.validateForm();
            if (!this.formIsValid) {
                return;
            }
        },
        clearValidity(input) {
            this[input].isValid = true;
        },
        validateForm() {
            this.formIsValid = true;
            if (this.eMail.val === '') {
                this.eMail.isValid = false;
                this.formIsValid = false;
            }
            if (this.phoneNo.val === '') {
                this.phoneNo.isValid = false;
                this.formIsValid = false;
            }
        },
        updatePriceAndWeight(data){     
              this.passengers[data.selectedIndex].passengerPrice = data.extraPrice;
              const totalExtraPrice = this.passengers.reduce((totalPrice, passenger) => totalPrice + passenger.passengerPrice, 0);
              this.price += totalExtraPrice - this.previousExtraPrice;
              this.previousExtraPrice = totalExtraPrice;
              this.passengers[data.selectedIndex].passengerWeight = data.extraWeight;
        },
        midnightDateIncrease(newDate, arrivalTime, departureTime) { // Ay değişim muhabbeti(ayın 31'ine 1 ekle 32 oluyor) burada da var. Düzelt !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
               const arrivalInt = Math.floor(parseFloat(arrivalTime));   // Ayrıca bu method'u başka bi yerden çağırmam lazımdı, bak !!!!
               const departureInt = Math.floor(parseFloat(departureTime));
               if (departureInt > arrivalInt) {
                    const dateArray = newDate.split('.');
                    dateArray.splice(0, 1, (parseFloat(dateArray[0]) + 1));
                    newDate = dateArray.join('.');
               }
               return newDate;
          }
    }
}

</script>

<style scoped>
.body {
    display: flex;
    justify-content: center;
    align-items: center;
}

.body-content {
    width: 70%;
    margin-top: 20px;
}

.title {
    color: #53605e;
    font-size: 32px;
}

.container {
    display: flex;
}

.container-left {
    width: 100%;
}

.container-right {
    width: 50%;
    margin-left: 20px;
}

.communication-infos {
    border: 1px solid #999;
    border-radius: 5px;
    margin: 10px 0 30px;
    font-size: 18px;
    padding: 10px;
}
.communication-infos-title {
    font-weight: 700;
    color: #53605e !important;
}

.communication-infos-title span:nth-child(1) {
   margin-right: 7px;
   color: #1E90FF;
}

.baggage-increase {
    display: flex;
    align-items: center;
}

.baggage-increase span:nth-child(1) {
    font-size: 25px;
    margin-right: 10px;
}

.communication-infos-context {
    width: 100%;
    display: flex;
    margin: 10px 0 35px;
}

.communication-infos-context .context {
    width: 100%;
    height: 45px;
}

.communication-infos-context .input-title {
    font-size: 14px;
    margin: 0 0 3px 3px
}

.context input {
    width: 90%;
    outline: none;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #999;
    padding: 5px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input::placeholder {
  font-size: 12px; 
  color: #9ba5a3;
}

ul {
    list-style: none;
}

.baggage-limit {
    border: 1px solid #999;
    border-radius: 5px;
    margin: 10px 0 30px;
    background-color: #f7fcff;
    font-size: 15px;
    padding: 10px 15px;
    min-width: fit-content;
}

.baggage-header h4 {
    font-size: 17px;
    color: #3a4341;
}

.baggage-header p {
    color: #585d5f;
    font-size: 14px;
    margin: 8px 0;
}

.continue {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
}

.continue-btn {
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

.continue-btn:hover {
     background: #0aa12b;
}

.total-amount {
    margin-right: 10px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    
}
.total-amount label {
    color: #53605e
}

.invalid {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  }

</style>