import { Fate, FateCategory } from '@/types/Fate';

let lastCaishenAmount = 0;
let lastMeiyunAmount = 0;

// 格式化：强调增益/减益
const formatEmphasis = (emphasis: string, type: 'gain' | 'loss') => {
  const color = type === 'gain' ? '#27ae60' : type === 'loss' ? '#e74c3c' : '#000000';
  return `<span style="color: ${color}; font-weight: bold;">${emphasis}</span>`;
};

// 随机选择
const randomChoice = (text: string[]) => {
  return text[Math.floor(Math.random() * text.length)];
}

enum Condition {
  Default = '',
  MaxDicePlayer = `<span style="color: #c8d602ff; font-weight: bold;">拼点最大的玩家</span>`,
  ControlPlayer = `<span style="color: #27ae60; font-weight: bold;">令一名玩家</span>`
}

export const fatePool: Fate[] = [
  new Fate(
    "财神驾到",
    FateCategory.Instant,
    "随机获得 200-1000 元",
    () => {
      lastCaishenAmount = Math.floor(Math.random() * 81) * 10 + 200;
      return `获得 ${formatEmphasis(lastCaishenAmount.toString(), 'gain')} 元`;
    },
    () => {
      console.log(`Effect: Gain ${lastCaishenAmount} bounty`);
    }
  ),
  new Fate(
    "霉运降临",
    FateCategory.Instant,
    "随机损失 100-600 元",
    () => {
      lastMeiyunAmount = Math.floor(Math.random() * 51) * 10 + 100;
      return `损失 ${formatEmphasis(lastMeiyunAmount.toString(), 'loss')} 元`;
    },
    () => {
      console.log(`Effect: Lose ${lastMeiyunAmount} bounty`);
    }
  ),
  new Fate(
    "禁闭室",
    FateCategory.Delayed,
    "暂停 1 回合",
    () => `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer, Condition.Default])}暂停 1 回合`,
    () => {
      console.log("Effect: Prison");
    }
  ),
  new Fate(
    "行政休假",
    FateCategory.Delayed,
    "本回合留在原地",
    () => `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer])}本回合留在原地`,
    () => {
      console.log("Effect: Stay in place");
    }
  ),
  new Fate(
    "快人一步",
    FateCategory.Instant,
    "立即增加 1 回合",
    () => "立即增加 1 回合",
    () => {
      console.log("Effect: Add 1 round");
    }
  ),
  new Fate(
    "加速鞋",
    FateCategory.Instant,
    "本次步数额外增加 2 点",
    () => "本次步数额外增加 2 点",
    () => {
      console.log("Effect: Speed up");
    }
  ),
  new Fate(
    "时空裂缝",
    FateCategory.Instant,
    "被随机传送到地图某处",
    () => "随机传送到地图某处",
    () => {
      console.log("Effect: Teleport");
    }
  ),
  new Fate(
    "守护天使",
    FateCategory.Delayed,
    "抵挡下一次受到的负面效果",
    () => "抵挡下一次受到的负面效果",
    () => {
      console.log("Effect: Shield");
    }
  ),
  new Fate(
    "地租减免",
    FateCategory.Delayed,
    "下次被收租时减免 50%",
    () => `下次被收租时减免${formatEmphasis('50%', 'gain')}`,
    () => {
      console.log("Effect: Rent reduction");
    }
  ),
  new Fate(
    "地租翻倍",
    FateCategory.Delayed,
    "下次被收租时地租翻倍",
    () => `下一步被收地租${formatEmphasis('翻倍', 'loss')}`,
    () => {
      console.log("Effect: Rent double");
    }
  ),
];
