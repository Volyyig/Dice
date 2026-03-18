<template>
  <Transition name="fade">
    <div class="sidebar-overlay" v-if="isOpen" @click="$emit('close')"></div>
  </Transition>
  
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-content">
      <h2>设置</h2>
      <div class="divider"></div>
      <button class="reset-btn" :class="{ confirming: resetConfirm }" @click="handleReset">
        {{ resetConfirm ? '确定重置吗？' : '重置' }}
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

// Reset confirmation state when sidebar closes
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
  margin-top: 40px;
  margin-bottom: 20px;
  color: var(--color-heading);
  text-align: center;
}

.divider {
  height: 1px;
  background: var(--color-border);
  margin: 20px 0;
}

.reset-btn {
  width: 100%;
  padding: 12px;
  background: #fdf0f0;
  border: 1px solid #fab1a0;
  color: #e17055;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #ff7675;
  color: white;
  border-color: #d63031;
}

.reset-btn.confirming {
  background: #d63031;
  color: white;
  border-color: #c0392b;
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
