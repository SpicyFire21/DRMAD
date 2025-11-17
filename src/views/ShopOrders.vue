<template>
  <div class="shop-orders">
    <h2>Commandes passées</h2>

    <table v-if="orders.length" class="orders-table">
      <thead>
      <tr>
        <th>Montant</th>
        <th>Statut</th>
        <th>Actions</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="order in orders" :key="order.uuid">
        <td>{{ order.total.toFixed(2) }} €</td>
        <td>
            <span
                class="status"
                :class="{
                waiting: order.status === 'waiting_payment',
                done: order.status === 'finalized',
                canceled: order.status === 'canceled'
              }"
            >
              {{ order.status }}
            </span>
        </td>
        <td>
          <button
              v-if="order.status === 'waiting_payment'"
              class="btn primary"
              @click="pay(order.uuid)"
          >
            Payer
          </button>
          <button
              v-if="order.status === 'waiting_payment'"
              class="btn danger"
              @click="cancel(order.uuid)"
          >
            Annuler
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <p v-else class="empty-message">Aucune commande trouvée.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shop.js'
import ShopService from '@/services/shop.service.js'

const store = useShopStore()
const router = useRouter()

const orders = ref([])

onMounted(async () => {
  const response = await ShopService.getOrdersByUser(store.shopUser._id)
  orders.value = response?.data || response || []
})

function pay(orderUuid) {
  router.push(`/shop/pay/${orderUuid}`)
}

async function cancel(orderUuid) {
  await ShopService.cancelOrder(orderUuid)
}
</script>

<style scoped>
.shop-orders {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  margin: 40px auto;
}

h2 {
  margin-bottom: 16px;
  color: #333;
  font-size: 20px;
  border-bottom: 2px solid #0078d7;
  padding-bottom: 6px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid #ddd;
}

.orders-table th {
  background-color: #f3f6f9;
}

.status {
  padding: 4px 10px;
  border-radius: 5px;
  font-weight: 600;
  text-transform: capitalize;
}

.status.waiting {
  background-color: #fff3cd;
  color: #856404;
}

.status.done {
  background-color: #d4edda;
  color: #155724;
}

.status.canceled {
  background-color: #f8d7da;
  color: #721c24;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn.primary {
  background-color: #0078d7;
  color: white;
}

.btn.primary:hover {
  background-color: #005fa3;
}

.btn.danger {
  background-color: #dc3545;
  color: white;
  margin-left: 6px;
}

.btn.danger:hover {
  background-color: #b02a37;
}

.empty-message {
  text-align: center;
  color: #666;
  margin-top: 20px;
  font-style: italic;
}
</style>
