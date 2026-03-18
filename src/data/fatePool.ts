import { Fate, FateCategory } from '@/types/Fate';

export const fatePool: Fate[] = [
  new Fate("财神驾到", () => console.log("Effect: Gain bounty"), FateCategory.Normal, "立即获得一笔意外之财"),
  new Fate("霉运降临", () => console.log("Effect: Lose bounty"), FateCategory.Normal, "不小心掉了一些金币"),
  new Fate("路障预警", () => console.log("Effect: Place roadblock"), FateCategory.Delayed, "在前方放置一个无形路障"),
  new Fate("双倍经验", () => console.log("Effect: Double XP"), FateCategory.Delayed, "下一次行动获得双倍经验"),
  new Fate("禁闭室", () => console.log("Effect: Prison"), FateCategory.Delayed, "下一轮将无法行动"),
  new Fate("加速鞋", () => console.log("Effect: Speed up"), FateCategory.Normal, "本次步数额外增加2点"),
  new Fate("时空裂缝", () => console.log("Effect: Teleport"), FateCategory.Normal, "被随机传送到地图某处"),
  new Fate("守护天使", () => console.log("Effect: Shield"), FateCategory.Delayed, "抵挡下一次受到的负面效果"),
];
