<script setup lang="ts">
import type {Task} from "~/types";
import {nanoid} from "nanoid";

const emit = defineEmits<{
  (e: "add", payload: Task): void
}>()

const focused = ref<boolean>(false)
const title = ref<string>("")

function createTask(e: Event){
  if(title.value.trim()){
    e.preventDefault();
    emit("add", {
      title: title.value.trim(),
      createdAt: new Date(),
      id: nanoid(),
      state: "Ouvert",
      content: ""
    } as Task)
  title.value = ""
  }
}

</script>

<template>
  <div>
    <textarea
        v-model="title"
        @keydown.tab="createTask"
        @keyup.enter="createTask"
        class="w-full"
        :class="{
          'h-7 bg-transparent' : !focused,
          'h-14 p-1': focused
        }"
        @focus="focused = true"
        @blur="focused = false"
        :placeholder="!focused ? ' + Add A Card' : 'Enter a title for this card' "
    />
  </div>
</template>