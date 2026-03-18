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
  max-width: 600px;
  padding: 20px;
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
