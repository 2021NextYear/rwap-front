import { CHAIN_CONFIG } from '@/constants'
import {
  getBalanceCheckerContract,
  getErc20Contract,
  getStakeMiningContract,
  number2Small,
} from '@/lib'
import { useMemo } from 'react'
import useSWR from 'swr'

export function useGlobalInfo() {
  const { contract, chainId } = CHAIN_CONFIG
  const { staking } = contract

  const stakeMiningContract = getStakeMiningContract(staking, chainId)

  const { data = [] } = useSWR<bigint[]>(
    'useGlobalInfo',
    () => stakeMiningContract.getGlobalStats(),
    {
      refreshInterval: 10 * 1000,
      focusThrottleInterval: 10 * 1000,
    }
  )

  return useMemo(() => {
    const [
      miningAddresses,
      stakingAddresses,
      miningClaimedRewards,
      stakingClaimedRewards,
      totalMiningAmount,
      totalStakingAmount,
      ordinaryNodeCount,
      superNodeCount,
    ] = data.map(String)
    return {
      miningAddresses,
      stakingAddresses,
      miningClaimedRewards: number2Small(miningClaimedRewards, 18, 2),
      stakingClaimedRewards: number2Small(stakingClaimedRewards, 18, 2),
      totalMiningAmount: number2Small(totalMiningAmount, 18, 2),
      totalStakingAmount: number2Small(totalStakingAmount, 18, 2),
      ordinaryNodeCount,
      superNodeCount,
    }
  }, [data])
}

export function useTokenAmountByStake() {
  const { contract, chainId } = CHAIN_CONFIG
  const { rwat, staking } = contract

  const erc20Contract = getErc20Contract(rwat, chainId)

  const { data, error } = useSWR<any>(
    'useTokenAmountByStake',
    () => erc20Contract.balanceOf(staking),
    {
      refreshInterval: 10 * 1000,
      focusThrottleInterval: 10 * 1000,
    }
  )
  return useMemo(() => {
    return number2Small(String(data), 18, 0)
  }, [data])
}
