<template>
  <div class="p-6">
    <StatsHeader :cards="resumeCards" />
    <OperatorSelect v-model="selectedOperator" :operators="operators" />
    <TeamStats :team="filteredTeam" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BarChart :data="filteredTeam" />
      <DonutChart :data="donutData" :labels="operators.map(o => o.name)" />
    </div>
  </div>
</template>

<script setup>
import StatsHeader from '@/components/Admin/StatsHeader.vue'
import OperatorSelect from '@/components/Admin/OperatorSelect.vue'
import TeamStats from '@/components/Admin/TeamStats.vue'
import BarChart from '@/components/Admin/BarChart.vue'
import DonutChart from '@/components/Admin/DonutChart.vue'
import { computed, ref } from 'vue'

const selectedOperator = ref('')
const resumeCards = [
  { label: 'Total Ventes', value: '12 450 €', color: 'text-green-600' },
  { label: 'Opérations', value: '340', color: 'text-blue-600' },
  { label: 'Revenus', value: '9 200 €', color: 'text-emerald-600' },
  { label: 'Moyenne/Jour', value: '11.3', color: 'text-yellow-600' }
]

const operators = [
  { id: 'op1', name: 'Opérateur A' },
  { id: 'op2', name: 'Opérateur B' }
]

const teamStats = [
  { id: 1, name: 'Jean Dupont', operations: 134, revenue: 3200, operatorId: 'op1' },
  { id: 2, name: 'Alice Martin', operations: 80, revenue: 2100, operatorId: 'op1' },
  { id: 3, name: 'Paul Dubois', operations: 110, revenue: 2600, operatorId: 'op2' }
]

const filteredTeam = computed(() => {
  return selectedOperator.value
    ? teamStats.filter(m => m.operatorId === selectedOperator.value)
    : teamStats
})

const donutData = computed(() =>
  operators.map(op =>
    teamStats.filter(m => m.operatorId === op.id).reduce((sum, m) => sum + m.revenue, 0)
  )
)
</script>
