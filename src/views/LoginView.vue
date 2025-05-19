<template>
  <div class="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div class="flex flex-col items-center justify-center h-full">
      <div class="bg-white/80 p-5 h-3/4 w-1/3 rounded">
        <h1 class="block text-3xl mb-2 text-center">Connexion</h1>
        <form class="my-8 px-3">
          <label for="email" class="block mb-2">Email:</label>
          <div
            class="flex pb-2 px-2 mb-4 items-center gap-3 border-b-2 border-sky-200 transition-all duration-200 ease-in-out"
            :class="[emailFocused ? 'border-sky-500 scale-[1.01]' : 'border-sky-200 scale-100']"
          >
            <font-awesome-icon
              :icon="['fas', 'at']"
              :class="[emailFocused ? 'text-sky-500' : 'text-gray-400']"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Entrez votre mail."
              required
              v-model="email"
              class="block bg-transparent outline-none focus:outline-none w-full"
              :class="[emailFocused ? 'text-sky-500' : 'text-gray-400']"
              @focus="emailFocused = true"
              @blur="emailFocused = false"
            />
          </div>
          <label for="password" class="block mb-2">Mot de passe:</label>
          <div
            class="flex pb-2 mb-4 items-center gap-3 border-b-2 border-sky-200"
            :class="[passwordFocused ? 'border-sky-500' : 'border-sky-200']"
          >
            <font-awesome-icon
              :icon="['fas', showPassword ? 'unlock' : 'lock']"
              id="password-icon"
              :class="[passwordFocused ? 'text-sky-500' : 'text-gray-400']"
              @click="showPassword = !showPassword"
            />
            <input
              :type="showPassword ? 'text' : 'password'"
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe."
              required
              v-model="password"
              class="block outline-none focus:outline-none w-full"
              :class="[passwordFocused ? 'text-sky-500' : 'text-gray-400']"
              @focus="passwordFocused = true"
              @blur="passwordFocused = false"
            />
          </div>
          <button
            type="submit"
            @click.prevent="login"
            class="mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-1 w-full focus:p-2 hover:p-2"
          >
            <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']" />
            Se connecter
          </button>
        </form>
        <div
          id="error"
          v-if="loginError"
          class="flex items-center justify-center gap-2 border-2 border-red-500 rounded-lg text-red-500 px-10 mx-10"
        >
          <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
          <p>Indentifians incorrect</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
const router = useRouter()
const email = ref('')
const password = ref('')
const emailFocused = ref(false)
const passwordFocused = ref(false)
const showPassword = ref(false)
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
