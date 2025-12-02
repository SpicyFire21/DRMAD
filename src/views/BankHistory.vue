<template>
  <div>

    <h2>
      <slot>Opérations passées</slot>
    </h2>

    <label>
      <input type="checkbox" v-model="filterActive" />
      Filtrer par période
    </label>

    <div v-if="filterActive" style="margin-top: 10px">

      <label>
        Du :
        <input
            type="date"
            v-model="startDate"
            @change="onStartChange"
        />
      </label>

      <label>
        Au :
        <input
            type="date"
            v-model="endDate"
            @change="onEndChange"
        />
      </label>

    </div>

    <DataTable
        :headers="headers"
        :items="filtered"
        itemCheck
        itemButton
        tableButton
        @itemClicked="openOne"
        @tableClicked="openMany"
    >

      <template #item-button>
        Détails
      </template>

      <template #table-button>
        Voir
      </template>
    </DataTable>


  </div>
</template>

<script setup>
import {ref, computed, onMounted} from "vue"
import DataTable from "@/components/DataTable.vue"
import {useBankStore} from "@/stores/bank.js";

const bankStore = useBankStore();



const headers = [
  { label: "montant", name: "amount" },
  { label: "date", name: "date" }]


const filterActive = ref(false)
const startDate = ref("")
const endDate = ref("")


const filtered = computed(() => {
  let list = bankStore.accountTransactions

  if (!filterActive.value) return list

  return list.filter(t => {
    const raw = t.date?.$date ?? t.date
    if (!raw) return false

    const day = String(raw).slice(0, 10)

    if (startDate.value && day < startDate.value) return false
    if (endDate.value && day > endDate.value) return false

    return true
  })
})





const dialogMany = ref("")

function openOne(item) {
    alert(item.uuid)
}

function openMany(arr) {
  dialogMany.value = arr.map(t => t.uuid).join(" — ")
  alert(dialogMany.value)
}

onMounted(async ()=>{
  await bankStore.getTransactions(bankStore.currentAccount.number)
})
</script>
