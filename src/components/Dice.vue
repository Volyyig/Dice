<template>
  <div class="random-generator">
    <h2>🎲 骰子</h2>

    <button @click="generateRandomSample" ref="buttonRef" v-fireworks>点击生成</button>

    <div v-if="result !== null" class="result-container">
      <p>生成结果：</p>
      <span class="result-number" :style="{ color: currentColor }">{{ result }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { vFireworks } from '@/utils/fireworks';
// 定义响应式变量
// const min = ref(1);
// const max = ref(100);
const nums = ref([0, 8, 3, 7, 4, 9, 2, 1, 5, 10, 6, 3, 1, 12, 11, 6, 8, 1, 10, 5, 12, 4, 9, 11, 8, 2, 7, 9, 10, 6, 5, 7, 4, 12, 11, 3, 2]);
const result = ref();

const colorIndex = ref(-1);
const colors = ['#e74c3c', '#2ecc71', '#3498db'];
const currentColor = computed(() => {
  return colors[(colorIndex.value + colors.length) % colors.length];
});

// 生成随机数的函数
const generateRandomSample = () => {
  colorIndex.value = (colorIndex.value + 1) % colors.length;
  result.value = nums.value[Math.floor(Math.random() * (nums.value.length))];
};


</script>

<style scoped>
.random-generator {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
  font-size: 48px;
  font-weight: bold;
  color: #42b983;
}
</style>