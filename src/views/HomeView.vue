<script setup>
import AdminHeader from '@/components/Admin/AdminHeader.vue'
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'
import AdminFooter from '@/components/Admin/AdminFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <AdminHeader />

    <div class="flex flex-1">
      <!-- Sidebar -->
      <AdminSidebar />

      <!-- Main Content -->
      <main class="flex-1 ml-0 md:ml-64 p-6 bg-gray-100 min-h-[calc(100vh-128px)]">
        <h2 class="text-2xl font-semibold mb-4">Bienvenue sur le tableau de bord</h2>
        <p class="text-gray-700">c'est là où on va tout ajouter </p>
      </main>
    </div>

    <!-- Footer -->
    <AdminFooter />
  </div>
</template>
