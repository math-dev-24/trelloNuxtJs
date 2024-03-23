<script setup lang="ts">
import { COLUMNS_DATA } from "~/data/ColumnsData";
import ColumnCard from "~/components/ColumnCard.vue";

</script>


<template>
  <div class="flex gap-4 overflow-x-auto my-16 item-start">
    <ColumnCard v-for="column in COLUMNS_DATA" :key="column.id"  :column="column" />
  </div>
</template>