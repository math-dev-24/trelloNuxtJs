<script setup lang="ts">
import type {ID, Task} from "~/types";
import {nanoid} from "nanoid";
import {LIST_STATE} from "~/data/StateData";
import {useBoard} from "~/stores/Board";


const focused = ref<boolean>(false)
const title = ref<string>("")
const storeBoard = useBoard()
const props = defineProps<{
  colId: ID
}>()

function createTask(e: Event){
  if(title.value.trim()){
    e.preventDefault();
    const new_task: Task = {
      id: nanoid(),
      title: title.value.trim(),
      createdAt: new Date(),
      stateId: storeBoard.state_list[0].id,
      checkList: [],
      content: ""
    }
    storeBoard.add_task(props.colId, new_task)
  title.value = ""
  }
  focused.value = false
}
</script>

<template>
  <div
      class="mt-2 mx-1"
      :class="{
        'cursor-pointer': !focused
      }"
  >
    <textarea
        v-model="title"
        @keyup.enter="createTask"
        @click="focused = true"
        class="w-full outline-none rounded px-4"
        :class="{
          'h-7 bg-transparent cursor-pointer hover:bg-gray-200' : !focused,
          'h-14 px-2 py-1 drop-shadow': focused
        }"
        :placeholder="!focused ? ' + Ajouter une carte' : 'Saisissez un titre pour cette carte...' "
    />
    <template v-if="focused">
      <div class="flex gap-2 items-center">
        <button
            class="px-2 py-1 bg-blue-600 text-white rounded text-sm"
            @click="createTask"
        >
          Ajouter une carte
        </button>
        <div @click.stop="focused = false"
             class="cursor-pointer hover:bg-slate-400 w-6 h-6 flex items-center content-center rounded p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M10.586 12L2.793 4.207l1.414-1.414L12 10.586l7.793-7.793l1.414 1.414L13.414 12l7.793 7.793l-1.414 1.414L12 13.414l-7.793 7.793l-1.414-1.414z"/></svg>
        </div>
      </div>
    </template>
  </div>
</template>