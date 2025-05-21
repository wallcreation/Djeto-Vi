<script setup>
defineProps({
  sidebarOpen: Boolean
})

defineEmits(['toggle-sidebarclose'])
</script>


<template>
  <aside
    :class="[
      'fixed z-40 inset-y-0 left-0 w-[20em] bg-gray-800 text-white flex flex-col transform transition-transform duration-300 ease-in-out',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'lg:translate-x-0 lg:static lg:flex'
    ]"
  >
    <!-- Header -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-gray-700">
      <span class="text-xl font-bold">Admin</span>
      <!-- Bouton de fermeture mobile -->
      <button @click="$emit('toggle-sidebarclose')" class="lg:hidden text-white text-xl">✖</button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2">
      <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">Dashboard</a>
      <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">Utilisateurs</a>
      <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">Paramètres</a>
      <a href="#" class="block px-4 py-2 rounded hover:bg-gray-700">Paramètres</a>
      
    </nav>
    <div class="py-3 flex justify-center border-t border-gray-200 dark:border-gray-700">
        <router-link to="/login" class="w-full flex items-center justify-center cursor-pointer space-x-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Log out</span>
        </router-link>
      </div>
  </aside>

  <!-- Overlay (mobile only) -->
  <div
    v-if="sidebarOpen"
    class="fixed inset-0 z-30 blur bg-[#0000003f] bg-opacity-50 lg:hidden"
    @click="$emit('toggle-sidebarclose')"
  ></div>
</template>


