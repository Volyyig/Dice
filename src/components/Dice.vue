<template>
  <div class="random-generator" v-fireworks @click="saveToHistiry(); generateRandomSample();">
    <h2>🎲 骰子</h2>

    <div v-if="result !== null" class="result-container">
        <span class="result-number" :style="{ color: currentColor }">{{ result }}</span>
      
    </div>
  </div>
  <div class="history">
    <div class="history-item" v-for="(item, idx) in history" :key="idx">
      <div class="time-span">{{item.time}}</div>
      <div class="value-span" :style="{ color: item.color }">{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { vFireworks } from '@/utils/fireworks';

const nums = ref([0, 8, 3, 7, 4, 9, 2, 1, 5, 10, 6, 3, 1, 12, 11, 6, 8, 1, 10, 5, 12, 4, 9, 11, 8, 2, 7, 9, 10, 6, 5, 7, 4, 12, 11, 3, 2]);
const result = ref<number | null>(null);

const colorIndex = ref(-1);
const colors = ['#e74c3c', '#2ecc71', '#3498db'];
const currentColor = computed(() => {
  return colors[(colorIndex.value + colors.length) % colors.length];
});

type HistoryItem = { value: number; color: string; time: string };
const history = ref<HistoryItem[]>([]);

// 生成随机数的函数
const generateRandomSample = () => {
  colorIndex.value = (colorIndex.value + 1) % colors.length;
  result.value = <number>nums.value[Math.floor(Math.random() * (nums.value.length))];
  // 存入历史记录
  // 注意：仅在内存中保存，调用保存函数后不进行持久化
};

const saveToHistiry = () => {
  if (result.value === null || result.value === undefined) return;
  const now = new Date()
  const item: HistoryItem = { value: result.value, color: <string>currentColor.value, time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}` };
  history.value = [item, ...history.value.slice(0, 4)];
}

onMounted(()=>{
  generateRandomSample();
})
</script>

<style scoped>
.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 5px auto;
  max-width: 300px;
  font-family: Arial, sans-serif;
  padding: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.value-span {
  flex: 1;
  text-align: center;
}

.time-span {
  flex: 0.1 0 50px;
  margin-right: auto;
}

.random-generator {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 60px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  height: 100px;
}

button:hover {
  background-color: #3aa876;
}

.result-container {
  margin-top: 20px;
}

.result-number {
  font-size: 200px;
  font-weight: bold;
  color: #42b983;
}
</style>