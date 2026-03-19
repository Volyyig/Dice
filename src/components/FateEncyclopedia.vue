<template>
  <Transition name="slide-up">
    <div v-if="isOpen" class="encyclopedia-page">
      <div class="header">
        <button class="back-btn" @click="$emit('close')">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回
        </button>
        <h1>命运图鉴</h1>
        <div class="spacer"></div>
      </div>
      
      <div class="content">
        <div class="fate-grid">
          <div v-for="item in items" :key="item.instance.name" class="fate-entry" 
               :class="{ 'type-delayed': item.instance.category === FateCategory.Delayed }">
            <div class="fate-tag">{{ item.instance.category }}</div>
            <div class="fate-count">x{{ item.count }}</div>
            <div class="fate-info">
              <h3>{{ item.instance.name }}</h3>
              <p class="fate-desc">{{ item.instance.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Fate, FateCategory } from '@/types/Fate';

defineProps<{
  isOpen: boolean;
  items: { instance: Fate; count: number }[];
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style scoped>
.encyclopedia-page {
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
  width: 70px;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 40px;
}

.fate-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 10px;
}

.fate-entry {
  background: var(--color-background-soft);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--color-border);
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.fate-entry:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #3498db;
}

.fate-tag {
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  background: #3498db;
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;
  margin-bottom: 12px;
}

.type-delayed .fate-tag {
  background: #f39c12;
}

.fate-count {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--color-background-mute);
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #3498db;
  border: 1px solid var(--color-border);
}

.type-delayed .fate-count {
  color: #f39c12;
}

h3 {
  margin: 0 0 8px 0;
  color: var(--color-heading);
  font-size: 1.2rem;
}

.fate-desc {
  margin: 0;
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.9;
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
