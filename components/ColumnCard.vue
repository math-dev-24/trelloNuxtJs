<script setup lang="ts">
import type {Column, Task} from "~/types";
import draggable from "vuedraggable";
import {COLUMNS_DATA} from "~/data/ColumnsData";
import {nanoid} from "nanoid";

const alt = useKeyModifier("Alt")
const columnOption = ref<boolean>(false)

const { column } = defineProps<{
  column: Column
}>()

const deleteColumn = () => {
  COLUMNS_DATA.value = COLUMNS_DATA.value.filter(col => col.id != column.id)
  columnOption.value = false
}
const editColumn = () => {
  (document.querySelector('#titleCol') as HTMLInputElement).focus();
  columnOption.value = false;
}
const duplicateColumn = () => {
  const tasks: Task[] = column.tasks.map(t => {
    return {
      id: nanoid(),
      title: t.title,
      createdAt: new Date(),
      stateId: t.stateId
    }
  })
  const newCol: Column = {
    title: `${column.title}_1`,
    id: nanoid(),
    tasks
  }
  COLUMNS_DATA.value.push(newCol)
  columnOption.value = false
}



</script>

<template>
  <div class="min-w-[300px] rounded-xl border bg-gray-300 py-2 px-0.5 drop-shadow-xl hover:drop-shadow transition duration-500 column relative">
    <header class="font-bold mb-4 relative flex">
      <div class=" drag-handle cursor-move">
        <input
            id="titleCol"
            class="bg-transparent focus:bg-white focus:outline-green-400 rounded px-2 title-input"
            v-model="column.title"
            @keyup.enter="($event.target as HTMLInputElement).blur()"
            @keydown.delete="deleteColumn"
            type="text"
        />
      </div>
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
          <TaskCard :key="task.id" :task="task" @delete="column.tasks = column.tasks.filter(c => c.id != $event)" />
        </div>
      </template>
    </draggable>
    <footer>
      <NewTask @add="column.tasks.push($event)" />
    </footer>
  </div>
</template>