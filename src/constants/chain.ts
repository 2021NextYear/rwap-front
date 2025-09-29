import { bsc, bscTestnet } from 'viem/chains'
import { isDev } from './env'

const CHAIN_CONFIG_TEST = {
  chainId: 97,
  rpc: 'https://data-seed-prebsc-2-s2.binance.org:8545',
  contract: {
    usdt: '0x42031fE0c351Ab6B07BfCA7E393F15E4EEFDC10f',
    rwat: '0x2460EA428DAe5E2eb469EF88313Fb4746AA2dB6c',
    staking: '0x347D54fb6a2258961d3db6B0A48edc5FD09F8Bfb',
    getBalance: '0xb5f9B45877C3c89d491F3D66e13b1d506550418D',
  },
}

const CHAIN_CONFIG_PROD = {
  chainId: 56,
  rpc: 'https://bsc.publicnode.com',
  contract: {
    usdt: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
    rwat: '0x2460EA428DAe5E2eb469EF88313Fb4746AA2dB6c',
    staking: '0x0afcef0059A5aF2AA5514Ae46B07f96104d9A309',
    getBalance: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4',
  },
}

export const CHAIN_CONFIG = CHAIN_CONFIG_TEST
