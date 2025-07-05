<script setup lang="ts">
import type {ID, Task} from "~/types";
import {nanoid} from "nanoid";
import {useBoard} from "~/stores/Board";


const focused = ref<boolean>(false)
const title = ref<string>("")
const storeBoard = useBoard()
const props = defineProps<{
  colId: ID
}>()

function createTask(e: Event){
  if(title.value.trim()){
    e.preventDefault();
    const new_task: Task = {
      id: nanoid(),
      title: title.value.trim(),
      createdAt: new Date(),
      stateId: storeBoard.state_list[0].id,
      checkList: [],
      content: ""
    }
    storeBoard.add_task(props.colId, new_task)
    title.value = ""
  }
  focused.value = false
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    createTask(e)
  } else if (e.key === 'Escape') {
    focused.value = false
    title.value = ""
  }
}
</script>

<template>
  <div class="space-y-2">
    <!-- Collapsed State -->
    <div v-if="!focused" class="w-full">
      <button
        @click="focused = true"
        class="w-full flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-all duration-200 group"
      >
        <UIcon 
          name="i-heroicons-plus" 
          class="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
        />
        <span class="text-sm font-medium">Ajouter une carte</span>
      </button>
    </div>

    <!-- Expanded State -->
    <div v-else class="space-y-3">
      <UInput
        v-model="title"
        placeholder="Saisissez un titre pour cette carte..."
        class="w-full"
        @keydown="handleKeydown"
        autofocus
      />
      
      <div class="flex items-center gap-2">
        <UButton
          @click="createTask"
          color="primary"
          size="sm"
          icon="i-heroicons-plus"
        >
          Ajouter
        </UButton>
        
        <UButton
          @click="focused = false; title = ''"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark"
        />
      </div>
    </div>
  </div>
</template>