<script setup lang="ts">
import type {Column, Task} from "~/types";
import draggable from "vuedraggable";
import {useBoard} from "~/stores/Board";

const alt = useKeyModifier("Alt")
const columnOption = ref<boolean>(false)
const storeBoard = useBoard()

const { column } = defineProps<{
  column: Column
}>()

const deleteColumn = () => {
  storeBoard.delete_column(column.id)
  columnOption.value = false
}
const editColumn = () => {
  (document.querySelector('#titleCol') as HTMLInputElement).focus();
  columnOption.value = false;
}
const duplicateColumn = () => {
  storeBoard.duplicate_column(column)
  columnOption.value = false
}


</script>

<template>
  <div class="min-w-[300px] rounded-xl border bg-gray-300 py-2 px-0.5 drop-shadow-xl hover:drop-shadow transition duration-500 column relative">
    <div class=" drag-handle cursor-move h-2 w-full"></div>
    <header class="font-bold mb-4 relative flex">
        <input
            id="titleCol"
            class="bg-transparent focus:bg-white focus:outline-green-400 rounded px-2 title-input ml-2"
            v-model="column.title"
            @keyup.enter="($event.target as HTMLInputElement).blur()"
            type="text"
        />
      <div @focusout="columnOption = false" class="absolute right-2 -top-2">
        <span @click="columnOption = !columnOption" class="cursor-pointer">...</span>
        <OptionColumn
            v-if="columnOption"
            @delete="deleteColumn"
            @hide="columnOption=false"
            @duplicate="duplicateColumn"
            @rename="editColumn"
        />
      </div>
    </header>

    <draggable
        v-model="column.tasks"
        :group="{name: 'tasks', pull: alt ? 'clone' : true}"
        item-key="id"
    >
      <template #item="{element: task}: {element: Task}">
        <div>
          <TaskCard :key="task.id" :name-col="column.title" :task="task" @delete="column.tasks = column.tasks.filter(c => c.id != $event)" />
        </div>
      </template>
    </draggable>
    <footer>
      <NewTask :col-id="column.id" />
    </footer>
  </div>
</template>