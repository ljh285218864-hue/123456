import { RECOMMENDATION_SLOTS } from './constants';

export type RecommendableStorefront = {
  id: string;
  ownerId: string;
  owner?: {
    id: string;
    invitedById?: string | null;
    memberLevel?: string;
    isOfficial?: boolean;
  } | null;
  exposureWeight: number;
  exposureCount: number;
};

function weightedPick(pool: RecommendableStorefront[], excludeIds: Set<string>) {
  const candidates = pool.filter(item => !excludeIds.has(item.id));
  if (!candidates.length) return null;
  const weighted = candidates.map(item => ({
    item,
    weight: Math.max(0.1, item.exposureWeight / (1 + item.exposureCount * 0.1))
  }));
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor = Math.random() * total;
  for (const entry of weighted) {
    cursor -= entry.weight;
    if (cursor <= 0) return entry.item;
  }
  return weighted[weighted.length - 1].item;
}

export function pickDynamicStorefronts(
  pools: {
    high: RecommendableStorefront[];
    mid: RecommendableStorefront[];
    low: RecommendableStorefront[];
    lowExposure: RecommendableStorefront[];
    fallback: RecommendableStorefront[];
  },
  excludedStorefrontIds: string[]
) {
  const picked: RecommendableStorefront[] = [];
  const excluded = new Set(excludedStorefrontIds);

  const plan: Array<[RecommendableStorefront[], number]> = [
    [pools.high, RECOMMENDATION_SLOTS.highPool],
    [pools.mid, RECOMMENDATION_SLOTS.midPool],
    [pools.low, RECOMMENDATION_SLOTS.lowPool],
    [pools.lowExposure, RECOMMENDATION_SLOTS.lowExposurePool]
  ];

  for (const [pool, count] of plan) {
    for (let index = 0; index < count; index += 1) {
      const item = weightedPick(pool, excluded);
      if (!item) break;
      picked.push(item);
      excluded.add(item.id);
    }
  }

  while (picked.length < RECOMMENDATION_SLOTS.dynamic) {
    const item = weightedPick(pools.fallback, excluded);
    if (!item) break;
    picked.push(item);
    excluded.add(item.id);
  }

  return picked;
}
