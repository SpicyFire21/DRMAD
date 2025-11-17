<template>
  <div>
    <h1>Boutique</h1>
    <NavBar :titles="navbtn" @menu-clicked="goTo" v-if="!shopStore.shopUser"/>
    <NavBar :titles="navbtn2" @menu-clicked="goTo2" v-if="shopStore.shopUser"/>
    <router-view/>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const shopStore = useShopStore();

const router = useRouter()

import NavBar from "@/components/NavBar.vue";
import {useShopStore} from "@/stores/shop.js";

const navbtn = [
  {text: "login", color: "blue"}
]
function goTo(linkIndex) {
  switch (linkIndex) {
    case 0:
      router.push("/shop/login")
      break
  }
}
const navbtn2 = [
  {text: "buy", color: "blue"},
  {text: "pay", color: "blue"},
  {text: "orders", color: "blue"},
  {text:"logout",color:"blue"}

]
function goTo2(linkIndex) {
  switch (linkIndex) {
    case 0:
      router.push("/shop/buy")
      break
    case 1:
      router.push("/shop/pay")
      break
    case 2:
      router.push("/shop/orders")
      break
    case 3:
      shopStore.shopLogout();
      router.push("/shop")
      break
  }
}
</script>

<style scoped>

</style>