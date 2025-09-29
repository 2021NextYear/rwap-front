import { CHAIN_CONFIG } from '@/constants'
import { erc20Interface, getErc20Contract, getStakeMiningContract, gt, number2Small } from '@/lib'
import type { TransactionParame } from '@/types'
import { isAddress, zeroAddress } from 'viem'

export async function genErc20ApproveForContract(
  erc20Address: string,
  targetAddress: string,
  account: string,
  amount: string,
  chainId: number
): Promise<TransactionParame | undefined> {
  const erc20Contract = getErc20Contract(erc20Address, chainId)
  const allowance = await erc20Contract.allowance.staticCall(account, targetAddress)
  if (gt(amount, String(allowance))) {
    const calldata = erc20Interface.encodeFunctionData('approve', [targetAddress, amount])
    return {
      data: calldata,
      value: '0',
      to: erc20Address,
    }
  }
}

export function getReferral() {
  const referral = window.localStorage.getItem('referral')
  if (isAddress(String(referral))) {
    return referral
  }
  return zeroAddress
}

export const getUserInfo = async (address: string) => {
  const { contract, chainId } = CHAIN_CONFIG
  const { staking } = contract
  const stakeMiningContract = getStakeMiningContract(staking, chainId)
  const claimableRewards = await stakeMiningContract.getClaimableRewards(address)
  const claimedRewards = await stakeMiningContract.getClaimedRewards(address)
  const user = await stakeMiningContract.users(address)
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
    totalMiningAmount: number2Small(String(totalMiningAmount), 18),
    totalStakingAmount: number2Small(String(totalStakingAmount), 18),
    claimableRewards: _claimableRewards,
    claimedRewards: _claimedRewards,
  }
}
