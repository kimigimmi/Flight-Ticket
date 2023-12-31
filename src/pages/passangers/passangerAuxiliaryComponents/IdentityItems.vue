<template>
  <li v-for="(passenger, index) in passengers" :key="index">
    <div class="communication-infos">
      <div class="communication-infos-title">
            <span><font-awesome-icon icon="fa-user" /></span>
            <span>{{ passenger.passengerType }}</span>
      </div>
      <div class="communication-infos-context">
        <div class="context">
          <div class="input-title">Name</div>
          <input type="text" placeholder="Enter first name" v-model.trim="passengerData[index].name">
          <p v-if="submitClick && passengerData[index].name === ''" class="invalid">Please fill the empty field</p>
        </div>
        <div class="context">
          <div class="phone-number input-title">Surname</div>
          <input type="tel" placeholder="Enter surname" v-model.trim="passengerData[index].surname">
          <p v-if="submitClick && passengerData[index].surname === ''" class="invalid">Please fill the empty field</p>
        </div>
      </div>
      <div class="communication-infos-context">
        <div class="context">
          <div class="input-title">Birth Date</div>
          <input type="date" class="birth-date" placeholder="Enter birth date" v-model.trim="passengerData[index].birthDate" min="1900-01-01" :max=currentDate>
          <p v-if="submitClick && passengerData[index].birthDate === ''" class="invalid">Please fill the empty field</p>
        </div>
        <div class="context">
          <div class="phone-number input-title">Identity No</div>
          <input type="number" placeholder="Enter identity no" v-model.trim="passengerData[index].identityNo">
          <p v-if="submitClick && passengerData[index].identityNo === ''" class="invalid">Please fill the empty field</p>
        </div>
      </div>
      <div class="gender-info-context">
        <div class="gender-input-title">Gender</div>
        <div class="gender-option">
          <div class="gender">
            <input :name="'gender' + index" :id="'check-male-' + index" type="radio" value="male" v-model.trim="passengerData[index].gender">
            <label :for="'check-male-' + index">Male</label>
          </div>
          <div class="gender">
            <input :name="'gender' + index" :id="'check-female-' + index" type="radio" value="female" v-model.trim="passengerData[index].gender">
            <label :for="'check-female-' + index">Female</label>
          </div>
        </div>
        <p v-if="submitClick && passengerData[index].gender === ''" class="invalid">Please fill the empty field</p>
      </div>


      <div class="baggage-allowance">
        <label>Baggage Allowance:</label>
        <div class="baggage-allowance-properties">
          <span><img :src="planeImg"></span>
          <span>Going ({{ from }}-{{ to }}) </span> 
          <span><font-awesome-icon icon="fa-briefcase" /></span>
          <span>1x15 kg check-in baggage</span>
        </div>
      </div>
    </div>
  </li>
</template>
  
<script>
export default {
  props: ['passengers', 'planeImg', 'from', 'to', 'submitClick'],
  data() {
    return {
      passengerData: []
    };
  },
  beforeMount() {
    this.passengerData = this.passengers.map(() => ({          // map doesn't change the original array. Therefore we can use it here.
      name: '',
      surname: '',
      birthDate: '',
      identityNo: '',
      gender: ''
    }));
  },
  mounted() {  // After the compononent was mounted, the data is ready to tie up by v-model.trim
    console.log(this.passengerData)
    console.log(this.passengers)
    console.log(this.submitClick) // BirthDate bugünkü tarihten küçük olmalı !!!!!!!!!!!!!!!!
  },
  computed: {
     currentDate(){
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
     }
  },
  watch: {
    passengerData: {
      deep: true,
      handler(oldValue, newValue) {
        console.log('Old Value:', oldValue);
        console.log('New Value:', newValue);
        console.log(this.submitClick)
      },
    },
  }


};
</script>
  
<style scoped>
.fa-phone-volume {
  color: green;
}
.communication-infos {
  border: 1px solid #999;
  margin: 10px 0 30px;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
}

.communication-infos-title {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #394240 !important;
}

.communication-infos-title span:nth-child(1) {
   margin-right: 7px;
   color: #1E90FF;
   font-size: 15px;
}

.communication-infos-context {
  width: 100%;
  display: flex;
  margin: 35px 0;
}

.communication-infos-context .context {
  width: 100%;
  height: 45px;
}

.communication-infos-context .input-title {
  font-size: 14px;
  margin: 0 0 3px 3px
}

.birth-date {
  cursor: pointer;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  font-size: 18px;
  cursor: pointer;
}

.context input {
  width: 90%;
  outline: none;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #999;
  padding: 5px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.gender-info-context {
  margin-top: 25px;
}

.gender-option {
  display: flex;
  gap: 20px;
  margin-top: 5px;
}

.gender-input-title {
  font-size: 15px;
}

.gender-option .gender {
  display: flex;
  align-items: center;
  gap: 7px;
}

.gender-option .gender label {
  color: #000;
  font-size: 13px;
}

input[type='radio'] {
  transform: scale(1.2);
  /* Enlarge the size of radio input scale */
}

input::placeholder {
  font-size: 12px;
  color: #9ba5a3;
}

.baggage-allowance {
  margin-top: 20px;
}

.baggage-allowance label {
  font-size: 14px;
  color: #000;
}

.baggage-allowance div {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.baggage-allowance-properties span {
   margin-right: 10px;
   font-size: 12px;
   color: #484848;
}

.baggage-allowance-properties img {
   width: 20px;
}

.invalid {
  color: red;
  font-size: 12px;
  margin-top: 5px;
 /* border-color: red !important;   Sometimes, other styles might be overriding our styles(here in context input class). Using the !important rule can help ensure that our styles take precedence:*/
}

</style>