<script setup lang="ts">
import type {State, Task} from "~/types";
import {marked} from "marked";
import Checklist from "~/components/Checklist.vue";
import {nanoid} from "nanoid";

const emit = defineEmits<{
  (e: "close") :void;
  (e: "delete"): void;
}>()

const { task, nameCol } = defineProps<{
  task: Task;
  nameCol: string
}>()

const storeBoard = useBoard()
const editContent = ref<boolean>(false)

const stateObject = ref<State>(storeBoard.get_state_task(task.stateId))
const stateColor = ref<string>(storeBoard.get_color(stateObject.value.colorId).code)

watch(task, () => {
  stateObject.value = storeBoard.get_state_task(task.stateId)
  stateColor.value = storeBoard.get_color(stateObject.value.colorId).code
})

let listState: stateInterface[] = []

listState = [
  ...listState,
  ...storeBoard.state_list.map(s => {
    return {
      name: s.name,
      value: s.id
    };
  })
];

interface stateInterface{
  name: string, value: string
}

onMounted(() => resize_progress_bar())
watch(task.checkList, () => {
  resize_progress_bar()
})

function resize_progress_bar(){
  if(task.checkList.length > 0){
    const line = document.getElementById('progress') as HTMLDivElement
    const max = task.checkList.length
    const checked = task.checkList.filter(c => c.state).length
    line.style.width = `${(checked / max) * 100}%`
  }
}


const deleteCheck = (id: string) => {
  task.checkList =  task.checkList.filter(c => c.id != id)
}
const addCheck = () => {
  task.checkList.push({
    id: nanoid(),
    content: "checklist",
    state: false
  })
}

</script>


<template>
  <teleport to="body">
    <div>

    </div>
    <UCard
        id="content"
        class="flex flex-col gap-2 absolute top-16 md:left-[10%] lg:left-[20%] md:w-[80%] lg:w-[60%] z-10 p-4"
    >
      <template #header>
        <div class="h-full bg-state w-2 absolute top-0 left-0 rounded-l-xl"></div>
        <div class="flex gap-4">
          <UInput size="lg" @keyup.enter="emit('close')" type="text" v-model="task.title" class="font-bold flex-1" />
          <USelect size="lg" :options="listState" option-attribute="name" v-model="task.stateId"/>
        </div>
        <span class="text-xs">Dans <span class="font-bold">{{nameCol}}</span></span>
      </template>
      <div class="my-2 flex flex-col gap-4 items-start">
        <UButton @click="editContent = !editContent" variant="soft" color="gray">
          <svg v-if="editContent" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="m10 14.312l6.246-6.266q.139-.14.353-.14t.355.139q.14.139.14.354q0 .214-.14.355l-6.389 6.37q-.242.241-.565.241q-.323 0-.565-.242l-2.389-2.37q-.14-.138-.14-.352t.139-.355q.139-.14.354-.14q.214 0 .355.14z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/></svg>
        </UButton>
        <UTextarea v-if="editContent" v-model="task.content" class="w-full" />
        <div v-else class="border rounded w-full" id="editor" v-html="marked.parse(task.content)" @click="editContent= true"></div>
      </div>
      <UDivider class="my-4" />
      <div class="w-full h-2 overflow-hidden relative rounded mb-4" v-show="task.checkList.length">
        <div class="w-full h-full bg-slate-300 z-0 absolute top-0 left-0"></div>
        <div id="progress" class="h-full bg-green-500 absolute top-0 left-0 z-10"></div>
      </div>
      <div class="space-y-2">
        <h4 class="text-xl font-bold">Checklist</h4>
        <Checklist v-for="check in task.checkList" :check="check" @delete-check="deleteCheck($event)" />
        <UButton variant="soft" color="purple" @click="addCheck">Ajouter</UButton>
      </div>
      <template #footer>
        <div class="flex flex-row items-center">
          <UButton color="red" variant="soft" @click="emit('delete')">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm1 2H6v12h12zm-9 3h2v6H9zm4 0h2v6h-2zM9 4v2h6V4z"/></svg>
          </UButton>
          <div class="text-xs flex-1 text-end">
            <p>Créée le</p>
            <p>{{task.createdAt.toLocaleString("fr-FR")}}</p>
          </div>
        </div>
      </template>
    </UCard>
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