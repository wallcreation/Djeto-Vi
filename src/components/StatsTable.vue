<template>
  <div class="bg-white rounded-xl p-4 shadow">
    <table class="w-full text-left">
      <thead class="border-b">
        <tr>
          <th class="py-2">Date</th>
          <th class="py-2">Tranche</th>
          <th class="py-2">Reçu</th>
          <th class="py-2">Ouvert</th>
          <th class="py-2">Envoyé</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in stats" :key="s.date" class="border-b hover:bg-gray-50">
          <td class="py-2">{{ s.date }}</td>
          <td class="py-2">{{ s.tranche[0] }} - {{ s.tranche[1] }}</td>
          <td class="py-2">{{ s.recu }}</td>
          <td class="py-2">{{ s.ouvert }}</td>
          <td class="py-2">{{ s.envoye }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({ stats: Array })
</script>
