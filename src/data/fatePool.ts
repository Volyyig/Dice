import { Fate, FateCategory } from '@/types/Fate';

export const fatePool: Fate[] = [
  new Fate("财神驾到", () => {
    const amount = Math.floor(Math.random() * 81) * 10 + 200;
    return `获得 <span style="color: #27ae60; font-weight: bold;">${amount}</span> 元`;
  }, FateCategory.Normal, "随机获得 200-1000 元"),
  new Fate("霉运降临", () => {
    const amount = Math.floor(Math.random() * 51) * 10 + 100;
    return `损失 <span style="color: #e74c3c; font-weight: bold;">${amount}</span> 元`;
  }, FateCategory.Normal, "随机损失 100-600 元"),
  new Fate("路障预警", () => "在前方放置了一个无形路障", FateCategory.Delayed, "在前方放置一个无形路障"),
  new Fate("双倍经验", () => "下一次行动将获得双倍经验", FateCategory.Delayed, "下一次行动获得双倍经验"),
  new Fate("禁闭室", () => "被关进禁闭室，暂停 1 回合", FateCategory.Delayed, "暂停 1 回合"),
  new Fate("加速鞋", () => "穿上了加速鞋，本次步数额外增加 2 点", FateCategory.Normal, "本次步数额外增加 2 点"),
  new Fate("时空裂缝", () => "掉入时空裂缝，被随机传送到地图某处", FateCategory.Normal, "被随机传送到地图某处"),
  new Fate("守护天使", () => "守护天使降临，将抵挡下一次受到的负面效果", FateCategory.Delayed, "抵挡下一次受到的负面效果"),
];
