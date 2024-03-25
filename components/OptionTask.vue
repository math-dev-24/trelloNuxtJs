<script setup lang="ts">
import type {State, Task} from "~/types";
import {marked} from "marked";

const emit = defineEmits<{
  (e: "close") :void;
  (e: "delete"): void;
}>()

const { task } = defineProps<{
  task: Task;
}>()

const storeBoard = useBoard()
const editContent = ref<boolean>(false)

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
        class="flex flex-col gap-2 absolute top-16 md:left-[10%] lg:left-[20%] md:w-[80%] lg:w-[60%] z-10 bg-white border p-4 rounded-xl drop-shadow"
    >
      <select v-model="task.stateId" class="w-full pl-6 py-1 font-bold rounded mb-4 text-white bg-state">
        <option v-for="state in storeBoard.state_list" :key="state.id" :value="state.id">{{state.name}}</option>
      </select>
      <input @keyup.enter="emit('close')" type="text" v-model="task.title" class="rounded px-2 py-1 text-xl bg-slate-100 focus:bg-slate-100">
      <div class="my-2 flex flex-col gap-4 items-start">
        <button
            class="border hover:bg-slate-100 transition duration-200 rounded py-1 px-2"
            @click="editContent = !editContent"
        >
          <svg v-if="editContent" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="m10 14.312l6.246-6.266q.139-.14.353-.14t.355.139q.14.139.14.354q0 .214-.14.355l-6.389 6.37q-.242.241-.565.241q-.323 0-.565-.242l-2.389-2.37q-.14-.138-.14-.352t.139-.355q.139-.14.354-.14q.214 0 .355.14z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/></svg>
        </button>
        <textarea v-if="editContent" v-model="task.content" class="bg-slate-100 w-full px-2 py-1 border" rows="6" />
        <div v-else id="editor" v-html="marked.parse(task.content)" @click="editContent= true"></div>
      </div>
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