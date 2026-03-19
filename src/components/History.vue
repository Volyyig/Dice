<template>
  <div class="history">
    <div class="history-item" v-for="(item, idx) in items" :key="idx">
      <div class="time-span">{{ item.time }}</div>
      <div class="value-span" :style="{ color: item.color }" v-html="item.value"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type HistoryItem = { value: number | string; color: string; time: string };

defineProps<{
  items: HistoryItem[];
}>();
</script>

<style scoped>
.history {
  width: 100%;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 5px auto;
  font-family: Arial, sans-serif;
  padding: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.value-span {
  flex: 1;
  text-align: center;
}

.time-span {
  flex: 0.1 0 50px;
  margin-right: auto;
}
</style>
