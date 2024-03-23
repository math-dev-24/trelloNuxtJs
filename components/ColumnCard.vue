<script setup lang="ts">
import type {Column, Task} from "~/types";
import draggable from "vuedraggable";
import {COLUMNS_DATA} from "~/data/ColumnsData";

const { column } = defineProps<{
  column: Column
}>()

const deleteColumn = () => {
  COLUMNS_DATA.value = COLUMNS_DATA.value.filter(col => col.id != column.id)
  columnOption.value = false
}

const alt = useKeyModifier("Alt")
const columnOption = ref<boolean>(false)

</script>

<template>
  <div class="min-w-[300px] rounded mb-10 border bg-gray-300 p-5 drop-shadow-xl hover:drop-shadow transition duration-500 column">
    <header class="text-xl font-bold mb-4 relative flex">
      <div class=" drag-handle cursor-move">
        <input
            class="bg-transparent focus:bg-white focus:outline-green-400 rounded px-1 w-4/5 title-input"
            v-model="column.title"
            @keyup.enter="($event.target as HTMLInputElement).blur()"
            @keydown.delete="deleteColumn"
            type="text"
        />
      </div>
      <div @focusout="columnOption = false">
        <span @click="columnOption = true" class="cursor-pointer">...</span>
        <OptionColumn v-if="columnOption" @delete="deleteColumn"/>
      </div>
    </header>

    <draggable
        v-model="column.tasks"
        :group="{name: 'tasks', pull: alt ? 'clone' : true}"
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