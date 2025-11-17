<template>
  <div>
    <NavBar :titles="navbtn" @menu-clicked="goTo"/>
    <router-view/>
  </div>

</template>

<script setup>
import {onMounted} from "vue";
import {useShopStore} from "@/stores/shop.js";
import NavBar from "@/components/NavBar.vue";
import {useRouter} from "vue-router";

const shopStore = useShopStore()
const router = useRouter()

const navbtn = [
  {text: "Shop", color: "red"},
  {text: "Compte bancaire", color: "green"}
]

function goTo(linkIndex) {
  switch (linkIndex) {
    case 0:
      router.push("/shop")
      break
    case 1:
      router.push("/bank")
      break
  }
}

onMounted(() => {
  shopStore.getAllViruses()
})
</script>

<style scoped></style>
