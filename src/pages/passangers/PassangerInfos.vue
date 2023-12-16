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
                    <span>{{ selectedFlight.to1 }}</span>
                </strong>
            </div>
            <div class="container">
                <div class="container-left">
                    <form @submit.prevent="submitForm">
                        <div class="communication-infos">
                            <div class="communication-infos-title">Communication Informations</div>
                            <div class="communication-infos-context">
                                <div class="context">
                                    <div class="e-mail input-title">E-mail Adress</div>
                                    <input type="e-mail" class="e-mail" id="e-mail" placeholder="Enter e-mail adress">
                                </div>
                                <div class="context">
                                    <div class="phone-number input-title">Phone Number</div>
                                    <input type="tel" class="phone-number" id="phone-number" placeholder="Enter phone number">
                                </div>
                            </div>
                        </div>
                        <div class="identity-infos">
                          <ul>
                            <identity-items 
                            :adultCount="selectedFlight.adultCount" 
                            :babyCount="selectedFlight.babyCount"
                            :planeImg="img"       
                            :from="from"
                            :to="to"
                            ></identity-items>
                          </ul>
                        </div>
                        <div class="baggage-limit">
                             <div class="baggage-header">
                                <h4>Increase baggage limit</h4>
                                <p>Do not pay high amount to your baggage in airport. Increase your baggage allowance now with a price advantage of up to 50%. </p>
                             </div>
                             <div class="baggage-list">
                                <ul>
                                 <baggage-items
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
                          <button type="submit" class="continue-btn">Continue></button>
                        </div>  
                    </form>
                </div>
                <div class="container-right">
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import IdentityItems from './passangerAuxiliaryComponents/IdentityItems.vue';
import BaggageItems from './passangerAuxiliaryComponents/BaggageItems.vue';

export default {
    components: {
        IdentityItems,
        BaggageItems
    },
    props: ['id'],
    data() {
        return {
            selectedFlight: null,   // Sağdaki div'de eğer name varsa normal, name1 varsa merged olan bilgileri yazsın 
            img: null,
            from: '',
            to: '',
            price: 0
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
        } else if (!normalFlight && mergedFlight) {
            this.selectedFlight = mergedFlight;
            this.img = mergedFlight.img2;
            this.from = mergedFlight.from1;
            this.to = mergedFlight.to2;
            this.price = mergedFlight.price1 + mergedFlight.price2;
        } else {
            this.selectedFlight = {};
        }
    },
    methods: {
        SubmitForm() {

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
    background: green;
    width: 50%;
    height: 40px;
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
    font-size: 15px;
    padding: 10px 15px;
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
</style>