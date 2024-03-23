<script setup lang="ts">

const emit = defineEmits<{
  (e: "delete"): void
}>()
</script>


<template>
  <div class="border bg-gray-300 text-sm py-2 pl-1 pr-4 rounded">
    <ul>
      <li class="text-orange-500 cursor-pointer my-1" @click.prevent="emit('rename')" >Renommer</li>
      <li class="text-red-600 cursor-pointer my-1" @click.prevent="emit('delete')" >Supprimer</li>
    </ul>
  </div>
</template>

<style scoped>
div{
  position: absolute;
  top: 20px;
  right: 0;
}
</style>