<template>
  <div class="sky-background">
    <div class="background-container">
      <div class="content">
          <ul>
            <li @click="setActive('planeTicketClicked')" :class="{active: planeTicketClicked}">Plane Ticket</li>
            <li @click="setActive('multiFlightClicked')" :class="{active: multiFlightClicked}">Multi Flight</li>
            <li @click="setActive('checkInClicked')"     :class="{active: checkInClicked}">Check-in</li>
            <li @click="setActive('pnrClicked')"         :class="{active: pnrClicked}">PNR Inquiry</li>
            <li @click="setActive('cancelClicked')"      :class="{active: cancelClicked}">Ticket Cancellation</li>
          </ul>
        <hr>
        <plane-items v-if="planeTicketClicked"></plane-items>
        <multi-items v-else-if="multiFlightClicked"></multi-items>
        <pnr-items v-else-if="pnrClicked"></pnr-items>
        <cancel-items v-else-if="cancelClicked"></cancel-items>
        <checkin-items v-else-if="checkInClicked"></checkin-items> 
      </div>
    </div>
  </div>
</template>

<script>
import PlaneItems from '../../components/tickets/ticketItems/PlaneItems.vue'
import MultiItems from '../../components/tickets/ticketItems/MultiItems.vue'
import PnrItems from '../../components/tickets/ticketItems/PnrItems.vue'
import CancelItems from '../../components/tickets/ticketItems/CancelItems.vue'
import CheckinItems from '../../components/tickets/ticketItems/CheckinItems.vue'


export default {
  components: {
    PlaneItems,
    MultiItems,
    PnrItems,
    CancelItems,
    CheckinItems
  },
  data() {
    return {
      planeTicketClicked: true,
      multiFlightClicked: false,
      pnrClicked: false,
      cancelClicked: false,
      checkInClicked: false
    }
  },
  methods: {
    setActive(activeItem) {
      // Tüm clicked değerlerini false yap
      this.planeTicketClicked = false;
      this.multiFlightClicked = false;
      this.pnrClicked = false;
      this.cancelClicked = false;
      this.checkInClicked = false;

      // Tıklanan öğenin clicked değerini true yap
      this[activeItem] = true;
    }
  }
}
</script>


<style scoped>            /* Yakınlaştırıp uzaklaştırınca veya ekranı küçültünce her şey bozuluyo, düzelt */
 .sky-background {
   background: linear-gradient(to top, #a5d6eb, #fff);
   height: 100vh;
 }

 .background-container {
   background-image: url(@/assets/plane.png);
   background-repeat: no-repeat;
   background-position-x: right;
 }

 .content {
   width: 45%;
   height: 100%;
   background-color: rgb(45, 100, 138);
   background: linear-gradient(to bottom, #1980a8, #0596f7);
   opacity: 0.8; 
   border-radius: 6px;
   min-width: 35rem;
 }

 ul {
   list-style: none;
   display: flex;
   justify-content: space-between;
   margin: 8px;
   padding: 0;
 }

 ul li {
   margin-left: 20px;
   color: #e0dfdf;
   cursor: pointer;
   font-size: 15px;
 }

 ul li:nth-child(1) {
   margin-left: 0;
 }

 ul li.active {
  color: white; 
  border-bottom: solid 1px white;
}

 ul li:hover {
   color: #fff;
   font-weight: bolder;
 }



</style>