<template>
  <div>
    <h2>Déconnexion…</h2>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useBankStore } from "@/stores/bank.js"

import { useRouter } from "vue-router"

const bankStore = useBankStore()
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    bankStore.setAccount(null)
    router.push({ path: "/bank/home" })
  }, 1000)
})
</script>
