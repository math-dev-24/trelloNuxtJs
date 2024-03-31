<template>

  <UCheckbox v-model="check.state" color="indigo">
    <template #label>
      <span v-if="update" class="flex gap-2">
        <UInput v-model="check.content" />
        <UButton @click="update=false" size="xs">Enregistrer</UButton>
        <UButton size="xs" variant="outline" @click="goDelete" color="red">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm1 2H6v12h12zm-9 3h2v6H9zm4 0h2v6h-2zM9 4v2h6V4z"/></svg>
        </UButton>
      </span>
      <span @click="update=true" v-else :class="{'line-through text-gray-400': check.state}">
        {{check.content}}
      </span>
    </template>
  </UCheckbox>
</template>

<script setup lang="ts">
import type {CheckList} from "~/types";

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

</script>