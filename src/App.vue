<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import Dice from './components/Dice.vue'
import FateDraw from './components/FateDraw.vue'
import DelayedFates from './components/DelayedFates.vue'
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

const encyclopediaItems = computed(() => fatePool.map(entry => ({
  instance: entry.factory(entry.name),
  name: entry.name,
  description: entry.description,
  count: entry.count
})));

const handleSave = (item: HistoryItem) => {
  history.value = [item, ...history.value.slice(0, 500)]; // All history
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
  
  // Force a reload to reset component internal states (like useFate)
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
    <header class="app-header">
      <button class="menu-btn" @click="toggleSidebar">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      
      <div class="header-right">
        <FateDraw @save="handleSave" />
      </div>
    </header>

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
      :items="encyclopediaItems"
      @close="isEncyclopediaOpen = false"
    />

    <main class="game-main">
      <div class="dice-section">
        <Dice @save="handleSave" />
      </div>
      <div class="delayed-section">
        <DelayedFates />
      </div>
    </main>
    
    <History :items="history.slice(0, 10)" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: auto;
  max-width: 900px; /* Increased to accommodate sidebar */
  padding: 70px 20px 20px 20px;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
}

.app-header {
  position: absolute;
  top: 1rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 100;
}

.header-right {
  max-width: 220px; /* Slightly wider for safety */
  width: 100%;
}

.menu-btn {
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
}

.menu-btn:hover {
  background: var(--color-background-mute);
  border-color: #3498db;
  color: #3498db;
}

.game-main {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
}

.dice-section {
  flex: 0 0 320px; /* Fixed width for dice area */
}

.delayed-section {
  flex: 1;
  min-width: 240px;
}

@media (max-width: 768px) {
  .game-main {
    flex-direction: column;
    align-items: center;
  }
  
  .dice-section, .delayed-section {
    width: 100%;
    flex: none;
  }
  
  .header-right {
    max-width: 180px;
  }
}
</style>
