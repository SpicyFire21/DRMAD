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

    <dialog ref="dlgOne">
      {{ dialogOne }}
      <button @click="dlgOne.close()">OK</button>
    </dialog>

    <dialog ref="dlgMany">
      {{ dialogMany }}
      <button @click="dlgMany.close()">OK</button>
    </dialog>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import DataTable from "@/components/DataTable.vue"


const transactions = ref([

])

const headers = [
  { label: "montant", name: "amount" },
  { label: "date", name: "date" },
  { label: "type", name: "type" }
]

const sorted = computed(() =>
    [...transactions.value].sort((a, b) => b.date.localeCompare(a.date))
)

const filterActive = ref(false)
const startDate = ref("")
const endDate = ref("")

function onStartChange() {
  if (endDate.value && startDate.value > endDate.value) {
    endDate.value = ""
  }
}

function onEndChange() {
  if (startDate.value && endDate.value < startDate.value) {
    startDate.value = ""
  }
}

const filtered = computed(() => {
  if (!filterActive.value) {
    return withType(sorted.value)
  }

  let result = sorted.value

  if (startDate.value) {
    result = result.filter(t => t.date >= startDate.value)
  }

  if (endDate.value) {
    result = result.filter(t => t.date <= endDate.value)
  }

  return withType(result)
})

function withType(list) {
  return list.map(t => ({
    ...t,
    type: t.amount < 0 ? "S" : "D"
  }))
}

const dlgOne = ref(null)
const dialogOne = ref("")

const dlgMany = ref(null)
const dialogMany = ref("")

function openOne(item) {
  dialogOne.value = item.uuid
  dlgOne.value.showModal()
}

function openMany(arr) {
  dialogMany.value = arr.map(t => t.uuid).join(" — ")
  dlgMany.value.showModal()
}
</script>
