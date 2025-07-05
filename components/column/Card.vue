<script setup lang="ts">
import type {Column, Task} from "~/types";
import draggable from "vuedraggable";
import {useBoard} from "~/stores/Board";

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
  <UCard class="min-w-[280px] max-w-[280px] h-fit bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-600/60 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-xl column shadow-sm">
    <!-- Drag Handle -->
    <div class="drag-handle cursor-move h-1 w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-500 to-transparent rounded-full mb-2 hover:from-gray-400 hover:via-gray-500 dark:hover:from-gray-400 dark:hover:via-gray-400 hover:to-gray-400 transition-all duration-200" />
    
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex-1">
        <UInput
          id="titleCol"
          v-model="column.title"
          variant="ghost"
          size="sm"
          class="font-semibold text-gray-900 title-input"
          placeholder="Nom de la liste"
          @keyup.enter="($event.target as HTMLInputElement).blur()"
        />
      </div>
      
      <!-- Options Menu -->
      <div class="relative">
        <UButton
          icon="i-heroicons-ellipsis-horizontal"
          color="neutral"
          variant="ghost"
          size="xs"
          class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 option-column"
          @click="columnOption = !columnOption"
        />
        <ColumnOptions
          v-if="columnOption"
          @delete="deleteColumn"
          @hide="columnOption = false"
          @duplicate="duplicateColumn"
          @rename="editColumn"
          @close="columnOption = false"
        />
      </div>
    </div>

    <!-- Tasks Container -->
    <div class="space-y-1.5 min-h-[80px]">
      <draggable
        v-model="column.tasks"
        group="tasks"
        item-key="id"
        :animation="150"
        class="space-y-2"
      >
        <template #item="{ element: task }: { element: Task }">
          <TaskCard 
            :key="task.id" 
            :name-col="column.title" 
            :task="task" 
            @delete="column.tasks = column.tasks.filter(c => c.id != $event)" 
          />
        </template>
      </draggable>
    </div>

    <!-- Add Task Button -->
    <div class="mt-3 pt-2 border-t border-gray-100/60 dark:border-gray-700/60">
      <TaskAdd :col-id="column.id" />
    </div>
  </UCard>
</template>