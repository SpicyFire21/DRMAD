<template>
  <div class="shop-pay">
    <h1>Paiement de la commande</h1>
    <div class="form">
      <label for="uuid">UUID de la commande :</label>
      <input
          id="uuid"
          v-model="uuid"
          size="40"
          placeholder="Entrez l'UUID de la commande"
      />

      <label for="trans">UUID de la transactions :</label>
      <input
          id="trans"
          v-model="transaction"
          size="40"
          placeholder="Entrez l'UUID de la transactions"
      />
      <button @click="pay">Payer</button>
      <div v-if="currentCommand">
        <b>Total : {{ currentCommand.total }} €</b>
        <p>Total : {{ currentCommand.date }} </p>


      </div>
    </div>

    <p v-if="message" class="alert-error">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ShopService from '@/services/shop.service'
import { useShopStore } from "@/stores/shop.js";

const route = useRoute();
const router = useRouter();
const store = useShopStore();

const currentCommand = ref(null)
const uuid = ref("");
const transaction = ref("");
const message = ref("");

onMounted(async () => {
  if (route.params.orderId) {
    uuid.value = route.params.orderId;
  }
  let res = await ShopService.getOrder({
    userId: store.shopUser._id,
    uuid: uuid.value,
  });

  currentCommand.value = res.data
});

async function pay() {
  if (!uuid.value) {
    message.value = "Veuillez saisir un UUID de commande.";
    return;
  }

  if (!transaction.value) {
    message.value = "Veuillez saisir un UUID d'une transactions.";
    return;
  }

  let response = await ShopService.getOrder({
    userId: store.shopUser._id,
    uuid: uuid.value,
  });

  if (response.error !== 0) {
    message.value = "Commande introuvable.";
    return;
  }

  let payResponse = await ShopService.payOrder({
    userId: store.shopUser._id,
    uuid: uuid.value,
    transactionUuid:transaction.value
  });

  if (payResponse.error === 0) {
    message.value = "Commande payée avec succès !";
    await router.push("/shop/orders");
  } else {
    message.value = payResponse.data;
  }
}
</script>
