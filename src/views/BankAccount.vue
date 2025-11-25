<template>
  <div class="bank-container">
    <h1>💰 Solde Bancaire</h1>

    <div class="form-group">
      <label for="account-number">Numéro de compte</label>
      <input
          id="account-number"
          v-model="number"
          type="text"
          placeholder="FR1234...-1234567"
          required
      />
    </div>

      <button :disabled="!validNumber" @click="valid">Valider</button>


    <div v-if="bankStore.accountNumberState === -1" class="error">
      ⚠️ Numéro de compte erroné.
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useBankStore } from "@/stores/bank.js";

const number = ref("");
const bankStore = useBankStore();

const validNumber = computed(() =>
    /^[A-Za-z0-9]{22}-\d{7}$/.test(number.value)
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const valid = () => {

};
</script>

