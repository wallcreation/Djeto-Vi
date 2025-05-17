<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <div class="login bg-gray-700 p-8 rounded shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold text-emerald-500 mb-3 text-center">Djeto Vi</h1>
      <form @submit.prevent="login">
        <div class="flex mb-4 bg-blue-400 border-2 border-blue-400 rounded-xl items-center">
          <label for="username" class="block m-2">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="w-full m-1 p-1 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-white mb-2">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const login = async () => {
  router.push('/home')
}
</script>
