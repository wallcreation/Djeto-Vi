<script setup>
import { ref } from 'vue'

const comptes = ref([
  {
    "id": 1,
    "nom": "Agossa",
    "prenom": "Martin",
    "telephone": "+229012345678",
    "jour": "MATIN",
    "equipe": "Alpha",
    "password": "secret123"
  },
  {
    "id": 2,
    "nom": "Dossou",
    "prenom": "Clarisse",
    "telephone": "+229019876543",
    "jour": "SOIR",
    "equipe": "Bravo",
    "password": "clarisse456"
  },
  {
    "id": 3,
    "nom": "Zinsou",
    "prenom": "Emmanuel",
    "telephone": "+229017654321",
    "jour": "MATIN",
    "equipe": "Charlie",
    "password": "emmanuel789"
  },
  {
    "id": 4,
    "nom": "Tossou",
    "prenom": "Alice",
    "telephone": "+229018123456",
    "jour": "SOIR",
    "equipe": "Alpha",
    "password": "alice2024"
  },
  {
    "id": 5,
    "nom": "Mensah",
    "prenom": "Jacques",
    "telephone": "+229017112233",
    "jour": "MATIN",
    "equipe": "Bravo",
    "password": "jacques2024"
  },
  {
    "id": 6,
    "nom": "Gbaguidi",
    "prenom": "Sophie",
    "telephone": "+229016998877",
    "jour": "SOIR",
    "equipe": "Charlie",
    "password": "sophie998"
  },
  {
    "id": 7,
    "nom": "Lawson",
    "prenom": "Cédric",
    "telephone": "+229015223344",
    "jour": "MATIN",
    "equipe": "Alpha",
    "password": "cedric432"
  },
  {
    "id": 8,
    "nom": "Adjovi",
    "prenom": "Nadine",
    "telephone": "+229019112233",
    "jour": "SOIR",
    "equipe": "Bravo",
    "password": "nadine112"
  },
  {
    "id": 9,
    "nom": "Kpoviessi",
    "prenom": "Franck",
    "telephone": "+229013344556",
    "jour": "MATIN",
    "equipe": "Charlie",
    "password": "franck33"
  },
  {
    "id": 10,
    "nom": "Houngbo",
    "prenom": "Inès",
    "telephone": "+229014455667",
    "jour": "SOIR",
    "equipe": "Alpha",
    "password": "ines667"
  }
]
)
const showAddModal = ref(false)
const showDetailsModal = ref(false)
const showEditModal = ref(false)

const selectedCompte = ref(null)

const form = ref({
  nom: '',
  prenom: '',
  telephone: '',
  jour: '',
  equipe: '',
  password: '',
})

const editingId = ref(null)

const equipesDisponibles = ['Team Alpha', 'Team Beta', 'Team Gamma']

function validatePhone(phone) {
  const regex = /^\+229\d{2}\d{2}\d{2}\d{2}\d{2}$/
  return regex.test(phone)
}

function createCompte() {
  if (!validateForm()) return

  comptes.value.push({
    id: Date.now(),
    ...form.value,
  })
  closeAddModal()
}

function validateForm() {
  if (
    !form.value.nom ||
    !form.value.prenom ||
    !validatePhone(form.value.telephone) ||
    !form.value.jour ||
    !form.value.equipe ||
    !form.value.password
  ) {
    alert('Veuillez remplir tous les champs correctement.')
    return false
  }
  return true
}
const numeroSuffixe = ref('') // les 8 derniers chiffres saisis

function onPhoneInput(e) {
  // Ne garde que les chiffres, max 7
  numeroSuffixe.value = e.target.value.replace(/\D/g, '').slice(0, 8)
  form.value.telephone = '+22901' + numeroSuffixe.value
}

function openEditModal(compte) {
  form.value = { ...compte }
  numeroSuffixe.value = compte.telephone.replace('+22901', '')
  showModal.value = true
}
function saveEdit() {
  if (!validateForm()) return

  const index = comptes.value.findIndex((c) => c.id === editingId.value)
  if (index !== -1) {
    comptes.value[index] = { ...form.value, id: editingId.value }
  }
  closeEditModal()
}

function closeAddModal() {
  showAddModal.value = false
  resetForm()
}

function closeEditModal() {
  showEditModal.value = false
  editingId.value = null
  resetForm()
}

function resetForm() {
  form.value = {
    nom: '',
    prenom: '',
    telephone: '',
    jour: '',
    equipe: '',
    password: '',
  }
}

function viewDetails(compte) {
  selectedCompte.value = compte
  showDetailsModal.value = true
}

