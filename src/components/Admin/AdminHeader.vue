<template>
  <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center z-20">
    <h1 class="text-xl font-bold text-gray-800">Admin Dashboard</h1>
    <div >
        
      <router-link to="/login">
          <button class="text-gray-600 flex gap-1.5 cursor-pointer hover:text-gray-800" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Déconnexion
              </button>
      </router-link>
    </div>
  </header>
</template>
