<template>
   <div class="bg-white rounded-xl p-4 flex shadow max-h-[30em]">
    <h3 class="font-bold mb-2">Répartition messages</h3>
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
    type: 'doughnut',
    data: {
      labels: ['Opérateur A', 'Opérateur B','Opérateur C'],
      datasets: [{
        data: props.data,
        backgroundColor: ['#22c55e', '#f97316','#000']
      }]
    }
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
</script>