<template>
  <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-colors group">
    <!-- Checkbox -->
    <UCheckbox 
      v-model="check.state" 
      color="primary"
      class="flex-shrink-0"
    />
    
    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div v-if="update" class="flex items-center gap-2">
        <UInput
          v-model="check.content"
          size="sm"
          variant="outline"
          class="flex-1"
          @keydown="handleKeydown"
          autofocus
        />
        <UButton
          @click="update = false"
          color="primary"
          size="xs"
          icon="i-heroicons-check"
        />
        <UButton
          @click="goDelete"
          color="error"
          variant="ghost"
          size="xs"
          icon="i-heroicons-trash"
        />
      </div>
      
      <div 
        v-else 
        @click="update = true"
        class="cursor-pointer text-sm transition-all duration-200"
        :class="{
          'line-through text-gray-400 dark:text-gray-500': check.state,
          'text-gray-900 dark:text-gray-100': !check.state
        }"
      >
        {{ check.content }}
      </div>
    </div>
    
    <!-- Edit Button (visible on hover) -->
    <UButton
      v-if="!update"
      @click="update = true"
      color="neutral"
      variant="ghost"
      size="xs"
      icon="i-heroicons-pencil-square"
      class="opacity-0 group-hover:opacity-100 transition-opacity"
    />
  </div>
</template>

<script setup lang="ts">
import type { CheckList } from "~/types";

const update = ref<boolean>(false)

const { check } = defineProps<{
  check: CheckList
}>()

const emit = defineEmits<{
  (e: 'deleteCheck', id: string): void
}>()

const goDelete = () => {
  check.state = false
  emit('deleteCheck', check.id)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    update.value = false
  } else if (e.key === 'Escape') {
    update.value = false
  }
}
</script>