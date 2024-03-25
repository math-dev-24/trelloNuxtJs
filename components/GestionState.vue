<script setup lang="ts">

import {useBoard} from "~/stores/Board";

const emit = defineEmits<{
  (e: 'close'): void
}>()

const storeBoard = useBoard()

</script>

<template>
  <Teleport to="body">
    <div class="fixed z-0 w-screen h-screen top-0 left-0 bg-slate-100 opacity-55" @click="emit('close')"></div>
    <div class="fixed z-10 bg-gray-100 top-16 left-[25%] w-[50%] py-6 px-8 rounded">
      <h2 class="my-2 text-xl font-bold">Gestion des statuts :</h2>
      <div class="grid grid-cols-2 gap-2 bg-slate-50 rounded-xl p-2">
          <div class="font-bold">Statut :</div>
          <div class="font-bold">Couleur :</div>
        <template v-for="state in storeBoard.state_list" :key="state.id">
          <input v-model="state.name" class="focus:bg-white bg-transparent px-2">
          <div class="flex items-center content-center gap-2">
            <select v-model="state.colorId" class="px-4">
              <option v-for="color in storeBoard.color_list" :key="color.id" :value="color.id">
                {{color.name}}
              </option>
            </select>
            <span class="cursor-pointer hover:bg-slate-400 w-6 h-6 flex items-center content-center rounded p-1" @click="storeBoard.delete_state(state.id)" v-if="state.id != storeBoard.state_list[0].id">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10.586 12L2.793 4.207l1.414-1.414L12 10.586l7.793-7.793l1.414 1.414L13.414 12l7.793 7.793l-1.414 1.414L12 13.414l-7.793 7.793l-1.414-1.414z"/></svg>
            </span>
          </div>
        </template>
      </div>
      <button class="mt-2 mx-4 text-gray-500" @click="storeBoard.add_state()">+ Ajouter un statut</button>
    </div>
  </Teleport>
</template>
