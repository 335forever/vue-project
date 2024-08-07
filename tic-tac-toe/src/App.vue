<script setup>
import { reactive } from 'vue';
import Table from './components/Table.vue';
import TableForm from './components/TableForm.vue';

const tableInfor = reactive({})

const setTableInfor = (newInfor) => {
  const tableInforKeys = Object.keys(tableInfor)
  for (let key of tableInforKeys) delete tableInfor[key];
  for (let infor in newInfor) tableInfor[infor] = newInfor[infor];
}

const handleFormSubmit = (formData) => {
  setTableInfor(formData)
}

</script>

<template>
  <Table 
    v-if="Object.keys(tableInfor).length"
    :size="tableInfor.size"
    :lineLength="tableInfor.lineLength"
    @clear-table-data="setTableInfor({})"
  />
  <TableForm v-else @submit-form="handleFormSubmit"/>
</template>

<style scoped>

</style>
