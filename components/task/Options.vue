<script setup lang="ts">
import type {State, Task} from "~/types";
import {marked} from "marked";
import Checklist from "~/components/task/Checklist.vue";
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

watch(() => task.stateId, () => {
  stateObject.value = storeBoard.get_state_task(task.stateId)
  stateColor.value = storeBoard.get_color(stateObject.value.colorId).code
}, { immediate: true })

const listState: stateInterface[] = [
  ...storeBoard.state_list.map(s => {
    return {
      label: s.label,
      id: s.id
    };
  })
];

interface stateInterface{
  label: string, id: string
}

const completedChecklistItems = computed(() => 
  task.checkList.filter(item => item.state).length
)

const totalChecklistItems = computed(() => 
  task.checkList.length
)

const checklistProgress = computed(() => 
  totalChecklistItems.value > 0 ? (completedChecklistItems.value / totalChecklistItems.value) * 100 : 0
)

const deleteCheck = (id: string) => {
  task.checkList = task.checkList.filter(c => c.id != id)
}

const addCheck = () => {
  task.checkList.push({
    id: nanoid(),
    content: "Nouvelle tâche",
    state: false
  })
}

</script>


<template>
  <Teleport to="body">
    <!-- Overlay -->
    <div 
      @click="emit('close')" 
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
    ></div>
    
    <!-- Modal -->
    <div class="fixed inset-0 z-20 flex items-center justify-center p-4">
      <UCard class="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-600/50 shadow-2xl">
        <!-- Header -->
        <div class="flex items-start justify-between mb-6">
          <div class="flex-1 space-y-4">
            <!-- Title and Status -->
            <div class="flex items-center gap-4">
              <UInput
                v-model="task.title"
                size="lg"
                variant="ghost"
                class="text-2xl font-bold flex-1"
                placeholder="Titre de la tâche"
              />
                <USelect
                    v-model="task.stateId"
                    :items="listState"
                    value-key="id"
                    size="sm"
                    :ui="{
                      content: 'z-[9999]'
                    }"
                  />
            </div>
            
            <!-- Location -->
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <UIcon name="i-heroicons-rectangle-stack" class="w-4 h-4" />
              <span>Dans <span class="font-medium text-gray-700 dark:text-gray-300">{{ nameCol }}</span></span>
            </div>
          </div>
          
          <!-- Close Button -->
          <UButton
            icon="i-heroicons-x-mark"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="emit('close')"
          />
        </div>

        <!-- Content -->
        <div class="space-y-6">
          <!-- Description -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Description :</h3>
              <UButton
                @click="editContent = !editContent"
                variant="ghost"
                color="neutral"
                size="sm"
                :icon="editContent ? 'i-heroicons-eye' : 'i-heroicons-pencil-square'"
              >
                {{ editContent ? 'Aperçu' : 'Modifier' }}
              </UButton>
            </div>
            
            <UTextarea
              v-if="editContent"
              v-model="task.content"
              placeholder="Ajoutez une description..."
              :rows="4"
              class="resize-none w-full"
            />
            <div 
              v-else 
              class="prose prose-sm max-w-none p-4 border border-gray-200/60 dark:border-gray-600/60 rounded-lg bg-gray-50/80 dark:bg-gray-700/80 min-h-[100px] dark:prose-invert"
              v-html="marked.parse(task.content || '*Aucune description*')"
            />
          </div>

          <!-- Checklist -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Checklist :</h3>
              <UButton
                @click="addCheck"
                color="primary"
                variant="ghost"
                size="sm"
                icon="i-heroicons-plus"
              >
                Ajouter
              </UButton>
            </div>

            <!-- Progress Bar -->
            <div v-if="task.checkList.length > 0" class="space-y-2">
              <div class="flex items-center justify-between text-sm text-gray-600">
                <span>{{ completedChecklistItems }} / {{ totalChecklistItems }} terminées</span>
                <span class="font-medium">{{ Math.round(checklistProgress) }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300"
                  :class="checklistProgress === 100 ? 'bg-green-500' : 'bg-blue-500'"
                  :style="{ width: `${checklistProgress}%` }"
                />
              </div>
            </div>

            <!-- Checklist Items -->
            <div class="space-y-2">
              <Checklist 
                v-for="check in task.checkList" 
                :key="check.id"
                :check="check" 
                @delete-check="deleteCheck($event)" 
              />
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-6 mt-6 border-t border-gray-100/60 dark:border-gray-700/60">
          <UButton
            color="error"
            variant="ghost"
            icon="i-heroicons-trash"
            @click="emit('delete')"
          >
            Supprimer
          </UButton>
          
          <div class="text-right text-xs text-gray-500">
            <p>Créée le</p>
            <p class="font-medium">{{ task.createdAt.toLocaleString("fr-FR") }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </Teleport>
</template>

<style scoped>
.bg-state{
  background: v-bind(stateColor);
}
select{
  outline: none;
}
</style>