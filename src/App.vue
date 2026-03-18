<script setup lang="ts">
import { ref } from 'vue';
import Dice from './components/Dice.vue'
import FateDraw from './components/FateDraw.vue'
import History from './components/History.vue'
import type { HistoryItem } from './components/History.vue'

const history = ref<HistoryItem[]>([]);

const handleSave = (item: HistoryItem) => {
  history.value = [item, ...history.value.slice(0, 4)];
}
</script>

<template>
  <div class="reset">
    <button @click="history = []" title="重置记录" @mousedown.prevent>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
      </svg>
    </button>
  </div>
  <div class="app-container">
    <FateDraw @save="handleSave" />
    <Dice @save="handleSave" />
    <History :items="history" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: auto;
  max-width: 300px;
  padding-top: 40px;
}

.reset {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.reset button {
  border: 1px solid #eee;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  color: #666;
  outline: none;
  background-color: transparent;
}

@media (hover: hover) {
  .reset button:hover {
    color: #e74c3c;
    transform: rotate(-180deg);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
  }
}

.reset button:active {
  transform: rotate(-180deg) scale(0.95);
  color: #e74c3c;
}
</style>
