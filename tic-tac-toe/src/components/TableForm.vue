<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['submit-form']);

const tableInfor = reactive({
    size : {
        m: 8,
        n: 8
    },
    lineLength : 5
});

const handleSubmit = () => {
    if (tableInfor.lineLength > tableInfor.size.m || tableInfor.lineLength > tableInfor.size.n)
        alert('Vui lòng chọn kích thước bàn phù hợp với luật!');
    else 
        emit('submit-form', { ...tableInfor });
};

</script>

<template>
    <form class='table-form' @submit.prevent="handleSubmit">
        <div class="form-part">
            <p>Chọn kích thước bàn:</p>
            <div class="set-size">
                <input v-model="tableInfor.size.m" type="number" min="3" max="20" required/> 
                <span>x</span> 
                <input v-model="tableInfor.size.n" type="number" min="3" max="20" required/>
            </div>
        </div>
        <div class="form-part">
            <div class="set-line">
                <p>Luật:</p>
                <select v-model="tableInfor.lineLength">
                    <option value="3">3 ô</option>
                    <option value="4">4 ô</option>
                    <option value="5">5 ô</option>
                </select>
            </div>
            <button type="submit">Chơi</button>
        </div>
    </form>
</template>

<style scoped>
.table-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: fit-content;
  max-width: 80%;
  height: fit-content;
  background-color: pink;
  padding: 20px;
  border: 10px solid rgb(0, 135, 153);
  border-radius: 10px;
  font-size: 30px;
}

.table-form .form-part {
  display: flex;
  gap: 20px;
  align-items: center;
}

.table-form .set-size {
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-form .set-size input {
  width: 60px;
  height: 60px;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
}

.table-form .set-line {
  display: flex;
  gap: 10px;
}

.table-form .set-line select {
  width: 120px;
  height: 60px;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  appearance: none;  
}

.table-form button {
  width: 200px;
  height: 60px;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  margin: 0 auto;
  color:rgb(48, 10, 86);
  background-color: rgb(172, 212, 248);
}

.table-form button:hover {
  cursor: pointer;
  background-color: rgb(189, 241, 241);
}
</style>
