<template>   <!--<select><options>.........</select>  falan yap -->  
   <div class="each-list">
      <ul>
         <li @click="selectItem(item)" >{{ item }}</li>
      </ul>
   </div>
</template>

<script>
export default {
   props: ['item', 'whichClicked'],
   emits: ['selectedItem'],
   data() {
      return {

      }
   },
   methods: {
      selectItem(item) {
         this.$emit('selectedItem', item);
         if(this.whichClicked === ''){
            return;
         }
         else if(this.whichClicked==='from'){
            this.$store.dispatch('tickets/setPlaneTicketFrom', item);
         }else if(this.whichClicked==='to'){
            this.$store.dispatch('tickets/setPlaneTicketTo', item);
         }
         
      }
   }
}

</script>

<style scoped>
li {
   color: black;
}

li:hover {
   color: rgb(0, 0, 0);
}

.each-list {
   padding: 5px 0;
   cursor: pointer;
}

.each-list:hover {
   background-color: rgb(221, 221, 221);
}
</style>


