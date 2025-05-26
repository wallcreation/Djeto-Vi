<template>
  <div class="bg-white rounded-xl p-4 shadow">
    <h3 class="font-bold mb-2">Messages reçus</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps({ data: Array })
const canvas = ref(null)
let chart

const renderChart = () => {
  if (chart) chart.destroy()
  chart = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: props.data.map(d => d.name),
      datasets: [{
        label: 'Messages reçus',
        data: props.data.map(d => d.value),
        backgroundColor: '#3b82f6'
      }]
    }
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
</script>