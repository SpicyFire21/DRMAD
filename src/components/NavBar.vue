<template>
  <div>
    <button
        v-for="(link, index) in links"
        :key="index"
        @click="goTo(link.label,link.to)"
    >
      <slot
          name="nav-button"
          :label="link.label"
      >
        {{ link.label }}
      </slot>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import {useShopStore} from "@/stores/shop.js";

const router = useRouter()
const shopStore = useShopStore()

defineProps({
  links: Array
})

function goTo(label,to) {
  if (label === "logout"){
    shopStore.shopLogout();
  }
  router.push(to)
}
</script>
