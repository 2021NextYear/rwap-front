export interface UniswapV3Slot0 {
  sqrtPriceX96: bigint
  tick: bigint
  observationIndex: bigint
  observationCardinality: bigint
  observationCardinalityNext: bigint
  feeProtocol: bigint
  unlocked: boolean
}

export interface LpToolUniPosition {
  nonce: bigint
  operator: string
  token0: string
  token1: string
  fee: bigint
  tickLower: bigint
  tickUpper: bigint
  liquidity: bigint
  feeGrowthInside0LastX128: bigint
  feeGrowthInside1LastX128: bigint
  tokensOwed0: bigint
  tokensOwed1: bigint
  tokenId: bigint
}

export interface PoolAndPositionInfo {
  poolKey: PoolKeyStructOutput
  info: bigint
}

export type PoolKeyStructOutput = [
  currency0: string,
  currency1: string,
  fee: bigint,
  tickSpacing: bigint,
  hooks: string
] & {
  currency0: string
  currency1: string
  fee: bigint
  tickSpacing: bigint
  hooks: string
}

export interface UniswapV4Slot0 {
  sqrtPriceX96: bigint
  tick: bigint
}

export type UniV4FeeGrowthInside = [bigint, bigint] & {
  feeGrowthInside0X128: bigint
  feeGrowthInside1X128: bigint
}

export interface UniPositionInfo {
  dexId: string
  chainId: number
  tokenId: number
  token0: string
  token1: string
  fee: number
  feeRatio: number
  sqrtPriceX96: bigint
  liquidity: string
  currentTick: number
  tickLower: number
  tickUpper: number
  nonce: number
  feesEarned0: string
  feesEarned1: string
  closed: boolean
  isActive: boolean
  distance: { distance: number; isBehind: boolean }
  tickLens: number
}

export interface UniV4PositionInfo extends UniPositionInfo {
  hooks: string
  poolIdBytes: string
}
