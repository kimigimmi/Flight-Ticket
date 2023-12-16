<template>
  <div class="priceGraph">
    <div class="line-1">
      <div class="line"></div>
      <span>Top Price</span>
    </div>
    <div class="line-1">
      <div class="line"></div>
      <span>Half Price</span>
    </div>
    <div class="line-1">
      <div class="line"></div>
      <span>Bottom Price</span>
    </div>

    <div class="priceGraphDates">
      <div v-for="day in 11" :key="day">
        <!--Buradaki 157 calendar'daki length'in sayısı olarak düzelt.Eski günler hariç -->
        <span>{{ getDay(todaysDay + day - 1) }}</span>
        <span>{{ getDayName(currentMonthIndex, getDay(todaysDay + day - 1), currentYear) }}</span>
      </div>
    </div>

    <div class="line-1">
      <span class="line firstLine"></span>
      <span>{{ currentMonth }}</span>
      <span class="line lastLine"></span>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      todaysDay: null,
      currentMonthIndex: null,
      previousMonthIndex: null,
      previousMonthName: '',
      previousYear: this.currentYear - 1,
      currentYear: null,
      currentMonth: '',
      calendar: this.$store.getters['calendar/getCalendar']
    };
  },
  created() {
    const today = new Date();
    this.todaysDay = today.getDate();
    this.currentYear = today.getFullYear();
    this.currentMonthIndex = today.getMonth();
    
    this.previousMonthIndex = this.currentMonthIndex - 1;
    if(this.previousMonthIndex < 0) {
       this.previousMonthIndex = 11;
    }

    // currentMonth hesaplanan özelliğini burada güncelliyoruz
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.previousMonthName = monthNames[this.previousMonthIndex];
    this.currentMonth = monthNames[this.currentMonthIndex] || 'invalid';
  },

  methods: {
    getDay(dayNumber) {
      const monthWanted = this.calendar.find(monthWanted => {
        return monthWanted.year === this.currentYear && monthWanted.month === this.currentMonth;
      });
      const previousMonthObj = this.calendar.find(prvs => {
        if(this.previousMonthName === 'December') {
           return prvs.year === this.previousYear && prvs.month === this.previousMonthName;
        } else {
           return prvs.year === this.currentYear && prvs.month === this.previousMonthName;
        }
      })

     
      if(previousMonthObj.numberOfDays === 31) {
        const resultingDayNumber = dayNumber % 31;
        if (resultingDayNumber === 1) {
          this.currentMonthIndex = (this.currentMonthIndex + 1) % 12;
          console.log(this.currentMonthIndex)
          return resultingDayNumber;
        }
      }

      if (monthWanted.numberOfDays === 31) {
        const resultingDayNumber = dayNumber % 31;
      
        if (dayNumber <= 31 || dayNumber % 31 === 0) {
          return resultingDayNumber !== 0 ? dayNumber : 31;


        } else if (dayNumber > 31 && dayNumber % 31 !== 0) {
          return resultingDayNumber
        }
      }




      else if (monthWanted.numberOfDays === 30) {
        if (dayNumber <= 30 || dayNumber % 30 === 0) {
          return dayNumber % 30 !== 0 ? dayNumber : 30;
        } else if (dayNumber > 30 && dayNumber % 30 !== 0)
          return dayNumber % 30;
      }
      else if (monthWanted.numberOfDays === 28) {
        if (dayNumber <= 28 || dayNumber % 28 === 0) {
          return dayNumber % 28 !== 0 ? dayNumber : 28;
        } else if (dayNumber > 28 && dayNumber % 28 !== 0)
          return dayNumber % 28;
      }
    },
    getDayName(monthIndex, day, year) {
      const date = new Date(year, monthIndex, day + 1);
      // console.log(date);
      return date.toString().split(' ')[0];
    }


  }
};
</script>
  
<style scoped>
.priceGraph {
  padding: 10px;
  border: 1px solid #000;
  background: rgb(235, 235, 235);
}

.line {
  border: 0.1px solid #c4c4c4;
  width: 90%;
}

.line-1 {
  display: flex;
  align-items: center;
  margin: 2rem 0;
}

span {
  font-size: 12px;
  margin-left: 10px;
}

.lastLine {
  margin-right: 7rem;
}

.firstLine {
  margin-left: 0;
}

.priceGraphDates {
  display: flex;
  margin: 0 2rem;
}

.priceGraphDates div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 25px;
}
</style>
  