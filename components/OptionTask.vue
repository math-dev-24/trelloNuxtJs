<script setup lang="ts">
import type {State, Task} from "~/types";

const emit = defineEmits<{
  (e: "close") :void;
  (e: "delete"): void;
}>()

const { task } = defineProps<{
  task: Task;
}>()
const storeBoard = useBoard()

const stateObject = ref<State>(storeBoard.get_state_task(task.stateId))
const stateColor = ref<string>(storeBoard.get_color(stateObject.value.colorId).code)

watch(task, () => {
  stateObject.value = storeBoard.get_state_task(task.stateId)
  stateColor.value = storeBoard.get_color(stateObject.value.colorId).code
})


</script>


<template>
  <teleport to="body">
    <div
        id="content"
        class="flex flex-col gap-2 absolute top-0 translate-y-full left-[30%] w-[30%] z-10 bg-white border p-4 rounded-xl drop-shadow"
    >
      <select v-model="task.stateId" class="w-full pl-6 py-1 font-bold rounded mb-4 text-white bg-state">
        <option v-for="state in storeBoard.state_list" :key="state.id" :value="state.id">{{state.name}}</option>
      </select>
      <input @keyup.enter="emit('close')" type="text" v-model="task.title" class="rounded px-2 py-1 text-xl bg-slate-100 focus:bg-slate-100">
      <textarea v-model="task.content" class="bg-slate-100" />
      <div class="flex flex-row items-center">
        <button @click="emit('delete')" class="p-1 mt-2 hover:text-red-500 hover:bg-slate-100 p-1 rounded w-[30px] transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm1 2H6v12h12zm-9 3h2v6H9zm4 0h2v6h-2zM9 4v2h6V4z"/></svg>
        </button>
        <div class="text-xs flex-1 text-end">
          <p>Créée le</p>
          <p>{{task.createdAt.toLocaleString("fr-FR")}}</p>
        </div>
      </div>
    </div>
    <div @click="emit('close')" class="absolute top-0 left-0 z-0 h-full w-full bg-slate-300 opacity-60"></div>
  </teleport>
</template>

<style scoped>
.bg-state{
  background: v-bind(stateColor);
}
select{
  @apply outline-none;
}
</style>