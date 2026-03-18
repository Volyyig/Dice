export enum FateCategory {
  Normal = '普通',
  Delayed = '延时'
}

export class Fate {
  constructor(
    public name: string,
    public effect: () => void,
    public category: FateCategory,
    public description: string = ''
  ) {}
}
