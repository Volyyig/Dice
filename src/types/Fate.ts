export enum FateCategory {
  Instant = '即时',
  Delayed = '延时'
}

export class Fate {
  constructor(
    public name: string,
    public category: FateCategory,
    public description: string = '',
    public onDraw: () => string,
    public effect: () => void = () => { }
  ) { }
}
