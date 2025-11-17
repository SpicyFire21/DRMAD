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

    <div class="actions">
      <button :disabled="!validNumber" @click="bankStore.getAccountAmount(number)">
        Voir le solde
      </button>
      <button :disabled="!validNumber" @click="bankStore.getTransactions(number)">
        Voir les transactions
      </button>
      <button class="reset" @click="reset">Réinitialiser</button>
    </div>

    <div v-if="bankStore.accountNumberState === -1" class="error">
      ⚠️ Numéro de compte erroné.
    </div>

    <div v-if="bankStore.accountNumberState === 1" class="results">
      <p class="amount">
        💵 Solde actuel : <strong>{{ bankStore.accountAmount.amount }} €</strong>
      </p>

      <h2>Historique des transactions</h2>
      <ul class="transactions">
        <li
            v-for="(transaction, index) in bankStore.accountTransactions"
            :key="index"
            class="transaction-item"
        >
          <span>{{ transaction.amount }} €</span>
          <small>{{ formatDate(transaction.date.$date) }}</small>
        </li>
      </ul>
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

const reset = () => {
  number.value = "";
};
</script>

<style scoped>
.bank-container {
  background: #1e1e1e;
  color: #f5f5f5;
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  color: #00b894;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #555;
  border-radius: 8px;
  background: #2c2c2c;
  color: #fff;
}

.actions {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

button {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: #00b894;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #00a382;
}

button:disabled {
  background: #444;
  cursor: not-allowed;
}

.reset {
  background: #d63031;
}

.reset:hover {
  background: #b82526;
}

.error {
  background: #ff7675;
  color: #fff;
  text-align: center;
  padding: 0.5rem;
  margin-top: 1rem;
  border-radius: 8px;
}

.results {
  margin-top: 2rem;
}

.amount {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.transactions {
  list-style: none;
  padding: 0;
  border-top: 1px solid #333;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid #333;
}
</style>
