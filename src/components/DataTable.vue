<template>
  <div>
    <table>
      <thead>
      <tr>

        <th v-if="itemCheck">select.</th>

        <th v-for="(h, i) in headers" :key="i">{{ h.label }}</th>

        <th v-if="itemButton">actions</th>

      </tr>
      </thead>

      <tbody>
      <tr v-for="(item, idx) in items" :key="idx">

        <td v-if="itemCheck">
          <input type="checkbox" v-model="selectedItems" :value="item" />
        </td>

        <td v-for="(h, i) in headers" :key="i">
        <p v-if="h.name === 'date'">
          {{ formatDate(item.date.$date) }}
        </p>

        <p v-else>
          {{ item[h.name] }}
        </p>
      </td>


        <td v-if="itemButton">
          <button @click="emitItem(item)">
            <slot name="item-button">Action</slot>
          </button>
        </td>

      </tr>
      </tbody>
    </table>

    <button
        v-if="tableButton"
        @click="emitTable"
    >
      <slot name="table-button">Valider</slot>
    </button>

  </div>
</template>

<script setup>
import { ref } from "vue"

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const props = defineProps({
  headers: { type: Array, required: true },
  items: { type: Array, required: true },
  itemCheck: { type: Boolean, default: false },
  itemButton: { type: Boolean, default: false },
  tableButton: { type: Boolean, default: false }
})

const emit = defineEmits(["itemClicked", "tableClicked"])

const selectedItems = ref([])

function emitItem(item) {
  emit("itemClicked", item)
}

function emitTable() {
  emit("tableClicked", selectedItems.value)
}
</script>
