<script setup>
import { ref, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'

// État principal
const comptesTravail = ref([])
const form = ref({ nom: '', equipe: '' })
const editingId = ref(null)
const showModal = ref(false)
const filtreEquipe = ref('')
const rechercheNom = ref('')

// Chargement depuis localStorage
onMounted(() => {
  const saved = localStorage.getItem('comptesTravail')
  if (saved) comptesTravail.value = JSON.parse(saved)
})

// Persistance automatique
watch(comptesTravail, () => {
  localStorage.setItem('comptesTravail', JSON.stringify(comptesTravail.value))
}, { deep: true })

// Formulaire
async function submitForm() {
  if (!form.value.nom || !form.value.equipe) {
    Swal.fire({
      icon: 'warning',
      title: 'Champs requis',
      text: 'Veuillez remplir tous les champs.',
    })
    return
  }

  if (editingId.value !== null) {
    const result = await Swal.fire({
      title: 'Confirmer la modification',
      text: 'Voulez-vous enregistrer les modifications ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    })

    if (result.isConfirmed) {
      const index = comptesTravail.value.findIndex(c => c.id === editingId.value)
      if (index !== -1) {
        comptesTravail.value[index] = { ...form.value, id: editingId.value }

        Swal.fire({
          icon: 'success',
          title: 'Modifié',
          text: 'Le compte a été modifié avec succès.',
          timer: 1500,
          showConfirmButton: false,
        })
      }
      resetForm()
    }
  } else {
    comptesTravail.value.push({ ...form.value, id: Date.now() })
    Swal.fire({
      icon: 'success',
      title: 'Ajouté',
      text: 'Le compte a été ajouté avec succès.',
      timer: 1500,
      showConfirmButton: false,
    })
    resetForm()
  }
}

// Modifier
function editCompte(compte) {
  form.value = { nom: compte.nom, equipe: compte.equipe }
  editingId.value = compte.id
  showModal.value = true
}

// Supprimer
async function deleteCompte(id) {
  const result = await Swal.fire({
    title: 'Supprimer ce compte ?',
    text: 'Cette action est irréversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  })

  if (result.isConfirmed) {
    comptesTravail.value = comptesTravail.value.filter(c => c.id !== id)
    Swal.fire({
      icon: 'success',
      title: 'Supprimé',
      text: 'Le compte a été supprimé.',
      timer: 1500,
      showConfirmButton: false,
    })
  }
}

// Réinitialiser
function resetForm() {
  form.value = { nom: '', equipe: '' }
  editingId.value = null
  showModal.value = false
}

// Équipes
const equipesDisponibles = ref(['Alpha', 'Bravo', 'Charlie', 'Delta'])
</script>


<template>
  <div class="p-6 space-y-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 class="text-2xl font-bold">Comptes de travail</h1>
      <button @click="showModal = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        + Ajouter
      </button>
    </div>

    <div class="flex flex-col md:flex-row gap-4 items-center">
      <div>
        <label class="font-semibold">Filtrer par équipe :</label>
        <select v-model="filtreEquipe" class="p-2 border rounded dark:bg-gray-800 dark:text-white">
          <option value="">Toutes</option>
          <option v-for="equipe in equipesDisponibles" :key="equipe" :value="equipe">{{ equipe }}</option>
        </select>
      </div>
      <div>
        <label class="font-semibold">Rechercher par nom :</label>
        <input
          v-model="rechercheNom"
          type="text"
          placeholder="Nom du compte"
          class="p-2 border rounded dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>

    <div v-if="comptesTravail.length === 0" class="text-gray-500 dark:text-gray-300">
      Aucun compte de travail ajouté.
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="compte in comptesTravail
          .filter(c => !filtreEquipe || c.equipe === filtreEquipe)
          .filter(c => c.nom.toLowerCase().includes(rechercheNom.toLowerCase()))"
        :key="compte.id"
        class="p-4 bg-white dark:bg-gray-800 rounded-xl shadow space-y-2 hover:scale-105 transition-transform cursor-pointer"
        @click="editCompte(compte)"
      >
        <h2 class="text-lg font-semibold dark:text-white">{{ compte.nom }}</h2>
        <p class="text-sm text-gray-700 dark:text-gray-300">Équipe : {{ compte.equipe }}</p>
        <button @click.stop="deleteCompte(compte.id)" class="text-white text-sm  bg-[#ee1c1cd8] px-4 py-2 cursor-pointer mt-[2em] rounded-2xl">Supprimer</button>
      </div>
    </div>

    <!-- Modal Ajout / Modification -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 class="text-xl font-bold dark:text-white">
          {{ editingId ? 'Modifier le compte' : 'Nouveau compte' }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="text-sm text-gray-700 dark:text-gray-300">Nom du compte</label>
            <input
              v-model="form.nom"
              type="text"
              placeholder="Nom"
              class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label class="text-sm text-gray-700 dark:text-gray-300">Équipe</label>
            <select
              v-model="form.equipe"
              class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              required
            >
              <option disabled value="">-- Choisir une équipe --</option>
              <option v-for="equipe in equipesDisponibles" :key="equipe" :value="equipe">
                {{ equipe }}
              </option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="resetForm" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Annuler
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {{ editingId ? 'Enregistrer' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
