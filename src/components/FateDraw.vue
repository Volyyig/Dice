<template>
  <div class="draw-section">
    <div class="fate-draw-card" v-fireworks @click="drawFate(onSave)">
      <div class="fate-header">
        <h2>✨命运</h2>
        <div class="deck-info" v-if="deck.length >= 0">
          <span class="count-value">{{ deck.length }} / {{ totalFateCount }}</span>
        </div>
      </div>
    </div>

    <!-- Result Modal -->
    <Transition name="modal-fade">
      <div class="modal-overlay" v-if="drawnFate" @click="closeModal">
        <div class="modal-card" @click.stop
          :class="drawnFate.category === FateCategory.Delayed ? 'type-delayed' : 'type-normal'">
          <div class="card-tag">{{ drawnFate.category }}</div>
          <div class="card-main">
            <h2>{{ drawnFate.title }}</h2>
            <div class="divider"></div>
            <p class="description" v-html="drawnFateEffectResult"></p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { vFireworks } from '@/utils/fireworks';
import { FateCategory } from '@/types/Fate';
import { fatePool } from '@/data/fatePool';
import { useFate } from '@/composables/useFate';
import type { HistoryItem } from './History.vue';

const emit = defineEmits<{
  (e: 'save', item: HistoryItem): void
}>();

const { deck, drawnFate, drawnFateEffectResult, drawFate } = useFate();

const totalFateCount = computed(() => fatePool.reduce((acc, entry) => acc + entry.count, 0));

const onSave = (item: HistoryItem) => emit('save', item);
const closeModal = () => {
  drawnFate.value = null;
};
</script>


<style scoped>
.draw-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.fate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.deck-info {
  display: flex;
  width: fit-content;
  font-size: 0.75rem;
  color: var(--color-text);
  background: var(--color-background-mute);
  padding: 2px 8px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  white-space: nowrap;
}

.count-value {
  font-weight: bold;
  color: #764ba2;
}

.fate-draw-card {
  width: 100%;
  cursor: pointer;
  padding: 8px 12px;
  border: 1px solid #764ba2;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.fate-draw-card:hover {
  border-color: #764ba2;
  box-shadow: 0 2px 8px rgba(118, 75, 162, 0.2);
}

.fate-header h2 {
  margin: 0;
  font-size: 1.1rem;
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .fate-header h2 {
    font-size: 0.95rem;
  }
  .deck-info {
    font-size: 0.7rem;
    padding: 1px 6px;
  }
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background: var(--color-background-soft);
  width: 90%;
  max-width: 320px;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  animation: card-appear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-tag {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.type-normal .card-tag {
  background: #3498db;
}

.type-delayed .card-tag {
  background: #f39c12;
}

.card-main h2 {
  margin-top: 10px;
  color: var(--color-heading);
  font-size: 1.8rem;
}

.divider {
  height: 2px;
  width: 40px;
  background: var(--color-border);
  margin: 15px auto;
}

.description {
  color: var(--color-text);
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 25px;
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
