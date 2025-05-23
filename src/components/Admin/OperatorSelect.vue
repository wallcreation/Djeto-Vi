<template>
  <div class="mb-6">
    <label class="block mb-2 font-semibold">Choisir un opérateur :</label>
    <select v-model="selected" class="p-2 rounded border border-gray-300 w-full md:w-1/3">
      <option value="">Tous les opérateurs</option>
      <option v-for="op in operators" :key="op.id" :value="op.id">{{ op.name }}</option>
    </select>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
  modelValue: String,
  operators: Array
})
const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)

// Mettre à jour le parent quand `selected` change
watch(selected, value => {
  emit('update:modelValue', value)
})

// Réagir si la prop change de l'extérieur
watch(() => props.modelValue, value => {
  if (value !== selected.value) {
    selected.value = value
  }
})
</script>
