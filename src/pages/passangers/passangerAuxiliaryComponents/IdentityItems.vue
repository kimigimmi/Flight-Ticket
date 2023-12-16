<template>
        <li v-for="(passenger, index) in passengers" :key="index">
          <div class="communication-infos">
            <div class="communication-infos-title">{{ passenger }}</div>
            <div class="communication-infos-context">
              <div class="context">
                <div class="input-title">Name</div>
                <input type="text" placeholder="Enter first name">
              </div>
              <div class="context">
                <div class="phone-number input-title">Surname</div>
                <input type="tel" placeholder="Enter surname">
              </div>
            </div>
            <div class="communication-infos-context">
              <div class="context">
                <div class="input-title">Birth Date</div>
                <input type="date" class="birth-date" placeholder="Enter birth date">
              </div>
              <div class="context">
                <div class="phone-number input-title">Identity No</div>
                <input type="number" placeholder="Enter identity no">
              </div>
            </div>
            <div class="gender-info-context">
              <div class="gender-input-title">Gender</div>
              <div class="gender-option">
                <div class="gender">
                  <input checked="" name="gender" :id="'check-male-' + index" type="radio">
                  <label :for="'check-male-' + index">Male</label>
                </div>
                <div class="gender">
                  <input checked="" name="gender" :id="'check-female-' + index" type="radio">
                  <label :for="'check-female-' + index">Female</label>
                </div>
              </div>
            </div>

            <div class="baggage-allowance">
              <label>Baggage Allowance:</label>
              <div>
                <img :src="planeImg">
                <span>Going ({{ from }}-{{ to }}) 1x15 kg check-in baggage</span>
              </div>
            </div>
          </div>
        </li>
  </template>
  
  <script>
  export default {
    props: ['adultCount', 'babyCount', 'planeImg', 'from', 'to'],
    data() {
      return {
        adultNum: this.adultCount,
        babyNum: this.babyCount,
        passengers: []
      };
    },
    created() {
      while (this.adultNum > 0 || this.babyNum > 0) {
        if (this.adultNum > 0) {
          this.passengers.push('Adult');
          this.adultNum--;
        } else if (this.babyNum > 0) {
          this.passengers.push('Baby');
          this.babyNum--;
        }
      }
    }
  };
  </script>
  
<style scoped>
.communication-infos {
    border: 1px solid #999;
    margin: 10px 0 30px;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
}

.communication-infos-title {
    font-weight: 700;
    color: #394240 !important;
}

.communication-infos-context {
    width: 100%;
    display: flex;
    margin: 20px 0;
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
.baggage-allowance label{
    font-size: 14px;
    color: #000;
}

.baggage-allowance div {
   display: flex;
   align-items: center;
   margin-top: 5px;
}

.baggage-allowance div span {
  font-size: 12px;
  color: #484848;
}
.baggage-allowance img {
   width: 20px;
   margin-right: 5px;
}

</style>