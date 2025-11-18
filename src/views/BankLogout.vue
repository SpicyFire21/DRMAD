<template>
  <div>
    <h2>Déconnexion…</h2>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useBankStore } from "@/stores/bank.js"

import { useRouter } from "vue-router"

const store = useBankStore()
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    store.setAccount(null)
    router.push({ name: "bank-home" })
  }, 1000)
})
</script>
