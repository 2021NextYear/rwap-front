import { CHAIN_CONFIG } from '@/constants'
import {
  erc20Interface,
  getErc20Contract,
  getStakeMiningContract,
  gt,
  sendTransaction,
  stakeMiningInterface,
} from '@/lib'
import type { TransactionParame } from '@/types'

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

export async function collectReward() {
  const { contract, chainId } = CHAIN_CONFIG
  const calldata = stakeMiningInterface.encodeFunctionData('claimRewards')
  return sendTransaction({ to: contract.staking, data: calldata, value: '0' }, chainId)
}
