<script setup lang="ts">
import { useBoard } from "~/stores/Board";

const storeBoard = useBoard()
const isOpen = ref<boolean>(false)

defineShortcuts({
  "cmd+g": () => isOpen.value = !isOpen.value,
  "ctrl+g": () => isOpen.value = !isOpen.value,
  "g": () => isOpen.value = !isOpen.value,
})
</script>

<template>
  <UModal
    title="Gestion des statuts"
    :close="{
      variant: 'subtle',
      class: 'rounded-full'
    }"
    v-model:open="isOpen"
  >
    <UButton
      icon="i-heroicons-cog-6-tooth"
      variant="ghost"
      color="neutral"
      size="xs"
      label="Gérer les statuts"
    />
    <template #body>
    <div class="space-y-4">
      <div class="space-y-3">
        <template v-for="(state, index) in storeBoard.state_list" :key="state.id">
          <div class="flex items-center gap-3 p-3 rounded-lg border border-gray-200/60 dark:border-gray-600/60 hover:border-gray-300 dark:hover:border-gray-500 transition-colors bg-gray-50/50 dark:bg-gray-700/50">
            <div class="flex-1">
              <UInput
                v-model="state.label"
                placeholder="Nom du statut"
                variant="outline"
                size="sm"
                class="border-0 bg-transparent focus:bg-gray-50"
              />
            </div>
            
            <div class="flex items-center gap-2">
              <USelect
                v-model="state.colorId"
                :items="storeBoard.color_list"
                value-key="id"
                size="sm"
                variant="outline"
                class="w-32"
              />
               <UButton
                 v-if="state.id !== storeBoard.state_list[0].id"
                 icon="i-heroicons-trash"
                 color="error"
                 variant="ghost"
                 size="sm"
                 @click="storeBoard.delete_state(state.id)"
                 class="text-red-500 hover:text-red-700 hover:bg-red-50"
               />
            </div>
          </div>
        </template>
      </div>
      <div class="pt-2">
        <UButton
          icon="i-heroicons-plus"
          variant="ghost"
          color="neutral"
          @click="storeBoard.add_state()"
          class="w-full border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
        >
          Ajouter un statut
        </UButton>
      </div>
    </div>
    </template>
  </UModal>
</template>
