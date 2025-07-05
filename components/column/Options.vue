<script setup lang="ts">
const emit = defineEmits<{
  (e: "delete"): void;
  (e: "hide"): void;
  (e: "duplicate"): void;
  (e: "rename"): void;
}>()

// Fermer le menu quand on clique en dehors
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.option-column')) {
      emit('hide')
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <div 
    class="absolute top-8 right-0 z-[9999] w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-2xl py-2 option-column"
  >
    <div class="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
      <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Actions de la liste</p>
    </div>
    
    <ul class="py-1">
      <li 
        class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        @click="emit('rename')"
      >
        <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
        Renommer
      </li>
      
      <li 
        class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        @click="emit('duplicate')"
      >
        <UIcon name="i-heroicons-document-duplicate" class="w-4 h-4" />
        Dupliquer
      </li>
      
      <li 
        class="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors"
        @click="emit('delete')"
      >
        <UIcon name="i-heroicons-trash" class="w-4 h-4" />
        Supprimer
      </li>
    </ul>
  </div>
</template>