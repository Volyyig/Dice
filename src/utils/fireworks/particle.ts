export class Particle {
  private radius: number;
  public alpha: number = 1;
  private decay: number;
  private vx: number;
  private vy: number;
  private gravity: number = 0.05; // 增加重力感

  constructor(
    public x: number,
    public y: number,
    private color: string,
    private ctx: CanvasRenderingContext2D
  ) {
    const angle = Math.random() * Math.PI * 2;
    const force = Math.random() * 4 + 2;
    this.vx = Math.cos(angle) * force;
    this.vy = Math.sin(angle) * force;

    // 2. 在构造函数中生成随机大小 (例如 1.5 到 4 之间)
    this.radius = Math.random() * 5 + 5; 
    
    // 技巧：较大的粒子通常消失得稍慢一点，这样更有层次感
    this.decay = Math.random() * 0.01 + (this.radius > 3 ? 0.005 : 0.015);
  }

  update(): void {
    this.vx *= 0.98; // 空气阻力
    this.vy *= 0.98;
    this.vy += this.gravity; 
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;

    if (this.alpha < 0) this.alpha = 0;
  }

  draw(): void {
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    
    // 粒子会随着 alpha 的降低而同步变小
    const currentRadius = this.radius * this.alpha;
    this.ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
    
    this.ctx.fill();
    this.ctx.restore();
  }
}