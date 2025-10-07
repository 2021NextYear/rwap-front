import { http, createConfig } from 'wagmi'
import {
  bsc,
  bscTestnet,
  arbitrum,
  polygon,
  mainnet,
  base,
  optimism,
  avalanche,
  linea,
  sei,
  unichain,
  sonic,
} from '@wagmi/core/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  okxWallet,
  injectedWallet,
  rabbyWallet,
  metaMaskWallet,
  binanceWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { createClient } from 'viem'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [injectedWallet, metaMaskWallet, okxWallet, binanceWallet, rabbyWallet],
    },
  ],
  { appName: 'RWAFinance', projectId: 'f37a652b712e5c22c7fbb1c608d171be' }
)

export const wagmiConfig = createConfig({
  chains: [
    bsc,
    bscTestnet,
    arbitrum,
    polygon,
    mainnet,
    base,
    optimism,
    avalanche,
    linea,
    sei,
    unichain,
    sonic,
  ],
  connectors: connectors,
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
