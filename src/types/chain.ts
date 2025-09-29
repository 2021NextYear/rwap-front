import { type Chain } from 'viem/chains'

export type ChainConfig = Record<number, ChainItem>

interface ChainItem {
  chain: Chain
  contracts: Contracts
  networks: Networks
  dex: Record<string, DexV3 | DexV4>
}

export type UniswapDex = DexV3 & DexV4

interface Contracts {
  weth: string
  mutilCall: string
  getBalance: string
}

interface Networks {
  name: string
  chainId: number
  rpcUrl: string
  blockBrowseUrl: string
  symbol: string
  wrapSymbol: string
  decimals: number
}

interface Dex {
  name: string
  nftPermitDomainName: string
  version: number
  positionURL: string
}

export interface DexV3 extends Dex {
  nonfungiblePositionManager: string
  initCodeHash: string
  deployer: string
}

export interface DexV4 extends Dex {
  positionManager: string
  stateView: string
}
