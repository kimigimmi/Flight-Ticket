<template>
    <div class="flight-summary">
        <header>
            <span class="title">Outward Flight</span>
        </header>
        <div class="plane-name">
            <img :src="planeImg">
            <span>{{ planeName }}</span>
        </div>
        <div class="flight-infos">
            <div class="departure-arrival-infos">
                <header>
                    <span class="title">Departure</span>
                    <div class="flight-contents">
                        <span class="dprT-arrT">{{ departureTime }}</span>
                        <span class="flight-date-and-city">{{ formatDate((date)) }}</span>
                        <div class="flight-date-and-city">{{ from }}</div>
                    </div>
                </header>
            </div>
            <div class="departure-arrival-infos">
                <header>
                    <span class="title">Arrival</span>
                    <div class="flight-contents">
                        <span class="dprT-arrT arrT">{{ arrivalTime }}</span>
                        <span class="flight-date-and-city">{{ formatDate(midnightDateIncrease(date, arrivalTime, departureTime)) }}</span>
                        <div class="flight-date-and-city">{{ to }}</div>
                    </div>
                </header>
            </div>
            <div class="flight-class plane-name">Flight class - {{ classType }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['from', 'to', 'planeImg', 'planeName', 'departureTime', 'arrivalTime', 'classType', 'date', 'midnightDateIncrease'],
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
.flight-summary {
    border: 1px solid #999;
    border-radius: 5px;
    margin: 10px 0 30px;
    font-size: 18px;
    padding: 10px;
}   

header .title {
    font-weight: 700;
    font-size: 16px;
    color: #394240 !important;
}

.plane-name {
    display: flex;
    align-items: center;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #53605e;
    margin: 20px 0 0;
}

.plane-name img {
    width: 20px;
    margin-right: 5px;
}

.dprT-arrT {
    background-color: #2dc44d;
    padding: 1px 7px;
    border-radius: 2px;
    color: #fff;
    margin-right: 0.5rem;
    font-size: 14px;
}

.arrT {
    background-color: #f58787;
}

.flight-date-and-city {
    font-family: "Open Sans",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #53605e;
}

.departure-arrival-infos {
    margin-top: 5px;
}

.flight-class {
    margin: 0 0 20px;
}
</style>