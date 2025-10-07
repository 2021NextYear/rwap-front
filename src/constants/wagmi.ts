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
  { appName: 'RWAFinance', projectId: 'c4f79cc821944d9680842e34466bfb' }
)

export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: connectors,
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
