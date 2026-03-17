<template>
  <div class="fate-draw" v-fireworks @click="drawFate">
    <h3>✨ 命运抽牌</h3>
    <div class="fate-result" v-if="currentFate">
      <span :style="{ color: fateColor }">{{ currentFate }}</span>
    </div>
    <div v-else class="placeholder">点击抽取今日命运</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vFireworks } from '@/utils/fireworks';
import type { HistoryItem } from './History.vue';

const emit = defineEmits<{
  (e: 'save', item: HistoryItem): void
}>();

const fates = [
  "大吉：万事如意，好运连连！",
  "中吉：平和顺利，适合行动。",
  "小吉：微小的确幸即将发生。",
  "末吉：虽有波折，终能化解。",
  "平：波澜不惊，宜静思。",
  "小凶：略有不顺，谨慎行事。",
  "大凶：诸事小心，宜宅家。"
];

const currentFate = ref('');
const fateColor = ref<string>('#42b983');

const drawFate = () => {
  const index = Math.floor(Math.random() * fates.length);
  currentFate.value = <string>fates[index];
  
  // Set color based on fate (simplified)
  if (index <= 2) fateColor.value = '#e74c3c'; // Good luck: Red
  else if (index <= 4) fateColor.value = '#3498db'; // Neutral: Blue
  else fateColor.value = '#95a5a6'; // Less good: Gray

  const now = new Date();
  const item: HistoryItem = {
    value: currentFate.value,
    color: <string>fateColor.value,
    time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  };
  emit('save', item);
};
</script>

<style scoped>
.fate-draw {
  width: 100%;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #666;
}

.fate-result {
  margin-top: 8px;
  font-size: 1.2rem;
  font-weight: bold;
}

.placeholder {
  margin-top: 8px;
  color: #999;
  font-size: 0.9rem;
}
</style>
