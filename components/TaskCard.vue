<script setup lang="ts">
import type {Task, ID} from "~/types";

const {task} = defineProps<{
  task: Task
}>()

const focused = ref<boolean>(false)

const emit = defineEmits<{
  (e: "delete", payload: ID): void
}>()

onKeyStroke("Backspace", (e) => {
  if(focused.value) emit('delete', task.id)
})

</script>

<template>
  <div class="border border-gray-300 p-2 m-1 rounded task border-l-8 bg-gray-200"
       :class="{
        'border-l-orange-400' : task.state == 'En cours',
        'border-l-gray-800' : task.state == 'Ouvert',
        'border-l-green-600' : task.state == 'Terminé'
       }"
       :title="task.id"
       @focus="focused = true"
       @blur="focused = false"
       tabindex="0"
  >
    <header class="flex gap-1 items-center">
      <span>{{ task.title }}</span>
    </header>
    <p class="italic">{{ task.state }}</p>
  </div>

</template>

<style>
.task:focus,
.task:focus-visible{
  @apply outline-gray-400 !important;
  outline: gray auto 1px;
}

.sortable-drag .task{
  transform: rotate(5deg);
}
.sortable-ghost .task{
  position: relative;
}
.sortable-ghost .task::after{
  content: "";
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}
</style>