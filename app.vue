<script setup lang="ts">
// Gestion du thème
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <!-- Header Compact -->
      <header class="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Trello Board</h1>
              <GestionState />
            </div>
            
            <!-- Theme Toggle -->
            <UButton
              @click="toggleTheme"
              color="neutral"
              variant="ghost"
              size="sm"
              :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            />
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1">
        <TrelloBoard />
      </main>
      


    </div>
  </UApp>
</template>
