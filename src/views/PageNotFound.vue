<script setup></script>

<template>
  <div class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
 
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">404</p>
        <h1
          class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
        >
          Page not found
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Désolé, tu ne devrait pas te retrouver sur ce liensn, c'est incorrect
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link to="/home"
            href="#"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Retour a la page d'accueil
            </router-link>     
        </div>
      </div>
  </div>
</template>

<style scoped></style>
