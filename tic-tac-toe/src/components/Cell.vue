<script setup>
const props = defineProps({
    mark: String,
    belongToWinLine: Boolean
})
const emit = defineEmits(['tick'])

const handleCellClick = () => {
    if (!props.mark) emit('tick')
}
</script>

<template>
    <div 
        :class="{'cell': true, 'hight-light' : belongToWinLine}"
        @click="handleCellClick"
    >
        <img v-if="mark"
            class="cell-img"
            :src="'src/assets/mark_' + mark + '.png'"
            alt="Mark"
            width="40"
            height="40"
            draggable="false"
        />
    </div>
</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: rgb(198, 198, 198);
  margin: 1px;
  border-radius: 3px;
  height: auto;
  width: 100%;
}

.hight-light {
  background-color: rgb(214, 182, 133);
}

.cell-img {
  width: 80%;
  height: 80%;
  transition: transform 0.2s ease-in-out;
}

.cell-img:hover {
  transform: scale(1.1);
}
</style>
