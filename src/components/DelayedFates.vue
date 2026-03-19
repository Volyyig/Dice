<template>
  <div v-if="delayedFates.length > 0" class="delayed-area" :class="{ 'has-items': delayedFates.length > 0 }">
    <div class="delayed-area-header">
      <h4>⏳ 延时命运</h4>
    </div>
    <div class="delayed-list">
      <div v-for="(fate, index) in delayedFates" :key="fate.name + index" class="delayed-card"
        @click="activateDelayedFate(index)" title="点击激活命运效果">
        <div class="delayed-card-inner">
          <div class="delayed-name">{{ fate.title }}</div>
          <div class="delayed-desc" v-html="fate.onDraw"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFate } from '@/composables/useFate';

const { delayedFates, activateDelayedFate } = useFate();
</script>

<style scoped>
.delayed-area {
  width: 100%;
  padding: 15px;
  background: var(--color-background-mute);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  min-height: 80px;
  box-sizing: border-box;
}

.delayed-area-header {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

h4 {
  margin: 0;
  font-size: 1rem;
  color: #764ba2;
  text-align: left;
}

.delayed-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.delayed-card {
  background: var(--color-background);
  border-radius: 8px;
  padding: 10px 14px;
  border-left: 4px solid #f39c12;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;
  flex: 1 1 160px;
  max-width: 240px;
  text-align: left;
}

.delayed-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.delayed-name {
  font-weight: bold;
  font-size: 0.95rem;
  color: var(--color-heading);
}

.delayed-desc {
  font-size: 0.8rem;
  color: var(--color-text);
  margin-top: 4px;
}
</style>
