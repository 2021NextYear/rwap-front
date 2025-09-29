import { getRPCProvider } from './rpcProvider'
import {
  BalanceChecker__factory,
  Erc20__factory,
  LiquidityTool__factory,
  Uniswap_V3_Factory__factory,
  Uniswap_V3_NonfungiblePositionManager__factory,
  Uniswap_V3_Pool__factory,
  Uniswap_V4_PoolManager__factory,
  Uniswap_V4_PositionManager__factory,
  Uniswap_V4_StateView__factory,
  Multicall3__factory,
} from './typechain'
import { RWAT__factory } from './typechain/factories/RWAT__factory'
import { StakeMining__factory } from './typechain/factories/StakeMining__factory'

export const erc20Interface = Erc20__factory.createInterface()

export const balanceCheckerInterface = BalanceChecker__factory.createInterface()

export const liquidityToolInterface = LiquidityTool__factory.createInterface()

export const uniswapV3FactoryInterface = Uniswap_V3_Factory__factory.createInterface()

export const uniswapV3NFTManagerInterface =
  Uniswap_V3_NonfungiblePositionManager__factory.createInterface()

export const uniswapV3PoolInterface = Uniswap_V3_Pool__factory.createInterface()

export const uniswapV4PoolManageInterface = Uniswap_V4_PoolManager__factory.createInterface()

export const uniswapV4PositionManagerInterface =
  Uniswap_V4_PositionManager__factory.createInterface()

export const uniswapV4StateViewInterface = Uniswap_V4_StateView__factory.createInterface()

export const multicall3Interface = Multicall3__factory.createInterface()

export const getErc20Contract = (address: string, chainId: number) =>
  Erc20__factory.connect(address, getRPCProvider(chainId))

export const getBalanceCheckerContract = (address: string, chainId: number) =>
  BalanceChecker__factory.connect(address, getRPCProvider(chainId))

export const getLiquidityToolContract = (address: string, chainId: number) =>
  LiquidityTool__factory.connect(address, getRPCProvider(chainId))

export const getUniswapV3FactoryContract = (address: string, chainId: number) =>
  Uniswap_V3_Factory__factory.connect(address, getRPCProvider(chainId))

export const getUniswapV3NFTPositionManagerContract = (address: string, chainId: number) =>
  Uniswap_V3_NonfungiblePositionManager__factory.connect(address, getRPCProvider(chainId))

export const getUniswapV3PoolContract = (address: string, chainId: number) =>
  Uniswap_V3_Pool__factory.connect(address, getRPCProvider(chainId))

export const getUniswapV4PoolManagerContract = (address: string, chainId: number) =>
  Uniswap_V4_PoolManager__factory.connect(address, getRPCProvider(chainId))

export const getUniswapV4PositionManagerContract = (address: string, chainId: number) =>
  Uniswap_V4_PositionManager__factory.connect(address, getRPCProvider(chainId))

export const getUniswapV4StateViewContract = (address: string, chainId: number) =>
  Uniswap_V4_StateView__factory.connect(address, getRPCProvider(chainId))

export const getMulticall3Contract = (address: string, chainId: number) =>
  Multicall3__factory.connect(address, getRPCProvider(chainId))

export const rwatInterface = RWAT__factory.createInterface()

export const getRwatContract = (address: string, chainId: number) =>
  RWAT__factory.connect(address, getRPCProvider(chainId))

export const stakeMiningInterface = StakeMining__factory.createInterface()

export const getStakeMiningContract = (address: string, chainId: number) =>
  StakeMining__factory.connect(address, getRPCProvider(chainId))
