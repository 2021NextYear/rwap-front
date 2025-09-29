import { CHAIN_CONFIG } from '@/constants'
import { JsonRpcProvider } from 'ethers'

const providers: {
  [key: number]: JsonRpcProvider
} = {}

export function getRPCProvider(chainId: number) {
  if (!providers[chainId]) {
    const rpc = CHAIN_CONFIG[chainId].networks.rpcUrl
    const currentProvider = new JsonRpcProvider(rpc)
    providers[chainId] = currentProvider
  }
  return providers[chainId]
}
