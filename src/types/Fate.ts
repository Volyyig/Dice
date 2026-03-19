export enum FateCategory {
  Instant = '即时',
  Delayed = '延时'
}

export class Fate {
  constructor(
    public name: string,
    public category: FateCategory,
    public description: string = '',
    public onDraw: string,            // 在抽取时展示的信息框中显示的文字
    public effect: () => void = () => { }   // 实际执行的效果（若是延时类命运，会在脱离暂存区时执行）
  ) { }
}
