<template>
  <AdminHeader :fname="profile.fname" :lname="profile.lname" />
  <div class="text-white">Welcome to admin page</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import AdminHeader from '@/components/AdminHeader.vue'

const router = useRouter()
const profile = reactive(JSON.parse(localStorage.getItem('profile') || '{}'))

onMounted(() => {
  if (!profile || profile.role !== 'admin') {
    alert("Vous devez être connecté en tant qu'administrateur pour accéder à cette page.")
    router.push('/login')
  }
})
</script>
