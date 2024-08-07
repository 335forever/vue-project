<script setup>
import { ref } from 'vue';

const props = defineProps({
    moved: Array
})

const newest = ref(true)

const handleSortButton = () => {
    newest.value = !newest.value;
}

</script>

<template>
    <p>Lịch sử</p>
    <ol class="history-list">
        <template v-if="newest">
            <li 
                v-for="(move, index) in moved.toReversed()"
                :class="{'history-row': true, 'new-move-row': index === 0}"
                :key="index"
            >
                <span>{{moved.length - index + '. '}}</span>
                <span>{{move.mark}}</span>
                <span> đi vào ô: </span>
                <span>{{'('+ move.position.x + ', ' + move.position.y + ')'}}</span>
            </li>
        </template>
        <template v-else>
            <li 
                v-for="(move, index) in moved"
                :class="{'history-row': true, 'new-move-row': index === moved.length - 1}"
                :key="index"
            >
                <span>{{index + 1 + '. '}}</span>
                <span>{{move.mark}}</span>
                <span> đi vào ô: </span>
                <span>{{'('+ move.position.x + ', ' + move.position.y + ')'}}</span>
            </li>
        </template>
    </ol>
    <button class="sort-button" @click="handleSortButton">Sắp xếp</button>
</template>

<style scoped>
p {
  font-size: 32px;
  font-weight: bold;
}

.history-list {
  list-style-position: inside;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  border: 3px dashed red;
  padding: 10px;
  margin: 15px 0;
  height: 400px;
  width: 90%;
}

.history-row {
  background-color: rgb(184, 239, 251);
  padding: 2px;
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
  white-space: nowrap;
  text-align: left;
  border-radius: 5px;
}

.new-move-row{
  background-color: rgb(230, 253, 156);
}

.sort-button{
  width: fit-content;
  height: fit-content;
  font-size: 12px;
  white-space: nowrap;
  padding: 5px 10px;
  font-weight: bold;
  border-radius: 5px;
  background-color: rgb(202, 202, 241);
  cursor: pointer;
}
</style>
