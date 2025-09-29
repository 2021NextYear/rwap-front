import { http, createConfig } from 'wagmi'
import { bsc, bscTestnet } from '@wagmi/core/chains'
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
  { appName: 'Kandle finance', projectId: '4f478ae1b484e7bd2ddb13b33b456b11' }
)

export const wagmiConfig = createConfig({
  chains: [bsc, bscTestnet],
  connectors: connectors,
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
