import { bsc, bscTestnet } from 'viem/chains'
import { isDev } from './env'

const CHAIN_CONFIG_TEST = {
  chainId: 97,
  rpc: 'https://data-seed-prebsc-2-s2.binance.org:8545',
  contract: {
    usdt: '0x42031fE0c351Ab6B07BfCA7E393F15E4EEFDC10f',
    rwat: '0xCA0194Ef9201682B2678Fa7886257822a8cfCfd3',
    oldStaking: '0xC634011586b08fDf0e73450A04e295e5408f3DA2',
    staking: '0xC634011586b08fDf0e73450A04e295e5408f3DA2',
    getBalance: '0xb5f9B45877C3c89d491F3D66e13b1d506550418D',
    mutilCall: '0xca11bde05977b3631167028862be2a173976ca11',
    owner: '0x56c4653d642ad5Ab7F962b4C67559936b6B7eFC3',
    dexPair: '0x5E4D765Bab86390871d0812e97A180f5B7861564',
  },
}

const CHAIN_CONFIG_PROD = {
  chainId: 56,
  rpc: 'https://bsc.publicnode.com',
  contract: {
    usdt: '0x55d398326f99059fF775485246999027B3197955',
    rwat: '0x1e71525664B90393449494768A0120996D0Be5b1',
    oldStaking: '0xD4364E78CBC7605fC4e786BBC4De84FDd8106f78',
    staking: '0x68C687bde9c763D307BB2B6564fDc4ab5392D542',
    getBalance: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4',
    mutilCall: '0xca11bde05977b3631167028862be2a173976ca11',
    owner: '0xEB3eeC6CaB172180fD05b2DdD89e0748c57406e6',
    dexPair: '0xcdb4ED34B21308DFbcBD96815560A29A565C9ffe',
  },
}

export const CHAIN_CONFIG = CHAIN_CONFIG_PROD
