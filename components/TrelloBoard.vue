<script setup lang="ts">
import { COLUMNS_DATA } from "~/data/ColumnsData";
import draggable from "vuedraggable";
import type {Column} from "~/types";
import {nanoid} from "nanoid";

const createColumn = () => {
  const column : Column = {
    title: "New Card",
    id: nanoid(),
    tasks: []
  };
  COLUMNS_DATA.value.push(column);
  nextTick(() => {
    (document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus();
  })
}

watch(COLUMNS_DATA, () => {
  // ajax request

}, {
  deep: true
})

</script>


<template>
  <div class="flex items-start gap-4">
    <draggable
        v-model="COLUMNS_DATA"
        group="columns"
        :animation="150"
        handle=".drag-handle"
        item-key="id"
        class="flex gap-4 item-start"
    >
      <template #item="{element: column}: {element: Column}">
        <ColumnCard :key="column.id" :column="column" />
      </template>
    </draggable>
    <button
        @click="createColumn"
        class="bg-gray-200 whitespace-nowrap px-4 py-2 rounded opacity-50"

    >
      + Ajoutez une autre liste
    </button>

  </div>
</template>