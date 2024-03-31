<script setup lang="ts">
import type {State, Task} from "~/types";

const optionTask = ref<boolean>(false)
const storeBoard = useBoard()


const { task } = defineProps<{
  task: Task
}>()

const stateObject = ref<State>(storeBoard.get_state_task(task.stateId))
const stateColor = ref<string>(storeBoard.get_color(stateObject.value.colorId).code)

watch(storeBoard.columns_list, () => {
  stateObject.value = storeBoard.get_state_task(task.stateId)
  stateColor.value = storeBoard.get_color(stateObject.value.colorId).code
})

function truncate(value: string){
  if (value.length <= 28) {
    return value;
  } else {
    return value.substring(0, 28) + '...';
  }
}

</script>

<template>
  <div class="drop-shadow flex flex-col items-start px-4 py-2 my-2 mx-1 rounded-xl task bg-gray-100 relative cursor-pointer"
       @click="optionTask = true"
       :title="task.id"
       tabindex="0"
  >
    <div
        class="text-sm px-2 rounded text-white bg-state"
    >
      {{stateObject.name }}
    </div>
    <header class="flex gap-1 items-center">
      <span>{{ truncate(task.title) }}</span>
    </header>
    <template v-if="optionTask">
      <OptionTask
          :task="task"
          @close="optionTask=false"
          @delete="storeBoard.delete_task(task.id)"
      />
    </template>
  </div>
</template>

<style>
.bg-state{
  background: v-bind(stateColor);
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