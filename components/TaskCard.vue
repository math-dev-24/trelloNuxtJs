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
  <div class="border p-1 m-1 rounded task"
       :class="{
        'bg-orange-100' : task.state == 'En cours',
        'bg-slate-200' : task.state == 'Ouvert',
        'bg-green-200' : task.state == 'Terminé'
       }"
       :title="task.id"
       @focus="focused = true"
       @blur="focused = false"
       tabindex="0"
  >
    <header class="flex gap-1 items-center">
      <Handle/>
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