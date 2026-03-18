<template>
  <Transition name="slide-up">
    <div v-if="isOpen" class="full-history-page">
      <div class="header">
        <button class="back-btn" @click="$emit('close')">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回
        </button>
        <h1>全部历史记录</h1>
        <div class="spacer"></div>
      </div>
      
      <div class="content">
        <div v-if="items.length === 0" class="empty-state">
          暂无历史记录
        </div>
        <History :items="items" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import History from './History.vue';
import type { HistoryItem } from './History.vue';

defineProps<{
  isOpen: boolean;
  items: HistoryItem[];
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style scoped>
.full-history-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-background);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 8px;
  transition: background 0.2s;
}

.back-btn:hover {
  background: var(--color-background-mute);
}

h1 {
  font-size: 1.25rem;
  margin: 0;
  color: var(--color-heading);
}

.spacer {
  width: 70px; /* To balance the back button */
}

.content {
  flex: 1;
  overflow-y: auto;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.empty-state {
  text-align: center;
  color: var(--color-text);
  margin-top: 50px;
  opacity: 0.6;
}

/* Transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
