import { bsc, bscTestnet } from 'viem/chains'
import { isDev } from './env'

const CHAIN_CONFIG_TEST = {
  chainId: 97,
  rpc: 'https://data-seed-prebsc-2-s2.binance.org:8545',
  contract: {
    usdt: '0x42031fE0c351Ab6B07BfCA7E393F15E4EEFDC10f',
    rwat: '0xCA0194Ef9201682B2678Fa7886257822a8cfCfd3',
    staking: '0xbe1FF81F94269edD2E38aA0E045f9a14945501b5',
    getBalance: '0xb5f9B45877C3c89d491F3D66e13b1d506550418D',
    mutilCall: '0xca11bde05977b3631167028862be2a173976ca11',
  },
}

const CHAIN_CONFIG_PROD = {
  chainId: 56,
  rpc: 'https://bsc.publicnode.com',
  contract: {
    usdt: '0x55d398326f99059fF775485246999027B3197955',
    rwat: '0x1e71525664B90393449494768A0120996D0Be5b1',
    staking: '0xD4364E78CBC7605fC4e786BBC4De84FDd8106f78',
    getBalance: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4',
    mutilCall: '0xca11bde05977b3631167028862be2a173976ca11',
  },
}

export const CHAIN_CONFIG = CHAIN_CONFIG_PROD
