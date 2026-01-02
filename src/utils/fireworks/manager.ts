// src/utils/fireworks/manager.ts
import { Particle } from './particle';

class FireworksManager {
  private static instance: FireworksManager;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private isRunning: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initCanvas();
    }
  }

  public static getInstance(): FireworksManager {
    if (!FireworksManager.instance) {
      FireworksManager.instance = new FireworksManager();
    }
    return FireworksManager.instance;
  }

  private initCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: true })!;
    
    const style = this.canvas.style;
    style.position = 'fixed';
    style.top = '0';
    style.left = '0';
    style.pointerEvents = 'none';
    style.zIndex = '999999';
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.body.appendChild(this.canvas);
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  public addFirework(x: number, y: number) {
    const colors = ['#ff3e00', '#ffbe00', '#2e3333', '#40b3ff', '#676778'];
    for (let i = 0; i < 25; i++) {
      this.particles.push(new Particle(x, y, <string>colors[Math.floor(Math.random() * colors.length)], this.ctx));
    }
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = <Particle>this.particles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(this.animate);
    } else {
      this.isRunning = false;
    }
  }
}

export const fireworksManager = FireworksManager.getInstance();