import type { UniPositionInfo } from '.'

export interface LiquidityState {
  poolMarkets: PoolMarkets
  positions: Positions

  fetchPositions: (account: string | undefined) => Promise<void>
  fetchPoolMarkets: () => void
}

export type PoolMarkets = Record<number | string, PoolDetail[]>

export type Positions = Record<number | string, UniPositionInfo[]>

export type PoolDetail = {
  symbol: string
  address: string
  side: number
  apr24h: string
  chainId: number
  contractAddress: string
  dexName: string
  dexId: string
  dexVersion: number
  nftAddress: string
  fee: number
  feeRatio: number
  token0Info: TokenInfo
  token1Info: TokenInfo
  permit2Address: string

  slot0Amount0: string
  slot0Amount1: string
  slot0USD0: string
  slot0USD1: string
  slot0USDTotal: string
}

export interface TokenInfo {
  chainId: number
  decimals: number
  symbol: string
  price?: number
  address: string
  slot0Amount?: number
}
