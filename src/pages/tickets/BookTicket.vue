<template>
  <div class="sky-background">
    <div class="background-container">
      <div class="content">
        <ul>
          <li @click="setActive('planeTicketClicked')" :class="{ active: planeTicketClicked }">Plane Ticket</li>
          <li @click="setActive('checkInClicked')" :class="{ active: checkInClicked }">Check-in</li>
          <li @click="setActive('pnrClicked')" :class="{ active: pnrClicked }">PNR Inquiry</li>
          <li @click="setActive('cancelClicked')" :class="{ active: cancelClicked }">Ticket Cancellation</li>
        </ul>
        <hr>
        <div class="items">
          <plane-items v-if="planeTicketClicked"></plane-items>
          <pnr-items v-else-if="pnrClicked"></pnr-items>
          <cancel-items v-else-if="cancelClicked"></cancel-items>
          <checkin-items v-else-if="checkInClicked"></checkin-items>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaneItems from '../../components/tickets/ticketItems/PlaneItems.vue'
import PnrItems from '../../components/tickets/ticketItems/PnrItems.vue'
import CancelItems from '../../components/tickets/ticketItems/CancelItems.vue'
import CheckinItems from '../../components/tickets/ticketItems/CheckinItems.vue'


export default {
  components: {
    PlaneItems,
    PnrItems,
    CancelItems,
    CheckinItems
  },
  data() {
    return {
      planeTicketClicked: true,
      pnrClicked: false,
      cancelClicked: false,
      checkInClicked: false
    }
  },
  methods: {
    setActive(activeItem) {
      // Tüm clicked değerlerini false yap
      this.planeTicketClicked = false;
      this.pnrClicked = false;
      this.cancelClicked = false;
      this.checkInClicked = false;
      // Tıklanan öğenin clicked değerini true yap
      this[activeItem] = true;
    }
  }
}
</script>


<style scoped>          
 .sky-background {       /* Bir kod bloğunu sola kaydırmak için : shift + tab,  sağa kaydırmak için: tab */ 
    background: linear-gradient(to top, #a5d6eb, #ffffff);
    height: 100vh;
  }

  .background-container {
    background-image: url(@/assets/plane.png);
    background-repeat: no-repeat;
    background-position-x: right;
  }

  .content {
    width: 45%;
    background-color: rgb(45, 100, 138);
    background: linear-gradient(to bottom, #1980a8, #0596f7);
    opacity: 0.8;
    border-radius: 6px;
    margin: 30px;
    overflow: auto;
    /* Avoids component items overflowing from content div */
  }


@media (max-width:500px) {
  .content ul li {
      font-size: 5px;
   }
}

@media (min-width:500px) {
  .content ul li {
      font-size: 7px;
   }
}

@media (min-width:650px) {
  .content ul li {
      font-size: 9px;
   }
}

@media (min-width:800px) {
  .content ul li {
      font-size: 11px;
   }
}

@media (min-width:950px) {
  .content ul li {
      font-size: 13px;
   }
}

@media (min-width:1100px) {
   .content ul li {
      font-size: 15px;
   }
}

  .content ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 8px;
    padding: 2px;
  }

  .content ul li {
    margin-left: 20px;
    color: #e0dfdf;
    cursor: pointer;
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