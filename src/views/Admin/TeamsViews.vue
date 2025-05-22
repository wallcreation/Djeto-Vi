<script setup>
import { ref, onMounted, watch } from 'vue'

const teams = ref([])
const showModal = ref(false)
const showDetailsModal = ref(false)
const isEditing = ref(false)
const editingIndex = ref(null)

const form = ref({
  name: '',
  operators: [''],
})

const selectedTeam = ref(null)

// Chargement depuis localStorage
onMounted(() => {
  const stored = localStorage.getItem('teams')
  if (stored) {
    teams.value = JSON.parse(stored)
  } else {
    // Créer les équipes automatiquement depuis les comptes
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]')

    // Grouper les comptes par équipe
    const grouped = {}
    accounts.forEach(account => {
      const teamName = account.equipe
      if (!grouped[teamName]) {
        grouped[teamName] = []
      }
      grouped[teamName].push(`${account.prenom} ${account.nom}`)
    })

    // Construire les objets teams
    const autoTeams = Object.entries(grouped).map(([name, operators]) => ({
      id: Date.now() + Math.random(), // ID unique
      name,
      operators: operators.slice(0, 2), // max 2 opérateurs
    }))

    // Sauvegarder et assigner
    localStorage.setItem('teams', JSON.stringify(autoTeams))
    teams.value = autoTeams
  }
})


// Sauvegarde automatique dans localStorage
watch(
  teams,
  (newTeams) => {
    localStorage.setItem('teams', JSON.stringify(newTeams))
  },
  { deep: true },
)

function addOperator() {
  if (form.value.operators.length < 2) {
    form.value.operators.push('')
  }
}

function removeOperator(index) {
  form.value.operators.splice(index, 1)
}

function createOrUpdateTeam() {
  if (!form.value.name.trim() || form.value.operators.some((op) => !op.trim())) {
    alert('Tous les champs doivent être remplis.')
    return
  }

  if (isEditing.value && editingIndex.value !== null) {
    // Mise à jour
    teams.value[editingIndex.value] = {
      ...teams.value[editingIndex.value],
      name: form.value.name,
      operators: [...form.value.operators],
    }
  } else {
    // Création
    teams.value.push({
      id: Date.now(),
      name: form.value.name,
      operators: [...form.value.operators],
    })
  }

  closeModal()
}

function closeModal() {
  showModal.value = false
  isEditing.value = false
  editingIndex.value = null
  form.value.name = ''
  form.value.operators = ['']
}

function deleteTeam(index) {
  if (confirm('Voulez-vous vraiment supprimer cette équipe ?')) {
    teams.value.splice(index, 1)
  }
}

function viewTeam(team) {
  selectedTeam.value = team
  showDetailsModal.value = true
}

function closeDetailsModal() {
  showDetailsModal.value = false
  selectedTeam.value = null
}

