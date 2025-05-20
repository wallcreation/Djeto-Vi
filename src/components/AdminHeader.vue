<template>
  <header
    class="w-full bg-gradient-to-r from-sky-700 via-indigo-700 via-purple-700 to-pink-700 flex items-center px-4 text-white justify-between"
  >
    <div><h1 class="">Ops</h1></div>

    <div class="flex gap-4">
      <p>Teams</p>
      <p>Opérateurs</p>
      <p>Comptes</p>
    </div>

    <div>
      <p>{{ initials }}</p>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
defineProps({
  fname: String,
  lname: String,
})
const initials = computed(() => {
  return `${fname?.charAt(0).toUpperCase() ?? ''}${lname?.charAt(0).toUpperCase() ?? ''}`
})
</script>
