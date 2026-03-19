import { Fate, FateCategory } from '@/types/Fate';

// 格式化：强调增益/减益
const formatEmphasis = (emphasis: string, type: 'gain' | 'loss') => {
  const color = type === 'gain' ? '#27ae60' : type === 'loss' ? '#e74c3c' : '#000000';
  return `<span style="color: ${color}; font-weight: bold;">${emphasis}</span>`;
};

// 随机选择
const randomChoice = (text: string[]) => {
  return text[Math.floor(Math.random() * text.length)];
}

const Condition = {
  Default: '',
  MaxDicePlayer: `<span style="color: #c8d602ff; font-weight: bold;">拼点最大的玩家</span>`,
  ControlPlayer: `<span style="color: #27ae60; font-weight: bold;">令一名玩家</span>`
};

export interface FatePoolEntry {
  factory: () => Fate;
  count: number;
}

export const fatePool: FatePoolEntry[] = [
  {
    factory: () => {
      const amount = Math.floor(Math.random() * 121) * 10 + 300;
      return new Fate(
        "财神驾到",
        FateCategory.Instant,
        "随机获得 300-1500 元",
        `获得 ${formatEmphasis(amount.toString(), 'gain')} 元`,
        () => {
          console.log(`Effect: Gain ${amount} bounty`);
        }
      );
    },
    count: 3
  },
  {
    factory: () => {
      const amount = Math.floor(Math.random() * 91) * 10 + 100;
      return new Fate(
        "霉运降临",
        FateCategory.Instant,
        "随机损失 100-1000 元",
        `损失 ${formatEmphasis(amount.toString(), 'loss')} 元`,
        () => {
          console.log(`Effect: Lose ${amount} bounty`);
        }
      );
    },
    count: 2
  },
  {
    factory: () => new Fate(
      "禁闭室",
      FateCategory.Delayed,
      "暂停 1 回合",
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer, Condition.Default])}暂停 1 回合`,
      () => {
        console.log("Effect: Prison");
      }
    ),
    count: 2
  },
  {
    factory: () => new Fate(
      "行政休假",
      FateCategory.Delayed,
      "本回合留在原地",
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer])}本回合留在原地`,
      () => {
        console.log("Effect: Stay in place");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "快人一步",
      FateCategory.Instant,
      "立即增加 1 回合",
      "立即增加 1 回合",
      () => {
        console.log("Effect: Add 1 round");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "空间扭曲",
      FateCategory.Instant,
      "某玩家移动随机步数",
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer])}投掷骰子，${randomChoice([formatEmphasis('前进', 'gain'), formatEmphasis('后退', 'loss')])}投掷点数`,
      () => {
        console.log("Effect: Space warp");
      }
    ),
    count: 2
  },
  {
    factory: () => new Fate(
      "时空裂缝",
      FateCategory.Instant,
      "被随机传送到地图某处",
      "随机传送到地图某处",
      () => {
        console.log("Effect: Teleport");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "守护天使",
      FateCategory.Delayed,
      "抵挡下一次受到的负面效果",
      `${formatEmphasis('抵挡', 'gain')}下一次受到的负面效果`,
      () => {
        console.log("Effect: Shield");
      }
    ),
    count: 2
  },
  {
    factory: () => new Fate(
      "地租减免",
      FateCategory.Delayed,
      "下次被收租时减免 50%",
      `下次被收租时减免${formatEmphasis('50%', 'gain')}`,
      () => {
        console.log("Effect: Rent reduction");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "地租翻倍",
      FateCategory.Delayed,
      "下次被收租时地租翻倍",
      `下一步被收地租${formatEmphasis('翻倍', 'loss')}`,
      () => {
        console.log("Effect: Rent double");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "市场波动",
      FateCategory.Instant,
      "下次购买地皮时价格波动 50%",
      `下次购买地皮时价格${randomChoice([formatEmphasis('减免', 'gain'), formatEmphasis('增加', 'loss')])}50%`,
      () => {
        console.log("Effect: Market fluctuation");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "什一税",
      FateCategory.Instant,
      "失去所有现金的 1/10",
      `失去所有现金的 ${formatEmphasis('1/10', 'loss')}`,
      () => {
        console.log("Effect: Lose 1/10 of cash");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "房产税",
      FateCategory.Instant,
      "房屋每幢250元",
      `房屋每幢${formatEmphasis('250', 'loss')}元`,
      () => {
        console.log("Effect: Property tax");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "救济金",
      FateCategory.Instant,
      "每人救济1000元",
      `每人获得${formatEmphasis('1000', 'gain')}元`,
      () => {
        console.log("Effect: every player gains 1000 bounty");
      }
    ),
    count: 1
  },
  {
    factory: () => new Fate(
      "误乘航班",
      FateCategory.Instant,
      "退回起点",
      "退回起点",
      () => {
        console.log("Effect: Teleport to start");
      }
    ),
    count: 1
  }
];
