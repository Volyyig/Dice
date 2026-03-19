export enum FateCategory {
  Normal = '即时',
  Delayed = '延时'
}

export class Fate {
  constructor(
    public name: string,
    public effect: () => string,
    public category: FateCategory,
    public description: string = ''
  ) {}
}
