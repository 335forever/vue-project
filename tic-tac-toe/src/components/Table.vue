<script setup>
import { computed, reactive } from 'vue';
import Cell from './Cell.vue';
import HistoryList from './HistoryList.vue';
import { checkWin } from '@/ultis/func';

const props = defineProps({
    size: {m: Number, n: Number},
    lineLength: Number
})

const defaultMatchStatus = {
    nextMark: 'x', 
    moved: [], 
    win : null
}

const matchStatus = reactive(defaultMatchStatus)

const computedTableStyle = computed(() => {
    const maxSize = Math.max(props.size.m, props.size.n);
    return {
        width: `calc(var(--unit) * ${80 / maxSize} * ${props.size.n})`,
        height: `calc(var(--unit) * ${80 / maxSize} * ${props.size.m})`
    };
});

const getMarkAt = (position) => {
    for (let i = 0; i < matchStatus.moved.length; i++) {
        if (position.x === matchStatus.moved[i].position.x && position.y === matchStatus.moved[i].position.y) {
            return matchStatus.moved[i].mark
        }
    }
    return null;
}

const isWinCell = (position) => {
    if (matchStatus.win) {
        const cells = matchStatus.win.winCellPositions
        for (let cell of cells) 
            if (position.x === cell.x && position.y === cell.y)
            return true;
    }
    return false;
}

const handleCellClick = (i, j) => {
    if (matchStatus.win) return;
    matchStatus.moved.push({
        position : {
            x : i,
            y : j
        },
        mark: matchStatus.nextMark
    });
    matchStatus.nextMark = matchStatus.nextMark === 'x' ? 'o' : 'x';
    matchStatus.win = checkWin({x:i,y:j}, matchStatus.moved, props.lineLength);
}

const handleBackButton = () => {
    if (0 < matchStatus.moved.length && matchStatus.moved.length < props.size.m * props.size.n && !matchStatus.win) {
        matchStatus.nextMark = matchStatus.nextMark === 'X' ? 'O' : 'X';
        matchStatus.moved.pop();
    } 
};

const handleRestartButton = () => {
    matchStatus.nextMark = 'X';
    matchStatus.moved = [];
    matchStatus.win = null;
};

const emit = defineEmits(['clear-table-data']);

const handleSettingButton = () => {
    if (matchStatus.win || matchStatus.moved.length === 0 || matchStatus.moved.length === props.size.m * props.size.n)
        emit('clear-table-data')
}

</script>

<template>
    <div class="board">
        <div class="left-side">
            <p v-if="matchStatus.win">Người thắng:<img :src="'src/assets/mark_' + matchStatus.win.mark + '.png'" alt="Win mark"/></p> 
            <p v-else-if="matchStatus.moved.length < size.m * size.n">Lượt tiếp theo: <img :src="'src/assets/mark_' + matchStatus.nextMark + '.png'" alt="Next mark"/></p>
            <p v-else>Hòa</p>
            <div 
                class="table"
                :style="computedTableStyle"
            >
                <div
                    v-for="row in size.m"
                    class="row"
                >
                    <Cell
                        v-for="cell in size.n"
                        :mark="getMarkAt({x:row, y:cell})"
                        :belongToWinLine="isWinCell({x:row, y:cell})"
                        @tick="handleCellClick(row, cell)"
                    />
                </div>
            </div>
        </div>
        <div class="right-side">
            <HistoryList :moved="matchStatus.moved" />
            <div class="button-bar">
                <button @click="handleBackButton">Lùi</button>
                <button @click="handleRestartButton">Chơi lại</button>
                <div class="setting-button">
                    <img 
                        src="/src/assets/setting_button.png" 
                        alt="Setting" 
                        width="40" 
                        height="40" 
                        @click="handleSettingButton"
                    />
                </div>
            </div>
            
            <p><i>Luật <span>{{lineLength}}</span> ô</i></p>
        </div>
    </div>

</template>

<style scoped>
.board {
  display: flex;
  height: fit-content;
  width: fit-content;
  border: 5px solid rgb(99, 98, 96);
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px rgb(147, 147, 147);
}
.left-side {
  background-color: rgb(218, 239, 255);
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  align-items: center;
  width: fit-content;
}
.left-side > p {
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
}

.left-side > p img {
  width: 40px;
  height: 40px;
}

.right-side {
  width:fit-content;
  min-width: 300px;
  background-color: rgb(242, 177, 177);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right-side  p:first-child {
  font-size: 32px;
  font-weight: bold;
}

.right-side .history-list {
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

.right-side .history-row {
  background-color: rgb(184, 239, 251);
  padding: 2px;
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
  white-space: nowrap;
  text-align: left;
  border-radius: 5px;
}

.right-side .new-move-row{
  background-color: rgb(230, 253, 156);
}

.right-side .sort-button{
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

.right-side .button-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  width: 100%;
  justify-content: center;
  position: relative;
}

.right-side .button-bar button {
  width: fit-content;
  height: fit-content;
  font-size: 18px;
  white-space: nowrap;
  padding: 5px 10px;
  font-weight: bold;
  border-radius: 5px;
  background-color: rgb(176, 176, 231);
  cursor: pointer;
}

.right-side .button-bar button:active {
  background-color: rgb(212, 212, 238);
}

.right-side .button-bar .setting-button {
  display: flex;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
}

.right-side .button-bar .setting-button:hover {
  transform: scale(1.1);
}
.table {
  border: 5px solid orange;
  border-radius: 10px;
  margin: auto 0;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.row {
  display: flex;
  height: 100%;
}
</style>
