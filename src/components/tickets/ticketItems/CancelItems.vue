<template>
    <form>
        <div class="container">
            <div class="input-group">
                <div class="form-group">
                    <label for="pnr">PNR Code</label>
                    <input type="text" id="pnr" />
                </div>
                <div class="form-group">
                    <label for="surname">Passanger Surname</label>
                    <input type="text" id="surname" />
                </div>
            </div>
            <button>PNR Enquiry</button>
        </div>
    </form>
</template>

<script>

</script>

<style scoped>
.container {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 30vh;
      padding: 0;
  }

  .input-group {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      flex-wrap: wrap;
  }

  .form-group {
      display: flex;
      flex-direction: column;
      margin: 0 20px;
      width: 15rem;
  }

  label {
      font-size: 14px;
      cursor: pointer;
      color: #fff;
  }

  input[type=text] {
      padding: 5px;
      border: 1px solid #807b7b;
      border-radius: 4px;
      line-height: 1rem;
      outline: 0;
      color: inherit;
      margin-top: 2px;
  }

   button {
      padding: 0.5rem 3rem;
      background-color: rgb(187, 22, 91);
      color: #fff;
      font-size: 15px;
      cursor: pointer;
      border-color: transparent;
      border-radius: 5px;
  }

   button:hover,
   button:active {
    background: #2dc44d;
 }

</style>