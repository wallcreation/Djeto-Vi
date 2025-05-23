<template>
  <div class="bg-white p-4 rounded-2xl shadow-md">
    <h3 class="mb-2 font-bold">Ventes par membre</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps({ data: Array })
const canvas = ref(null)
let chart

const createChart = () => {
  if (chart) chart.destroy()
  chart = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: props.data.map(m => m.name),
      datasets: [{
        label: 'Revenus (€)',
        data: props.data.map(m => m.revenue),
        backgroundColor: ['#4ade80', '#60a5fa', '#facc15']
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
