<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div v-for="member in team" :key="member.id" class="bg-white p-4 rounded-2xl shadow-md">
      <h4 class="text-lg font-bold">{{ member.name }}</h4>
      <p>Opérations : <span class="font-semibold">{{ member.operations }}</span></p>
      <p>Revenus : <span class="text-green-600 font-semibold">{{ member.revenue }} €</span></p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  team: Array
})
</script>
