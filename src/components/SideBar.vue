<template>
  <Transition name="fade">
    <div class="sidebar-overlay" v-if="isOpen" @click="$emit('close')"></div>
  </Transition>
  
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-content">
      <h2>设置</h2>
      <div class="divider"></div>
      
      <div class="sidebar-menu">
        <button class="menu-item-btn" @click="$emit('open-full-history')">
          📜 历史记录
        </button>
        <button class="menu-item-btn" @click="$emit('open-encyclopedia')">
          📕 命运图鉴
        </button>
      </div>
      <div class="divider"></div>
      <button class="reset-btn" :class="{ confirming: resetConfirm }" @click="handleReset">
        {{ resetConfirm ? '确定开启新游戏吗？' : '新游戏' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'reset'): void;
  (e: 'open-full-history'): void;
  (e: 'open-encyclopedia'): void;
}>();

const resetConfirm = ref(false);

const handleReset = () => {
  if (!resetConfirm.value) {
    resetConfirm.value = true;
    return;
  }
  
  emit('reset');
  resetConfirm.value = false;
};

// Reset states when sidebar closes
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetConfirm.value = false;
  }
});
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 998;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: var(--color-background-soft);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: left 0.3s ease;
  padding: 20px;
  box-sizing: border-box;
}

.sidebar.open {
  left: 0;
}

.sidebar-content h2 {
  margin-top: 0px;
  margin-bottom: 20px;
  color: var(--color-heading);
  text-align: center;
}

.divider {
  height: 1px;
  background: var(--color-border);
  margin: 20px 0;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item-btn {
  width: 100%;
  padding: 12px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.menu-item-btn:hover {
  background: var(--color-background-mute);
  border-color: #3498db;
}

.reset-btn {
  width: 100%;
  padding: 12px;
  background: #eef9ef;
  border: 1px solid #b7e4c7;
  color: #2d6a4f;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #74c69d;
  color: white;
  border-color: #52b788;
}

.reset-btn.confirming {
  background: #40916c;
  color: white;
  border-color: #2d6a4f;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
