<script setup lang="ts">
import draggable from "vuedraggable";
import type { Column } from "~/types";
import { nanoid } from "nanoid";
import { useBoard } from "~/stores/Board";

const storeBoard = useBoard()

const createColumn = () => {
  const column: Column = {
    title: "Nouvelle liste",
    id: nanoid(),
    tasks: []
  };
  storeBoard.add_column(column)
  nextTick(() => {
    (document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus();
  })
}
</script>

<template>
  <div class="h-[calc(100vh-4rem)] py-4 px-2">
    <div class="mx-auto w-[99%] h-full">
      <!-- Board Container - Optimisé pour l'espace -->
      <div class="flex items-start gap-3 h-full overflow-x-auto pb-4">
        <!-- Draggable Columns -->
        <draggable
          v-model="storeBoard.columns_list"
          group="columns"
          :animation="200"
          handle=".drag-handle"
          item-key="id"
          class="flex gap-3 items-start min-w-max h-full"
        >
          <template #item="{ element: column }: { element: Column }">
            <ColumnCard :key="column.id" :column="column" />
          </template>
        </draggable>

        <!-- Add Column Button - Compact -->
        <div class="min-w-72 flex-shrink-0">
          <UCard 
            class="h-fit border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-lg p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
          >
            <button
              @click="createColumn"
              class="w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors group"
            >
              <div class="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 flex items-center justify-center transition-colors">
                <UIcon 
                  name="i-heroicons-plus" 
                  class="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                />
              </div>
              <span class="text-sm font-medium">Ajouter une liste</span>
            </button>
          </UCard>
        </div>
      </div>

      <!-- Empty State - Compact -->
      <div v-if="storeBoard.columns_list.length === 0" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <UIcon name="i-heroicons-rectangle-stack" class="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Commencez par créer votre première liste</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">Organisez vos tâches en colonnes pour une meilleure productivité</p>
        <UButton
          @click="createColumn"
          color="primary"
          size="md"
          icon="i-heroicons-plus"
        >
          Créer ma première liste
        </UButton>
      </div>
    </div>
  </div>
</template>