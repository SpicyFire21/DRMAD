<template>
  <div>

    <h2>
      <slot name="title">Débit / Virement</slot>
    </h2>

    <div>
      <label>Montant :</label>
      <input type="number" v-model.number="amount" />
    </div>

    <div>
      <label>
        <input type="checkbox" v-model="hasReceiver" />
        Destinataire
      </label>
    </div>

    <div v-if="hasReceiver">
      <label>ID destinataire :</label>
      <input type="text" v-model="receiver" />
    </div>

    <button @click="validateOperation">Valider</button>

    <p v-if="successMessage">{{ successMessage }}</p>

    <dialog ref="errorDialog">
      <p>{{ errorMessage }}</p>
      <button @click="closeError">OK</button>
    </dialog>

  </div>
</template>

<script setup>
import { ref } from "vue"
import { useBankStore } from "@/stores/bank.js"

const bankStore = useBankStore()

const amount = ref(0)
const hasReceiver = ref(false)
const receiver = ref("")

const successMessage = ref("")
const errorMessage = ref("")
const errorDialog = ref(null)

function validateOperation() {
  if (amount.value <= 0) {
    triggerError("Montant invalide")
    return
  }

  if (hasReceiver.value && receiver.value.trim() === "") {
    triggerError("Destinataire manquant")
    return
  }

  const response = bankStore.makeOperation({
    amount: amount.value,
    receiver: hasReceiver.value ? receiver.value : null
  })

  if (response.ok === false) {
    triggerError(response.error)
    return
  }

  successMessage.value = `L'opération est validée avec le n° : ${response.uuid}. Vous pouvez la retrouver dans l'historique`

  setTimeout(() => {
    successMessage.value = ""
  }, 5000)
}

function triggerError(msg) {
  errorMessage.value = msg
  errorDialog.value.showModal()
}

function closeError() {
  errorDialog.value.close()
}
</script>
