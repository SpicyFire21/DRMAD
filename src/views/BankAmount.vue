<template>
  <div>
    <slot name="account-amount" :amount="currentAmount">
      {{ currentAmount }} €
    </slot>
  </div>
</template>

<script setup>
defineProps({
  currentAmount: {
    type: Number,
    required: true
  }
})
</script>
