<script setup lang="ts">
import type {Column} from "~/types";

const {column} = defineProps<{
  column: Column
}>()

</script>

<template>
  <div class="min-w-[300px] rounded mb-10 border bg-gray-200 p-5 drop-shadow-xl hover:drop-shadow transition duration-500">
    <h1 class="text-xl font-bold mb-4">{{column.title}}</h1>
    <TaskCard v-for="(task, id) in column.tasks" :key="id" :task="task" />
    <footer>
      <button class="text-gran-300 text-sm font-bold">+ Add a Card</button>
    </footer>
  </div>
</template>