export enum FateCategory {
  Instant = '即时',
  Delayed = '延时'
}

export class Fate {
  constructor(
    public title: string,           // 真正显示在抽取时展示的信息框中显示的文字 (flavor title)
    public name: string,            // 在图鉴中显示的固定名称 (stable identifier for persistence)
    public category: FateCategory,
    public onDraw: string,            // 在抽取时展示的信息框中显示的文字
    public effect: () => void = () => { }   // 实际执行的效果（若是延时类命运，会在脱离暂存区时执行）
  ) { }
}
