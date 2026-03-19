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
  name: string; // 在图鉴中显示的固定名称
  description: string; // 在图鉴中显示的固定描述
  factory: (name: string) => Fate;
  count: number;
}

export const fatePool: FatePoolEntry[] = [
  {
    name: "财神驾到",
    description: "随机获得 300-1500 元",
    factory: (name) => {
      const amount = Math.floor(Math.random() * 121) * 10 + 300;
      return new Fate(
        "财神驾到",
        name,
        FateCategory.Instant,
        `获得 ${formatEmphasis(amount.toString(), 'gain')} 元`,
        () => {
          console.log(`Effect: Gain ${amount} bounty`);
        }
      );
    },
    count: 3
  },
  {
    name: "霉运降临",
    description: "随机损失 100-1000 元",
    factory: (name) => {
      const amount = Math.floor(Math.random() * 91) * 10 + 100;
      return new Fate(
        "霉运降临",
        name,
        FateCategory.Instant,
        `损失 ${formatEmphasis(amount.toString(), 'loss')} 元`,
        () => {
          console.log(`Effect: Lose ${amount} bounty`);
        }
      );
    },
    count: 2
  },
  {
    name: "禁闭室",
    description: "暂停 1 回合",
    factory: (name) => new Fate(
      "禁闭室",
      name,
      FateCategory.Delayed,
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer, Condition.Default])}暂停 1 回合`,
      () => {
        console.log("Effect: Prison");
      }
    ),
    count: 2
  },
  {
    name: "行政休假",
    description: "本回合留在原地",
    factory: (name) => new Fate(
      "行政休假",
      name,
      FateCategory.Delayed,
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer])}本回合留在原地`,
      () => {
        console.log("Effect: Stay in place");
      }
    ),
    count: 1
  },
  {
    name: "快人一步",
    description: "立即增加 1 回合",
    factory: (name) => new Fate(
      "快人一步",
      name,
      FateCategory.Instant,
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer, Condition.Default])}立即增加 1 回合`,
      () => {
        console.log("Effect: Add 1 round");
      }
    ),
    count: 1
  },
  {
    name: "空间扭曲",
    description: "某玩家移动随机步数",
    factory: (name) => new Fate(
      "空间扭曲",
      name,
      FateCategory.Instant,
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer])}投掷骰子，${randomChoice([formatEmphasis('前进', 'gain'), formatEmphasis('后吐', 'loss')])}投掷点数`,
      () => {
        console.log("Effect: Space warp");
      }
    ),
    count: 2
  },
  {
    name: "时空裂缝",
    description: "被随机传送到地图某处",
    factory: (name) => new Fate(
      "时空裂缝",
      name,
      FateCategory.Instant,
      "随机传送到地图某处",
      () => {
        console.log("Effect: Teleport");
      }
    ),
    count: 1
  },
  {
    name: "守护天使",
    description: "抵挡下一次受到的负面效果",
    factory: (name) => new Fate(
      "守护天使",
      name,
      FateCategory.Delayed,
      `${formatEmphasis('抵挡', 'gain')}下一次受到的负面效果`,
      () => {
        console.log("Effect: Shield");
      }
    ),
    count: 2
  },
  {
    name: "地租调整",
    description: "下次被收租时增加或减少 50%",
    factory: (name) => {
      const bool_ = Math.random() < 0.5;
      return new Fate(
        bool_ ? "地租减免" : "地租翻倍",
        name,
        FateCategory.Delayed,
        bool_ ? `下次被收租时${formatEmphasis('减免', 'gain')}50%` : `下一步被收地租${formatEmphasis('增加', 'loss')}50%`,
        () => {
          console.log("Effect: Rent adjustment");
        }
      )
    },
    count: 1
  },
  {
    name: "市场波动",
    description: "下次购买地皮时价格波动 50%",
    factory: (name) => new Fate(
      "市场波动",
      name,
      FateCategory.Instant,
      `下次购买地皮时价格${randomChoice([formatEmphasis('减免', 'gain'), formatEmphasis('增加', 'loss')])}50%`,
      () => {
        console.log("Effect: Market fluctuation");
      }
    ),
    count: 1
  },
  {
    name: "什一税",
    description: "失去所有现金的 1/10",
    factory: (name) => new Fate(
      "什一税",
      name,
      FateCategory.Instant,
      `失去所有现金的 ${formatEmphasis('1/10', 'loss')}`,
      () => {
        console.log("Effect: Lose 1/10 of cash");
      }
    ),
    count: 1
  },
  {
    name: "房产税",
    description: "房屋每幢250元",
    factory: (name) => new Fate(
      "房产税",
      name,
      FateCategory.Instant,
      `房屋每幢${formatEmphasis('250', 'loss')}元`,
      () => {
        console.log("Effect: Property tax");
      }
    ),
    count: 1
  },
  {
    name: "救济金",
    description: "每人救济1000元",
    factory: (name) => new Fate(
      "救济金",
      name,
      FateCategory.Instant,
      `每人获得${formatEmphasis('1000', 'gain')}元`,
      () => {
        console.log("Effect: every player gains 1000 bounty");
      }
    ),
    count: 1
  },
  {
    name: "误乘航班",
    description: "退回起点",
    factory: (name) => new Fate(
      "误乘航班",
      name,
      FateCategory.Instant,
      "退回起点",
      () => {
        console.log("Effect: Teleport to start");
      }
    ),
    count: 1
  },
  {
    name: "转向",
    description: "调转方向",
    factory: (name) => new Fate(
      "转向",
      name,
      FateCategory.Instant,
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer, Condition.Default])}${randomChoice([formatEmphasis('下回合', 'gain'), formatEmphasis('永久', 'loss')])}变向`,
      () => {
        console.log("Effect: reverse direction");
      }
    ),
    count: 1
  },
  {
    name: "乾坤大挪移",
    description: "和其他玩家交换位置",
    factory: (name) => new Fate(
      "乾坤大挪移",
      name,
      FateCategory.Instant,
      `${randomChoice([Condition.ControlPlayer, Condition.MaxDicePlayer, "距离最远的玩家"])}与你交换位置`,
      () => {
        console.log("Effect: swap position");
      }
    ),
    count: 1
  },
  {
    name: "变速器",
    description: "下一步点数x2或x0.5",
    factory: (name) => {
      const bool_ = Math.random() < 0.5;
      return new Fate(
        bool_ ? "光速跑路" : "地板胶粘",
        name,
        FateCategory.Delayed,
        bool_ ? `下一步点数${formatEmphasis('x2', 'gain')}` : `下一步点数${formatEmphasis('x0.5', 'loss')}`,
        () => {
          console.log("Effect: " + (bool_ ? "multiplier x2" : "multiplier x0.5"));
        }
      )
    },
    count: 1
  }
];
