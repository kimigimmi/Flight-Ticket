<template>
    <form>
        <div class="container">
            <div class="multiFlightSearchForm">
                <enlarge-multi></enlarge-multi>
                <enlarge-multi></enlarge-multi>
            </div>
            <button class="add-flight-btn">+ Add one more flight</button>
            <div class="form-group">
                <div class="left-wrapper-form">
                    <input type="text" id="passanger-count" />
                    <div class="left-wrapper-direct-flight">
                        <input type="checkbox" id="direct-flight" />
                        <label for="direct-flight">Direct Flight</label>
                    </div>
                </div>
                <button>Find Ticket</button>
            </div>
        </div>
    </form>
</template>

<script>
import EnlargeMulti from './multiItemsEnlarger/EnlargeMulti.vue';
export default {
    components: {
        EnlargeMulti
    }
}

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.multiFlightSearchForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.add-flight-btn {
    margin-top: 10px;
    width: 30%;
    padding: 0.5rem;
    color: #fff;
    background: #2dc44d;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    line-height: 1rem;
    margin-bottom: 20px;
}

.form-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 6rem;
}

.left-wrapper-form {
    display: flex;
}

.left-wrapper-form input {
    margin-right: 2rem;
}

.left-wrapper-direct-flight {
    display: flex;
    align-items: center;
}


.left-wrapper-direct-flight label {
    display: inline;
    /* Yazıları yan yana getir */
}

input[type=text] {
    padding: 5px;
    border: 1px solid #807b7b;
    border-radius: 4px;
    line-height: 1rem;
    color: inherit;
    margin-top: 2px;
    height: 2rem;
}

input[type=checkbox] {
    margin-right: 5px;
}


.form-group button {
    background-color: rgb(187, 22, 91);
    color: #fff;
    cursor: pointer;
    border-color: transparent;
    border-radius: 5px;
    padding: 0 3rem;
}

.form-group button:hover,
button:active {
    background: #2dc44d;
}
</style>








