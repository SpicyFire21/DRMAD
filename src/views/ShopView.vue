<template>
  <div>
    <h1>Boutique</h1>
    <NavBar :links="navbtn" v-if="!shopStore.shopUser"/>
    <NavBar :links="navbtn2" v-if="shopStore.shopUser"/>
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
  {label: "login",to:"/shop/login" }
]

const navbtn2 = [
  {label: "buy", to:"/shop/buy"},
  {label: "pay", to:"/shop/pay"},
  {label: "orders",to:"/shop/orders"},
  {label:"logout",to:"/shop"}

]
</script>

<style scoped>

</style>