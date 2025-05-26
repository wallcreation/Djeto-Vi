<script setup>
import { ref, computed } from 'vue'
import StatsToolbar from '@/components/StatsToolbar.vue'
import BarChart from '@/components/BarChart.vue'
import DonutChart from '@/components/DonutChart.vue'
import StatsTable from '@/components/StatsTable.vue'

const selectedOperator = ref('')
const selectedMonth = ref(new Date().toISOString().slice(0, 7)) // format YYYY-MM

const operators = [
  { id: 'op1', name: 'Opérateur A' },
  { id: 'op2', name: 'Opérateur B' },
  { id: 'op3', name: 'Opérateur C' }

]
const operatorAccounts = {
  op1: ['Compte 1A', 'Compte 1B'],
  op2: ['Compte 2A', 'Compte 2B'],
  op3: ['Compte 3A']
}
const selectedAccount = ref('')


const months = ['2025-04', '2025-05', '2025-06','2025-07']

const stats = ref([
  { date: '2025-05-01', tranche: [200, 300], recu: 100, ouvert: 80, envoye: 70, operatorId: 'op1', month: '2025-05' },
  { date: '2025-05-03', tranche: [300, 450], recu: 150, ouvert: 140, envoye: 110, operatorId: 'op2', month: '2025-05' },
  { date: '2025-06-04', tranche: [500, 850], recu: 200, ouvert: 150, envoye: 140, operatorId: 'op3', month: '2025-07' },

])

const filteredStats = computed(() =>
  stats.value.filter(s =>
    (!selectedOperator.value || s.operatorId === selectedOperator.value) &&
    (!selectedAccount.value || s.compte === selectedAccount.value) &&
    s.month === selectedMonth.value
  )
)


const barChartData = computed(() => {
  return operators.map(op => {
    const total = stats.value
      .filter(s => s.operatorId === op.id && s.month === selectedMonth.value)
      .reduce((sum, s) => sum + s.recu, 0)
    return { name: op.name, value: total }
  })
})

const donutChartData = computed(() => barChartData.value.map(d => d.value))

const handleAddStat = () => {
  alert('Formulaire d’ajout déclenché')
}
</script>
<template>
  <h1 class="text-2xl font-bold">Statistiques des Données</h1>

  <div class="p-6 space-y-7">
    <StatsToolbar
      v-model:operator="selectedOperator"
      v-model:month="selectedMonth"
      @add-stat="handleAddStat"
      :months="months"
      :operators="operators"
    />

    <!-- Sélecteur de compte si un opérateur est sélectionné -->
    <div v-if="selectedOperator" class="mb-4">
      <label class="block font-semibold mb-2">Compte de l’opérateur :</label>
      <select v-model="selectedAccount" class="border p-2 rounded w-full md:w-1/3">
        <option disabled value="">-- Sélectionner un compte --</option>
        <option v-for="account in operatorAccounts[selectedOperator]" :key="account" :value="account">
          {{ account }}
        </option>
      </select>
    </div>

    <!-- Rien de sélectionné -->
    <div v-if="!selectedOperator" class="text-gray-500 italic">
      Aucun opérateur sélectionné.
    </div>

    <!-- Affichage des graphes et tableau -->
    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChart :data="barChartData" />
        <DonutChart :data="donutChartData" />
      </div>

      <StatsTable :stats="filteredStats" />
    </div>
  </div>
</template>

