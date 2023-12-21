<template>
    <li v-for="(passenger, index) in passengers" :key="index">
        <div class="baggage-list-items">
            <div class="baggage-list-items-title">{{ passenger.passengerType }} </div>
                <div class="img-and-limit">
                    <div class="img-part">
                        <img :src="planeImg">
                        <p>Going</p>
                    </div>
                    <div class="baggage-part">
                    <span>Baggage allowance:</span>
                    <span>1x{{ 15 + passenger.passengerWeight }}kg</span>
                    </div>
                </div>
            <div class="select-option">           <!--Give some css here !!!!!!!!!!!!!!!!!!!!!!!-->
                <select @change="updateResults($event, index)">
                    <option data-weight=0 data-price=0>No extra baggage</option>
                    <option data-weight=5 data-price=250>+5 kg - 250 lira</option>
                    <option data-weight=10 data-price=600>+10 kg - 600 lira</option>
                    <option data-weight=15 data-price=950>+15 kg - 950 lira</option>
                    <option data-weight=25 data-price=1650>+25 kg - 1650 lira</option>
                    <option data-weight=35 data-price=2350>+35 kg - 2350 lira</option>
                </select>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: ['passengers','planeImg'],
    emits: ['extraFacilities'],
    data() {
        return {
            selectedPrice: 0,
            selectedWeight: 0
        }
    },
    methods: {
        updateResults(event, passengerIndex) {
            const selectedOption = event.target.options[event.target.selectedIndex];
            this.selectedPrice = parseInt(selectedOption.getAttribute('data-price'));
            this.selectedWeight = parseInt(selectedOption.getAttribute('data-weight'));
            this.$emit('extraFacilities', {'selectedIndex': passengerIndex, 'extraPrice': this.selectedPrice, 'extraWeight': this.selectedWeight});
        }
    }
}
</script>

<style scoped>
.baggage-list-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid gray;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
}

.baggage-list-items-title {
    font-size: 16px;
    font-weight: 700;
    color: #585d5f;
    white-space: nowrap;
    min-width: 50px;
}

.baggage-part {
    display: flex;
    align-items: center;
    min-width: 10%;
}

.baggage-part span {
    font-size: 12px;
    color: #585d5f;
}

.img-part {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 3px;
    min-width: 10%;
}
.img-part img {
    width: 20px;
}

.img-part p {
    font-size: 14px;
    color: #585d5f;
}

.select-option select {
    width: 150px; 
    height: 40px; 
    font-size: 16px; 
    text-align: left;
    border-radius: 4px;
    cursor: pointer;
    min-width: 10%;
}

.select-option select {
    width: 150px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}

</style>