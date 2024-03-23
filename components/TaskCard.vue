<script setup lang="ts">
import type {Task} from "~/types";

const { task } = defineProps<{
  task: Task
}>()

const color = ref<string>('')

onMounted(() => {
  switch (task.state){
    case "En cours":
      color.value = "bg-orange-100"
          break;
    case "Ouvert":
      color.value = "bg-slate-200"
          break;
    case "Terminé":
      color.value = "bg-green-200"
  }
})

</script>

<template>
  <div class="border p-1 m-1 rounded" :class="color" :title="task.createdAt.toLocaleDateString()">
    <h4>{{task.title}}</h4>
    <p class="italic">{{task.state}}</p>
  </div>

</template>