function deleteCompte(id) {
  if (confirm('Supprimer ce compte ?')) {
    comptes.value = comptes.value.filter((c) => c.id !== id)
    showDetailsModal.value = false
  }
}

function closeDetailsModal() {
  showDetailsModal.value = false
  selectedCompte.value = null
}

</script>

<template>

  <div class="p-6 space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Gestion des comptes</h1>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Nouveau compte
      </button>
    </div>

    <div v-if="comptes.length === 0" class="bg-yellow-100 text-yellow-800 p-4 rounded">
      Aucun compte n’a été créé pour le moment.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="compte in comptes"
        :key="compte.id"
        class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2"
      >
        <h2 class="font-semibold text-lg dark:text-white">{{ compte.nom }}</h2>
        <h2 class="font-semibold text-lg dark:text-white">{{ compte.prenom }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300">Téléphone : {{ compte.telephone }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">Équipe : {{ compte.equipe }}</p>
        <button @click="viewDetails(compte)" class="text-blue-600 flex items-end justify-end hover:underline">
          Voir plus
        </button>
    </div>
    </div>

    <!-- Modal Ajout & Modification (partagé) -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow max-w-md w-full space-y-4">
        <h2 class="text-xl font-semibold dark:text-white">
          {{ showEditModal ? 'Modifier le compte' : 'Nouveau compte' }}
        </h2>
        <form @submit.prevent="showEditModal ? saveEdit() : createCompte()" class="space-y-3">
          <div class="flex gap-4">
             <div>
                 <label class="text-sm text-gray-700 dark:text-gray-200">Nom</label>
                  <input
                    v-model="form.nom"
                    type="text"
                    placeholder="Nom"
                    class="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
                    required
                  />
             </div>
              <div>
                <label class="text-sm text-gray-700 dark:text-gray-200">Prénom</label>
                  <input
                    v-model="form.prenom"
                    type="text"
                    placeholder="Prénom"
                    class="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
                    required
                  />
              </div>
          </div>
          <div>
            <label class="text-sm text-gray-700 dark:text-gray-200">Téléphone</label>
            <div class="flex items-center space-x-2">
              <span
                class="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-l text-gray-700 dark:text-gray-300 select-none"
                >+22901</span
              >
              <input
                v-model="numeroSuffixe"
                @input="onPhoneInput"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="8"
                placeholder="23456789"
                class="w-full p-2 rounded-r border dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
          </div>

          <div class="flex gap-4">
              <div>
                <label class="text-sm text-gray-700 dark:text-gray-200">Jour de Travail</label>
                  <select
                    v-model="form.jour"
                    class="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
                    required
                  >
                    <option disabled value="">-- Jour de travail --</option>
                    <option value="MATIN">MATIN</option>
                    <option value="SOIR">SOIR</option>
                  </select>
              </div>
              <div>
                <label class="text-sm text-gray-700 dark:text-gray-200">Equipes</label>
                  <select
                    v-model="form.equipe"
                    class="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
                    required
                  >
                    <option disabled value="">-- Équipe --</option>
                    <option v-for="equipe in equipesDisponibles" :key="equipe" :value="equipe">
                      {{ equipe }}
                    </option>
                  </select>
              </div>
          </div>
         <div>
            <label class="text-sm text-gray-700 dark:text-gray-200">Mot de Passe</label>
            <input
               v-model="form.password"
               type="password"
               placeholder="Mot de passe"
               class="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
               required
             />
         </div>

          <div class="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              @click="showEditModal ? closeEditModal() : closeAddModal()"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {{ showEditModal ? 'Enregistrer' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Détails -->
    <div
      v-if="showDetailsModal && selectedCompte"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow max-w-md w-full space-y-4">
        <h2 class="text-xl font-semibold dark:text-white">Détails du compte</h2>
        <p class="dark:text-white"><strong>Nom :</strong> {{ selectedCompte.nom }}</p>
        <p class="dark:text-white"><strong>Prénom :</strong> {{ selectedCompte.prenom }}</p>
        <p class="dark:text-white"><strong>Téléphone :</strong> {{ selectedCompte.telephone }}</p>
        <p class="dark:text-white"><strong>Jour de travail :</strong> {{ selectedCompte.jour }}</p>
        <p class="dark:text-white"><strong>Équipe :</strong> {{ selectedCompte.equipe }}</p>
        <p class="dark:text-white"><strong>Mot de passe :</strong> *********</p>

        <div class="flex justify-end space-x-2 pt-2">
          <button
            @click="openEditModal(selectedCompte)"
            class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Modifier
          </button>
          <button
            @click="deleteCompte(selectedCompte.id)"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer
          </button>
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
