<script setup lang="ts">
import type {Column, Task} from "~/types";
import draggable from "vuedraggable";
import Handle from "~/components/Handle.vue";
import {COLUMNS_DATA} from "~/data/ColumnsData";

const { column } = defineProps<{
  column: Column
}>()

const deleteColumn = () => {
  if(column.title == ""){
    COLUMNS_DATA.value = COLUMNS_DATA.value.filter(col => col.id != column.id)
  }
}

const alt = useKeyModifier("Alt")

</script>

<template>
  <div class="min-w-[300px] rounded mb-10 border bg-gray-200 p-5 drop-shadow-xl hover:drop-shadow transition duration-500 column">
    <header class="text-xl font-bold mb-4">
      <Handle />
      <input
          class="bg-transparent focus:bg-white focus:outline-green-400 rounded px-1 w-4/5 title-input"
          v-model="column.title"
          @keyup.enter="($event.target as HTMLInputElement).blur()"
          @keydown.delete="deleteColumn"
          type="text"
      />
    </header>
    <draggable
        v-model="column.tasks"
        :group="{name: 'tasks', pull: alt ? 'clone' : true}"
        :animation="150"
        handle=".drag-handle"
        item-key="id"
    >
      <template #item="{element: task}: {element: Task}">
        <div>
          <TaskCard :key="task.id" :task="task" @delete="column.tasks = column.tasks.filter(c => c.id != $event)" />
        </div>
      </template>
    </draggable>
    <footer>
      <NewTask @add="column.tasks.push($event)" />
    </footer>
  </div>
</template>