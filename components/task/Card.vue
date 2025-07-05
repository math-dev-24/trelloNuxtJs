<script setup lang="ts">
import type {State, Task} from "~/types";

const optionState = ref<boolean>(false)
const storeBoard = useBoard()


const props = defineProps<{
  task: Task,
  nameCol: string
}>()

const stateObject = ref<State>(storeBoard.get_state_task(props.task.stateId))
const stateColor = ref<string>(storeBoard.get_color(stateObject.value.colorId).code)

watch(() => props.task.stateId, () => {  
  stateObject.value = storeBoard.get_state_task(props.task.stateId)
  stateColor.value = storeBoard.get_color(stateObject.value.colorId).code
}, { immediate: true })

function truncate(value: string){
  if (value.length <= 50) {
    return value;
  } else {
    return value.substring(0, 50) + '...';
  }
}

const completedChecklistItems = computed(() => 
  props.task.checkList.filter(item => item.state).length
)

const totalChecklistItems = computed(() => 
  props.task.checkList.length
)

const checklistProgress = computed(() => 
  totalChecklistItems.value > 0 ? (completedChecklistItems.value / totalChecklistItems.value) * 100 : 0
)

// Fonction pour calculer la couleur de contraste (blanc ou noir)
function getContrastColor(hexColor: string): string {
  // Convertir hex en RGB
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Calculer la luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  // Retourner blanc ou noir selon la luminance
  return luminance > 0.5 ? '#000000' : '#ffffff'
}
</script>

<template>
  <UCard 
    class="task cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200/60 dark:border-gray-600/60 hover:border-gray-300 dark:hover:border-gray-500 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm py-3 px-1 shadow-sm"
    @click="optionState = true"
    :title="task.id"
    tabindex="0"
  >
    <!-- Status Badge -->
    <div class="mb-2">
      <UBadge
        :label="stateObject.label"
        :ui="{
          base: 'font-medium text-xs px-2 py-1'
        }"
        :style="{
          backgroundColor: stateColor,
          color: getContrastColor(stateColor),
          border: `1px solid ${stateColor}`
        }"
      />
    </div>

    <!-- Task Title -->
    <div class="mb-2">
      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
        {{ truncate(props.task.title) }}
      </h3>
    </div>

    <!-- Checklist Progress -->
    <div v-if="props.task.checkList.length > 0" class="space-y-1.5">
      <div class="flex items-center justify-between text-xs text-gray-500">
        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-clipboard-document-check" class="w-3 h-3" />
          <span>{{ completedChecklistItems }} / {{ totalChecklistItems }}</span>
        </div>
        <span class="font-medium">{{ Math.round(checklistProgress) }}%</span>
      </div>
      
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
        <div 
          class="h-1.5 rounded-full transition-all duration-300"
          :class="checklistProgress === 100 ? 'bg-green-500' : 'bg-blue-400 dark:bg-blue-500'"
          :style="{ width: `${checklistProgress}%` }"
        />
      </div>
    </div>

    <!-- Options Modal -->
    <Teleport to="body" v-if="optionState">
      <TaskOptions
        :task="props.task"  
        :name-col="props.nameCol"
        @close="optionState = false"
        @delete="storeBoard.delete_task(props.task.id)"
      />
    </Teleport>
  </UCard>
</template>

<style>
.bg-state{
  background: v-bind(stateColor);
}
.sortable-drag .task{
  transform: rotate(2deg) scale(1.02);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.sortable-ghost .task{
  opacity: 0.5;
  background-color: rgb(203 213 225);
  border: 2px dashed rgb(148 163 184);
}
</style>