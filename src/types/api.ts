export interface MarketRespon {
  symbol: string
  type: 'DX' | 'CX'
  ex: string
  address: string
  token0Symbol: string
  token1Symbol: string
  token0Decimals: number
  token1Decimals: number
  token0: string
  token1: string
  nftAddress: string
  permit2Address: string
  price: number
  price0USD: number
  price1USD: number
  side: number
  amount0: number
  amount1: number
  slot0USD: number
  contractAddress: string
  chainId: number
  apr: Apr
}

export interface Apr {
  volumeUSD24h: string
  apr24h: string
  apr365: number
  apr7d: string
  volumeUSD7d: number
}

export interface MintParams {
  symbol: string
  side: string
  num: string
  tickStep: string
  tickOffset: number
  swap: boolean
  from: string
  slippage: number
  bnbValue?: string
  deadline?: number
  nonce?: number
  signature?: string
  nftAddress: string
}

export interface CollectParams {
  tokenId: number
  swapSide: number
  from: string
  slippage: number
  deadline?: number
  signature?: string
  nonce?: number
  nftAddress: string
}

export interface RiseMoveParams {
  tokenId: number
  tickStep: string
  tickOffset: number
  from: string
  swap: boolean
  slippage: number
  deadline?: number
  signature?: string
  nonce?: number
  nftAddress: string
}

export interface WithdrawFeeParams {
  tokenId: number
  swapSide: number
  from: string
  deadline?: number
  signature?: string
  nonce?: number
  nftAddress: string
}

export interface InputResponse {
  gasPrice: { hex: string }
  gasLimit: { hex: string }
  error: string
  data: string
  to: string
}

export interface SwapOnePathParams {
  from: string
  symbol: string
  side: number
  num: string
  slippage: number
  bnbValue?: string
  withdrawWBNB?: boolean
  estimate?: boolean
  force?: boolean
}

export interface SwapQuoteParams {
  symbol: string
  side: number
  num: string
  slippage: number
}

export interface SwapQuoteResponse {
  symbol: string
  tokenIn: string
  tokenOut: string
  amountIn: number
  amountOut: number
  price: number
}
