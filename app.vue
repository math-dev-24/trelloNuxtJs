<script setup lang="ts">
const showModalState = ref<boolean>(false)
</script>

<template>
  <main class="py-10 px-5 bg-emerald-700 h-[100vh] overflow-auto">
    <h1 class="text-2xl my-4 text-white font-bold">Trello Board</h1>
    <button
        @click="showModalState=!showModalState"
        class="px-4 py-1 text-white hover:bg-white hover:text-black my-2 border rounded-xl transition duration-200"
    >
      Gestion des status
    </button>
    <TrelloBoard />
    <GestionState @close="showModalState=false" v-if="showModalState" />
  </main>
</template>

<style>
@import "./asset/main.css";
</style>