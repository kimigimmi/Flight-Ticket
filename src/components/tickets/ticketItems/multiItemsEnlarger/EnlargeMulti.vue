<template>
        <div class="input-group">
            <div class="form-group">
                <label for="from">From</label>
                <input type="text" id="from" />
            </div>
            <div class="form-group">
                <label for="to">To</label>
                <input type="text" id="to" />
            </div>
            <div class="form-group">
                <label for="departure-date">Date of Departure</label>
                <input type="text" id="departure-date" />
            </div>
            <button class="delete-button">X</button>
        </div>
</template>

<style> 

.input-group {
     display: flex;
     flex-direction: row;
     /* İkinci div'i yan yana getir */
     margin-bottom: 20px;
 }

 .form-group {
     display: flex;
     flex-direction: column;
     margin: 0 20px;
     width: 8rem;
     /* İkinci form grupları arasındaki boşluk */
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
     flex: 1;
     margin-top: 2px;
 }

 input[type=checkbox] {
     margin-right: 5px;
 }

 .one-way-box {
     margin-left: auto;
     /* Checkbox'u en sağa yerleştirir */
 }

 .c-box-section {
     display: flex;
 }

 .delete-button {
    border:none;
    background-color: transparent;
    margin-left: 1rem;
    font-size: 16px;
    cursor: pointer;
    color: #ffffff;
 }
 
</style>