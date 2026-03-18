<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Dice from './components/Dice.vue'
import FateDraw from './components/FateDraw.vue'
import History from './components/History.vue'
import SideBar from './components/SideBar.vue'
import FullHistory from './components/FullHistory.vue'
import FateEncyclopedia from './components/FateEncyclopedia.vue'
import { fatePool } from './data/fatePool'
import type { HistoryItem } from './components/History.vue'

const history = ref<HistoryItem[]>([]);
const isSidebarOpen = ref(false);
const isFullHistoryOpen = ref(false);
const isEncyclopediaOpen = ref(false);

const handleSave = (item: HistoryItem) => {
  history.value = [item, ...history.value.slice(0, 49)]; // Limit to 50 items
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const handleReset = () => {
  // Clear all states
  history.value = [];
  localStorage.clear();
  
  // Close sidebar
  isSidebarOpen.value = false;
  
  // Force a reload to reset component internal states (like FateDraw deck)
  window.location.reload();
}

onMounted(() => {
  const savedHistory = localStorage.getItem('dice_history');
  if (savedHistory) {
    history.value = JSON.parse(savedHistory);
  }
});

watch(history, (newHistory) => {
  localStorage.setItem('dice_history', JSON.stringify(newHistory));
}, { deep: true });
</script>

<template>
  <div class="app-container">
    <button class="menu-btn" @click="toggleSidebar">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <SideBar 
      :is-open="isSidebarOpen" 
      @close="isSidebarOpen = false" 
      @reset="handleReset" 
      @open-full-history="isFullHistoryOpen = true"
      @open-encyclopedia="isEncyclopediaOpen = true"
    />

    <FullHistory 
      :is-open="isFullHistoryOpen" 
      :items="history" 
      @close="isFullHistoryOpen = false" 
    />

    <FateEncyclopedia
      :is-open="isEncyclopediaOpen"
      :items="fatePool"
      @close="isEncyclopediaOpen = false"
    />

    <FateDraw @save="handleSave" />
    <Dice @save="handleSave" />
    <History :items="history.slice(0, 5)" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: auto;
  max-width: 600px;
  padding: 60px 20px 20px 20px; /* Added top padding for menu button */
  position: relative;
}

.menu-btn {
  position: absolute;
  top: 0px;
  left: 0px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 100;
}

.menu-btn:hover {
  background: var(--color-background-mute);
  border-color: #3498db;
  color: #3498db;
}

/* SideBar component styles have been moved to SideBar.vue */

.reset button:active {
  transform: rotate(-180deg) scale(0.95);
  color: #e74c3c;
}
</style>
