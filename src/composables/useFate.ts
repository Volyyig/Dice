import { ref, watch, onMounted } from 'vue';
import { Fate, FateCategory } from '@/types/Fate';
import { fatePool } from '@/data/fatePool';

// Global state to be shared across components
const deck = ref<Fate[]>([]);
const delayedFates = ref<Fate[]>([]);
const drawnFate = ref<Fate | null>(null);
const drawnFateEffectResult = ref('');
const isInitialized = ref(false);

// Shuffle utility
const shuffle = (array: Fate[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j]!, newArray[i]!];
  }
  return newArray;
};

export function useFate() {
  const initializeDeck = (savedDeckNames?: string[]) => {
    if (savedDeckNames && savedDeckNames.length > 0) {
      deck.value = savedDeckNames.map(canonicalName => {
        const entry = fatePool.find(e => e.name === canonicalName);
        return entry ? entry.factory(entry.name) : null;
      }).filter(Boolean) as Fate[];
    } else {
      const newDeck: Fate[] = [];
      fatePool.forEach(entry => {
        for (let i = 0; i < entry.count; i++) {
          newDeck.push(entry.factory(entry.name));
        }
      });
      deck.value = shuffle(newDeck);
    }
  };

  const drawFate = (onSave?: (item: any) => void) => {
    if (deck.value.length === 0) {
      initializeDeck();
    }

    const fate = deck.value.pop();
    if (!fate) return;

    drawnFate.value = fate;
    drawnFateEffectResult.value = fate.onDraw;

    if (fate.category === FateCategory.Instant) {
      fate.effect();
    }

    if (fate.category === FateCategory.Delayed) {
      delayedFates.value.push(fate);
    }

    if (onSave) {
      const now = new Date();
      onSave({
        value: `${fate.title}: ${drawnFateEffectResult.value}`,
        color: fate.category === FateCategory.Delayed ? '#f39c12' : '#3498db',
        time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      });
    }
  };

  const activateDelayedFate = (index: number) => {
    const fate = delayedFates.value[index];
    if (fate) {
      fate.effect();
      delayedFates.value.splice(index, 1);
    }
  };

  // Setup lifecycle hooks only once
  if (!isInitialized.value) {
    const savedDeck = localStorage.getItem('fate_deck');
    const savedDelayed = localStorage.getItem('fate_delayed');

    if (savedDeck) {
      initializeDeck(JSON.parse(savedDeck));
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

    watch(deck, (newDeck) => {
      localStorage.setItem('fate_deck', JSON.stringify(newDeck.map(f => f.name)));
    }, { deep: true });

    watch(delayedFates, (newDelayed) => {
      localStorage.setItem('fate_delayed', JSON.stringify(newDelayed.map(f => f.name)));
    }, { deep: true });

    isInitialized.value = true;
  }

  return {
    deck,
    delayedFates,
    drawnFate,
    drawnFateEffectResult,
    drawFate,
    activateDelayedFate,
    initializeDeck
  };
}
