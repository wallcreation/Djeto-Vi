<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValueOperator: {
    type: String,
    default: '',
  },
  modelValueMonth: {
    type: String,
    default: '',
  },
  operators: Array,
  months: Array,
})

const emit = defineEmits(['update:operator', 'update:month', 'add-stat'])

const selectedOperator = ref(props.modelValueOperator || '')
const selectedMonth = ref(props.modelValueMonth || '')

watch(selectedOperator, (val) => emit('update:operator', val))
watch(selectedMonth, (val) => emit('update:month', val))

const formatMonth = (m) => {
  const [y, mo] = m.split('-')
  return `${mo}/${y}`
}
</script>
<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <select v-model="selectedOperator" class="border p-2 rounded w-full md:w-1/3">
      <option disabled value="">-- Sélectionner un opérateur --</option>
      <option v-for="op in operators" :key="op.id" :value="op.id">{{ op.name }}</option>
    </select>

    <button @click="$emit('add-stat')" class="bg-blue-600 text-white px-4 py-2 rounded">
      Ajouter des stats
    </button>

    <select v-model="selectedMonth" class="border p-2 rounded w-full md:w-1/4">
      <option disabled value="">-- Sélectionner un mois --</option>
      <option v-for="month in months" :key="month" :value="month">
        {{ formatMonth(month) }}
      </option>
    </select>
  </div>
</template>
