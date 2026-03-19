<template>
  <div class="random-generator" v-fireworks @click="saveToHistory(); generateRandomSample();">
    <h2>🎲 骰子</h2>

    <div class="result-container">
        <span class="result-number" :style="{ color: currentColor }">{{ result ?? '?' }}</span>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { vFireworks } from '@/utils/fireworks';
import type { HistoryItem } from './History.vue';

const emit = defineEmits<{
  (e: 'save', item: HistoryItem): void
}>();

const nums = ref([0, 8, 3, 7, 4, 9, 2, 1, 5, 10, 6, 3, 1, 12, 11, 6, 8, 1, 10, 5, 12, 4, 9, 11, 8, 2, 7, 9, 10, 6, 5, 7, 4, 12, 11, 3, 2]);
const result = ref<number | null>(null);

const colorIndex = ref(-1);
const colors = ['#e74c3c', '#2ecc71', '#3498db'];
const currentColor = computed(() => {
  return colors[(colorIndex.value + colors.length) % colors.length];
});


// 生成随机数的函数
const generateRandomSample = () => {
  colorIndex.value = (colorIndex.value + 1) % colors.length;
  result.value = <number>nums.value[Math.floor(Math.random() * (nums.value.length))];
  // 存入历史记录
  // 注意：仅在内存中保存，调用保存函数后不进行持久化
};

const saveToHistory = () => {
  if (result.value === null || result.value === undefined) return;
  const now = new Date()
  const item: HistoryItem = { value: result.value, color: <string>currentColor.value, time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}` };
  emit('save', item);
}

onMounted(() => {
  const savedResult = localStorage.getItem('dice_result');
  const savedColorIndex = localStorage.getItem('dice_color_index');
  
  if (savedResult !== null && savedColorIndex !== null) {
    result.value = Number(savedResult);
    colorIndex.value = Number(savedColorIndex);
  }
});

watch(result, (newVal) => {
  if (newVal !== null) {
    localStorage.setItem('dice_result', newVal.toString());
  }
});

watch(colorIndex, (newVal) => {
  localStorage.setItem('dice_color_index', newVal.toString());
});
</script>

<style scoped>
.random-generator {
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.result-container {
  /* margin-top: 20px; */
  height: 200px;
}

.result-number {
  font-size: 150px;
  font-weight: bold;
  color: #42b983;
}
</style>