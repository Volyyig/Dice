// src/utils/fireworks/index.ts
import type { Directive } from 'vue';
import { fireworksManager } from './manager';

export const vFireworks: Directive = {
  mounted(el: HTMLElement) {
    el.addEventListener('click', (e: MouseEvent) => {
      fireworksManager.addFirework(e.clientX, e.clientY);
    });
  }
};