function editTeam(index) {
  const team = teams.value[index]
  isEditing.value = true
  editingIndex.value = index
  form.value.name = team.name
  form.value.operators = [...team.operators]
  showModal.value = true
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Gestion des équipes</h1>
      <button
        @click="showModal = true"
        class="mb-4 bg-blue-600 flex gap-3 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
          <path
            fill="#94a7d7"
            d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601s-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10s.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4s1 .048 1 .601V9h4.399c.553 0 .601.447.601 1"
          />
        </svg>
        Nouvelle équipe
      </button>
    </div>

    <div v-if="teams.length === 0" class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded mb-4">
      Aucune équipe n’a été créée pour le moment.
    </div>

    <div v-else class="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th
              class="px-4 py-2 text-sm font-semibold text-center text-gray-700 dark:text-gray-200"
            >
              Nom
            </th>
            <th
              class="px-4 py-2 text-sm font-semibold text-center text-gray-700 dark:text-gray-200"
            >
              Opérateurs
            </th>
            <th
              class="px-4 py-2 text-sm font-semibold text-center text-gray-700 dark:text-gray-200"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(team, index) in teams" :key="team.id">
            <td class="px-4 h-[4em] text-gray-900 dark:text-white text-center">{{ team.name }}</td>
            <td class="px-4 h-[4em] text-gray-600 dark:text-gray-300 text-center">
              {{ team.operators.join(', ') }}
            </td>
            <td class="px-4 h-[4em] text-center flex justify-around gap-2">
              <button @click="viewTeam(team)" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
                  <g fill="none" stroke="#33ca47" stroke-linejoin="round" stroke-width="6.3">
                    <path
                      d="M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z"
                    />
                    <path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" />
                  </g>
                </svg>
              </button>
              <button @click="editTeam(index)" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="#2755c8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path
                      d="m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.1 2.1 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621"
                    />
                    <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
                  </g>
                </svg>
              </button>
              <button @click="deleteTeam(index)" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                  <path
                    fill="#e63131"
                    fill-rule="evenodd"
                    d="M9.774 5L3.758 3.94l.174-.986a.5.5 0 0 1 .58-.405L18.411 5h.088h-.087l1.855.327a.5.5 0 0 1 .406.58l-.174.984l-2.09-.368l-.8 13.594A2 2 0 0 1 15.615 22H8.386a2 2 0 0 1-1.997-1.883L5.59 6.5h12.69zH5.5zM9 9l.5 9H11l-.4-9zm4.5 0l-.5 9h1.5l.5-9zm-2.646-7.871l3.94.694a.5.5 0 0 1 .405.58l-.174.984l-4.924-.868l.174-.985a.5.5 0 0 1 .58-.405z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow max-w-md w-full space-y-4">
        <h2 class="text-xl font-semibold dark:text-white">
          {{ isEditing ? 'Modifier l’équipe' : 'Nouvelle équipe' }}
        </h2>

        <form @submit.prevent="createOrUpdateTeam" class="space-y-4">
          <div>
            <label class="block text-sm font-medium dark:text-white">Nom de l'équipe</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium dark:text-white">Opérateurs (maximum 2)</label>
            <div v-for="(op, i) in form.operators" :key="i" class="mb-2 flex space-x-2">
              <input
                v-model="form.operators[i]"
                type="text"
                class="flex-1 p-2 rounded border dark:bg-gray-800 dark:text-white"
              />
              <button
                v-if="form.operators.length > 1"
                type="button"
                @click="removeOperator(i)"
                class="cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                  <path
                    fill="#f92f60"
                    d="M24.879 2.879A3 3 0 1 1 29.12 7.12l-8.79 8.79a.125.125 0 0 0 0 .177l8.79 8.79a3 3 0 1 1-4.242 4.243l-8.79-8.79a.125.125 0 0 0-.177 0l-8.79 8.79a3 3 0 1 1-4.243-4.242l8.79-8.79a.125.125 0 0 0 0-.177l-8.79-8.79A3 3 0 0 1 7.12 2.878l8.79 8.79a.125.125 0 0 0 .177 0z"
                  />
                </svg>
              </button>
            </div>
            <button
              type="button"
              @click="addOperator"
              :disabled="form.operators.length >= 2"
              class="text-xl flex gap-2 pt-3 items-center text-blue-600 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
                <path
                  fill="#2755c8"
                  d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601s-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10s.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4s1 .048 1 .601V9h4.399c.553 0 .601.447.601 1"
                />
              </svg>
              Ajouter un opérateur
            </button>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded cursor-pointer bg-gray-500 text-white hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
            >
              {{ isEditing ? 'Enregistrer' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showDetailsModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow max-w-md w-full">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">Détails de l’équipe</h2>
        <p class="mb-2 dark:text-white"><strong>Nom :</strong> {{ selectedTeam.name }}</p>
        <p class="mb-4 dark:text-white">
          <strong>Opérateurs :</strong> {{ selectedTeam.operators.join(', ') }}
        </p>
        <div class="flex justify-end">
          <button
            @click="closeDetailsModal"
            class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
