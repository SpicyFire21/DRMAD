<template>
  <div class="bank-container">
    <!-- NAVBAR -->
    <NavBar :links="[{label: 'Mon Compte', to: '/bank/account'}]">
      <template #nav-button="{ label }">
        <strong>{{ label }}</strong>
      </template>
    </NavBar>

    <div class="bank-layout">
      <!-- MENU VERTICAL -->
      <VerticalMenu :items="menuItems">
        <template #menu-title="{ label }">
          <span class="menu-title-strong">{{ label }}</span>
        </template>
      </VerticalMenu>

      <!-- CONTENU CENTRAL -->
      <router-view name="bankmain" v-slot="{ Component }">
        <component
            :is="Component"
            :currentAmount="bankStore.accountAmount"
            v-slot:account-amount="{ amount }"
        >
          <!-- Slot account-amount personnalisé -->
          <input
              :value="amount + ' €'"
              :class="amount < 0 ? 'text-red' : 'text-green'"
              readonly
          />
        </component>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue"
import VerticalMenu from "@/components/VerticalMenu.vue"
import { useBankStore } from "@/stores/bank.js"

const bankStore = useBankStore()

const menuItems = [
  { type: "title", label: "Opérations" },
  { type: "link", label: "Solde", to: "/bank/amount" },
  { type: "link", label: "Débit/Virement", to: "/bank/operation" },
  { type: "title", label: "États" },
  { type: "link", label: "Historique", to: "/bank/history" },
]
</script>

<style scoped>
.bank-container { display: flex; flex-direction: column; }
.bank-layout { display: flex; margin-top: 20px; }
.menu-title-strong { font-weight: bold; text-decoration: underline; }
.text-red { color: red; }
.text-green { color: green; }
</style>
