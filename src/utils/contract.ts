import { CHAIN_CONFIG } from '@/constants'
import {
  getStakeMiningContract,
  number2Small,
  singleContractMultipleDataFetcher,
  stakeMiningInterface,
} from '@/lib'

export const getUserInfo = async (address: string) => {
  const { contract, chainId } = CHAIN_CONFIG
  const { staking } = contract

  const [claimableRewards, claimedRewards, user, indirectCount]: any =
    await singleContractMultipleDataFetcher(
      [
        staking,
        ['getClaimableRewards', 'getClaimedRewards', 'users', 'getIndirectInviteCount'],
        stakeMiningInterface,
        [[address], [address], [address], [address]],
      ],
      chainId
    )
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
}
