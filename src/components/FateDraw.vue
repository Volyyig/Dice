<template>
  <div class="fate-container">
    <div class="draw-section">
      <div class="fate-draw-card" v-fireworks @click="drawFate">
        <div class="fate-header">
          <div class="card-content">
            <h2>✨命运</h2>
          </div>
          <div class="deck-info" v-if="deck.length >= 0">
            <span class="count-value">{{ deck.length }} / {{ fatePool.reduce((acc, entry) => acc + entry.count, 0) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Delayed Fates Area (Below) -->
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
import { ref, onMounted, watch } from 'vue';
import { vFireworks } from '@/utils/fireworks';
import { Fate, FateCategory } from '@/types/Fate';
import { fatePool } from '@/data/fatePool';
import type { HistoryItem } from './History.vue';

const emit = defineEmits<{
  (e: 'save', item: HistoryItem): void
}>();

// Fate pool is imported from @/data/fatePool

const deck = ref<Fate[]>([]);
const delayedFates = ref<Fate[]>([]);
const drawnFate = ref<Fate | null>(null);
const drawnFateEffectResult = ref('');

// Shuffle utility
const shuffle = (array: Fate[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j]!, newArray[i]!];
  }
  return newArray;
};

const initializeDeck = (savedDeckNames?: string[]) => {
  if (savedDeckNames && savedDeckNames.length > 0) {
    // Map names back to Fate objects from fatePool factories
    deck.value = savedDeckNames.map(canonicalName => {
      const entry = fatePool.find(e => e.name === canonicalName);
      return entry ? entry.factory(entry.name) : null;
    }).filter(Boolean) as Fate[];
  } else {
    // Instantiate all fates based on their counts and shuffle
    const newDeck: Fate[] = [];
    fatePool.forEach(entry => {
      for (let i = 0; i < entry.count; i++) {
        newDeck.push(entry.factory(entry.name));
      }
    });
    deck.value = shuffle(newDeck);
  }
};

const drawFate = () => {
  if (deck.value.length === 0) {
    initializeDeck();
  }

  const fate = deck.value.pop();
  if (!fate) return;

  drawnFate.value = fate;

  // Get popup message
  drawnFateEffectResult.value = fate.onDraw;

  // If normal, execute effect immediately
  if (fate.category === FateCategory.Instant) {
    fate.effect();
  }

  // If delayed, add to active list
  if (fate.category === FateCategory.Delayed) {
    delayedFates.value.push(fate);
  }

  // Save to history
  const now = new Date();
  const item: HistoryItem = {
    value: `${fate.title}: ${drawnFateEffectResult.value}`,
    color: fate.category === FateCategory.Delayed ? '#f39c12' : '#3498db',
    time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  };
  emit('save', item);
};

const closeModal = () => {
  drawnFate.value = null;
};

const activateDelayedFate = (index: number) => {
  const fate = delayedFates.value[index];
  if (fate) {
    fate.effect();
    delayedFates.value.splice(index, 1);
  }
};

onMounted(() => {
  const savedDeck = localStorage.getItem('fate_deck');
  const savedDelayed = localStorage.getItem('fate_delayed');

  if (savedDeck) {
    const names = JSON.parse(savedDeck) as string[];
    initializeDeck(names);
  } else {
    initializeDeck();
  }

  if (savedDelayed) {
    const names = JSON.parse(savedDelayed) as string[];
    delayedFates.value = names.map(canonicalName => {
      const entry = fatePool.find(e => e.name === canonicalName);
      return entry ? entry.factory(entry.name) : null;
    }).filter(Boolean) as Fate[];
  }
});

// Watch and save state
watch(deck, (newDeck: Fate[]) => {
  const names = newDeck.map((f: Fate) => f.name);
  localStorage.setItem('fate_deck', JSON.stringify(names));
}, { deep: true });

watch(delayedFates, (newDelayed: Fate[]) => {
  const names = newDelayed.map((f: Fate) => f.name);
  localStorage.setItem('fate_delayed', JSON.stringify(names));
}, { deep: true });
</script>


<style scoped>
.fate-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  gap: 20px;
  border: 1px solid #dd00ff;
  border-radius: 12px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* background-color: var(--color-background-soft); */
  position: relative;
  box-sizing: border-box;
}

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
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}

.deck-info {
  display: flex;
  width: fit-content;
  position: absolute;
  right: 0;
  font-size: 0.85rem;
  color: var(--color-text);
  background: var(--color-background-mute);
  padding: 4px 12px;
  border-radius: 20px;
  gap: 8px;
  border: 1px solid var(--color-border);
}

.count-label {
  opacity: 0.7;
}

.count-value {
  font-weight: bold;
  color: #764ba2;
}

.card-back-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image:
    radial-gradient(circle at 20% 30%, white 1px, transparent 1px),
    radial-gradient(circle at 70% 60%, white 1px, transparent 1px),
    radial-gradient(circle at 40% 80%, white 1px, transparent 1px);
  background-size: 40px 40px;
}

.fate-draw-card {
  width: 100%;
}

.card-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.sparkles {
  font-size: 2rem;
  margin-bottom: 4px;
}

h3 {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: 2px;
}

.hint {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 4px;
}

/* Area for Delayed Fates (Below) */
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

/* Animations */
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

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
