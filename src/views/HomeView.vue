<script setup>
import { ref } from 'vue'
import Header from '@/components/Admin/AdminHeader.vue'
import Sidebar from '@/components/Admin/AdminSidebar.vue'
import Footer from '@/components/Admin/AdminFooter.vue'

const isSidebarOpen = ref(false) // fermé par défaut pour mobile
</script>


<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar visible en permanence en desktop, toggle en mobile -->
    <Sidebar :sidebarOpen="isSidebarOpen" @toggle-sidebarclose="isSidebarOpen = false" />

    <!-- Main -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header @toggle-sidebar="isSidebarOpen = true" />

      <!-- Contenu principal -->
      <main class="flex-1 p-4 overflow-auto bg-gray-100">
        <h1 class="text-2xl font-bold">Bienvenue dans votre dashboard !</h1>
        <p class="mt-2 text-gray-600">Voici votre zone de travail...</p>
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

