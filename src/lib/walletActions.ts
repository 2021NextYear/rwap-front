import { wagmiConfig } from '@/constants'
import type { TransactionParame, TypedDataParame } from '@/types'
import {
  sendTransaction as wagmiSendTransaction,
  signMessage as wagmiSignMessage,
  signTypedData as wagmiSignTypedData,
  estimateGas,
  switchChain,
} from '@wagmi/core'
import { getRPCProvider } from '.'

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
  try {
    let gas = 1500000n
    // _gas = BigInt(
    // 	await estimateGas(wagmiConfig, {
    //         to:params.to,
    //         data:params.data,
    //         value:params.value,
    //         account:params.account as  `0x${string}`
    //     })
    // );
    const _params = { gas, ...params }
    await switchChain(wagmiConfig, { chainId: chainId as any })

    const hash = (await wagmiSendTransaction(wagmiConfig, _params as any)) as string

    const receipt = await getTransactionReceipt(hash, chainId, 200)

    return { hash, success: receipt?.status === 1, receipt }
  } catch (error) {
    console.log('error', error)
  }
}
