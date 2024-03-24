<script setup lang="ts">

const emit = defineEmits<{
  (e: "delete"): void;
  (e: "hide"): void;
  (e: "duplicate"):void;
}>()
</script>


<template>
  <div class="border bg-gray-50 py-4 text-sm rounded-xl drop-shadow" @fo="emit('hide')">
    <p class="px-2 mb-4 text-center">Liste des actions</p>
    <ul>
      <li @click="emit('duplicate')">Duppliquer</li>
      <li class="text-red-600" @click="emit('delete')" >Supprimer</li>
    </ul>
  </div>
</template>

<style scoped>
div{
  position: absolute;
  top: 25px;
  right: 0;
  z-index: 100;
  width: 150px;
}
ul > li{
  @apply cursor-pointer px-2 hover:bg-slate-200 py-1 text-xs;
}
</style>