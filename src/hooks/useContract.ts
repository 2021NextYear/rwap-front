import { CHAIN_CONFIG } from '@/constants'
import {
  getBalanceCheckerContract,
  getErc20Contract,
  getStakeMiningContract,
  number2Small,
  singleContractMultipleDataFetcher,
  stakeMiningInterface,
} from '@/lib'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

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

export function useUserInfo() {
  const { address } = useAccount()
  const { contract, chainId } = CHAIN_CONFIG
  const { staking } = contract

  const {
    data = [
      {
        miningReward: '0',
        stakingReward: '0',
        inviteReward: '0',
        dividendReward: '0',
      },
      {
        miningReward: '0',
        stakingReward: '0',
        inviteReward: '0',
        dividendReward: '0',
      },
      {
        directInviter: '',
        directInviteCount: '0',
        totalMiningAmount: '0',
        totalStakingAmount: '0',
      },
      '0',
    ],
  } = useSWR<any[]>(
    address ? 'useUserInfo' : null,
    () =>
      singleContractMultipleDataFetcher(
        [
          staking,
          ['getClaimableRewards', 'getClaimedRewards', 'users', 'getIndirectInviteCount'],
          stakeMiningInterface,
          [[address], [address], [address], [address]],
        ],
        chainId
      ),
    {
      refreshInterval: 10 * 1000,
      focusThrottleInterval: 10 * 1000,
    }
  )

  return useMemo(() => {
    const [claimableRewards, claimedRewards, user, indirectCount]: any = data

    const { directInviter, directInviteCount, totalMiningAmount, totalStakingAmount } = user
    let _claimableRewards = {
        miningReward: '0',
        stakingReward: '0',
        inviteReward: '0',
        dividendReward: '0',
      },
      _claimedRewards = {
        miningReward: '0',
        stakingReward: '0',
        inviteReward: '0',
        dividendReward: '0',
      }
    if (claimableRewards) {
      const { miningReward, stakingReward, inviteReward, dividendReward } = claimableRewards
      _claimableRewards = {
        miningReward: number2Small(String(miningReward), 18),
        stakingReward: number2Small(String(stakingReward), 18),
        inviteReward: number2Small(String(inviteReward), 18),
        dividendReward: number2Small(String(dividendReward), 18),
      }
    }

    if (claimedRewards) {
      const { miningReward, stakingReward, inviteReward, dividendReward } = claimedRewards
      _claimedRewards = {
        miningReward: number2Small(String(miningReward), 18),
        stakingReward: number2Small(String(stakingReward), 18),
        inviteReward: number2Small(String(inviteReward), 18),
        dividendReward: number2Small(String(dividendReward), 18),
      }
    }

    return {
      directInviter,
      directInviteCount: String(directInviteCount),
      indirectCount: String(indirectCount),
      totalMiningAmount: number2Small(String(totalMiningAmount), 18),
      totalStakingAmount: number2Small(String(totalStakingAmount), 18),
      claimableRewards: _claimableRewards,
      claimedRewards: _claimedRewards,
    }
  }, [data])
}
