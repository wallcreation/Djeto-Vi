<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div v-for="card in cards" :key="card.label" class="bg-white p-4 rounded-2xl shadow-md">
      <h3 class="text-sm text-gray-500">{{ card.label }}</h3>
      <p class="text-2xl font-bold" :class="card.color">{{ card.value }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cards: Array
})
</script>
