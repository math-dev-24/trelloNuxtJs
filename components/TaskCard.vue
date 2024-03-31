<script setup lang="ts">
import type {State, Task} from "~/types";

const optionTask = ref<boolean>(false)
const storeBoard = useBoard()


const { task } = defineProps<{
  task: Task,
  nameCol: string
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
    <footer>
      <div
          v-if="task.checkList.length > 0"
          class="flex gap-1 items-center text-gray-500"
          :class="{'bg-green-700 text-white px-1 py-0.5 rounded' : task.checkList.filter(s => s.state).length == task.checkList.length}">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 16 16"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2M10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4z"/><path d="M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm6.585 1.08a.75.75 0 0 1 .336 1.005l-1.75 3.5a.75.75 0 0 1-1.16.234l-1.75-1.5a.75.75 0 0 1 .977-1.139l1.02.875l1.321-2.64a.75.75 0 0 1 1.006-.336"/></g></svg>
        <span class="text-xs">{{task.checkList.filter(s => s.state).length}} / {{task.checkList.length}}</span>
      </div>
    </footer>
    <template v-if="optionTask">
      <OptionTask
          :task="task"
          :name-col="nameCol"
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