<template>
  <div class="bg-white p-4 rounded-2xl shadow-md">
    <h3 class="mb-2 font-bold">Répartition par opérateur</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps({
  data: Array,
  labels: Array
})

const canvas = ref(null)
let chart

const createChart = () => {
  if (chart) chart.destroy()
  chart = new Chart(canvas.value, {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [{
        data: props.data,
        backgroundColor: ['#22c55e', '#3b82f6', '#f97316']
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  })
}

onMounted(createChart)
watch(() => props.data, createChart, { deep: true })
</script>

<style scoped>
canvas {
  height: 300px !important;
}
</style>
