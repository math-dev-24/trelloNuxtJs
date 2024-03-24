<script setup lang="ts">
import type {Task} from "~/types";
import {LIST_STATE, type State} from "~/data/StateData";
import {COLUMNS_DATA} from "~/data/ColumnsData";

const emit = defineEmits<{
  (e: "update", payload: Partial<Task>): void
}>()

const optionTask = ref<boolean>(false)


const { task } = defineProps<{
  task: Task
}>()

const stateObject = ref<State>(getState(task.stateId))


function getState (id: string){
  return LIST_STATE.filter(s => s.id == id)[0]
}

watch(task, () => {
  stateObject.value = getState(task.stateId)
})

const deleteTask = () => {
  COLUMNS_DATA.value.forEach(col => {
    col.tasks = col.tasks.filter(t => t.id !== task.id)
  })
}


</script>

<template>
  <div class="drop-shadow flex flex-col items-start px-4 py-2 my-2 mx-1 rounded-xl task bg-gray-100 relative cursor-pointer"
       @click="optionTask = true"
       :title="task.id"
       tabindex="0"
  >
    <div
        class="text-sm px-2 rounded text-white"
        :class="`bg-${stateObject.color}`"
    >
      {{stateObject.name}}
    </div>
    <header class="flex gap-1 items-center">
      <span>{{ task.title }}</span>
    </header>
    <template v-if="optionTask">
      <OptionTask
          :task="task"
          @close="optionTask=false"
          @delete="deleteTask"
      />
    </template>
  </div>
</template>

<style>
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