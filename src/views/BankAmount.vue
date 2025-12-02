<template>
  <div>
    <slot name="account-amount" :amount="currentAmount">
      {{ currentAmount }} €
    </slot>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {useBankStore} from "@/stores/bank.js";

const bankStore = useBankStore()

defineProps({
  currentAmount: {
    type: Number,
    required: true
  }
})

onMounted(()=>{
  bankStore.getAccountAmount(bankStore.currentAccount.number)
})
</script>
