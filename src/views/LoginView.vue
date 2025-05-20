<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loginError = ref(false)

const login = async () => {
  if (!email.value || !password.value) {
    alert('Veuillez remplir tous les champs.')
    return
  }

  try {
    const response = await axios.post('http://localhost:8000/login', {
      email: email.value,
      password: password.value,
    })

    if (!response.data.status) {
      loginError.value = true
      return
    }

    const token = response.data.token
    localStorage.setItem('session_token', token)
    router.push('/home')
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    loginError.value = true
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 bg-[url('../assets/aa.jfif')]">
    <!-- Overlay sombre -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

    <div class="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl text-white">
      <div class="flex justify-center mb-6">
        <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
          <svg class="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
          </svg>
        </div>
      </div>

      <!-- Affichage d'erreur -->
      <div v-if="loginError" class="text-red-300 text-center mb-4">
        Email ou mot de passe incorrect.
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-1" for="email">
            <span class="inline-flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 4h20v16H2z" fill="none"/>
                <path d="M22 6v12H2V6l10 7L22 6z"/>
              </svg>
              Email ID
            </span>
          </label>
          <input id="email" type="email" v-model="email" class="w-full px-4 py-2 bg-transparent border-b border-white focus:outline-none focus:border-[#535353] placeholder-white/70" placeholder="Email ID" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1" for="password">
            <span class="inline-flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                <path fill-rule="evenodd" d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8h-2zm-8-1a3 3 0 0 1 6 0v1H9V7z" clip-rule="evenodd"/>
              </svg>
              Password
            </span>
          </label>
          <input id="password" type="password" v-model="password" class="w-full px-4 py-2 bg-transparent border-b border-white focus:outline-none focus:border-[#535353] placeholder-white/70" placeholder="Password" required />
        </div>

        <div class="flex items-center justify-between text-sm text-white/80">
          <label class="inline-flex items-center space-x-2">
            <input type="checkbox" v-model="rememberMe" class="form-checkbox text-blue-500 bg-transparent border-white/50" />
            <span>Remember me</span>
          </label>
          <a href="#" class="hover:underline text-white/70">Forgot Password?</a>
        </div>

        <button type="submit" class="w-full text-[#000] cursor-pointer py-3 rounded-xl bg-gradient-to-r from-[#ffffff] to-[#ffffff6b] hover:opacity-90 transition duration-300 font-bold tracking-wide">
          LOGIN
        </button>
      </form>
    </div>
  </div>
</template>
