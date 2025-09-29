import { wagmiConfig } from '@/constants'
import type { TransactionParame } from '@/types'
import { sendTransaction as wagmiSendTransaction, estimateGas, switchChain } from '@wagmi/core'
import { getRPCProvider } from '.'
import { getAccount } from '@wagmi/core'

export const sleep = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

export async function getTransactionReceipt(hash: string, chainId: number, time = 2000) {
  for (let i = 0; i < 15; i++) {
    try {
      const res = await getRPCProvider(chainId).getTransactionReceipt(hash)
      if (!res) throw new Error('Tx not find')
      return await res
    } catch (e) {
      await sleep(time)
    }
  }
}

export async function sendTransaction(params: TransactionParame, chainId: number) {
  const { address } = getAccount(wagmiConfig)
  let gas = BigInt(
    await estimateGas(wagmiConfig, {
      to: params.to,
      data: params.data,
      value: params.value,
      account: address,
    })
  )
  gas = (gas / 3n) * 4n
  const _params = { gas, ...params }
  await switchChain(wagmiConfig, { chainId: chainId as any })

  const hash = (await wagmiSendTransaction(wagmiConfig, _params as any)) as string

  const receipt = await getTransactionReceipt(hash, chainId, 200)

  return { hash, success: receipt?.status === 1, receipt }
}
