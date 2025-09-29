import { getChainConfig } from '@/constants'
import type { Interface } from 'ethers'
import { getMulticall3Contract } from './contractInstance'

export async function multipleContractSingleDataFetcher<T>(
  args: null | [string[], string, Interface, (string[] | bigint[])?],
  chainId: number
): Promise<T[]> {
  if (!args) return []
  const [addresses, method, contractInterface, params] = args
  const mutilCallContract = getMulticall3Contract(
    getChainConfig(chainId).contracts.mutilCall,
    chainId
  )

  const calls = addresses.map(v => ({
    target: v,
    allowFailure: true,
    callData: contractInterface.encodeFunctionData(method, params || undefined),
  }))

  const results = await mutilCallContract.aggregate3.staticCall(calls)

  const data = results.map(({ success, returnData }) =>
    success && returnData !== '0x' ? contractInterface.decodeFunctionResult(method, returnData) : []
  ) as T[]
  return data
}

export async function singleContractMultipleDataFetcher<T>(
  args: null | [string, string[], Interface, string[][]?],
  chainId: number
): Promise<T[]> {
  if (!args) return []

  const [address, methods, contractInterface, params] = args
  const mutilCallContract = getMulticall3Contract(
    getChainConfig(chainId).contracts.mutilCall,
    chainId
  )

  const calls = methods.map((v, index) => ({
    target: address,
    allowFailure: true,
    callData: contractInterface.encodeFunctionData(v, params ? params[index] : undefined),
  }))

  const results = await mutilCallContract.aggregate3.staticCall(calls)

  const data = results.map(({ success, returnData }, index) =>
    success && returnData !== '0x'
      ? contractInterface.decodeFunctionResult(methods[index], returnData)
      : []
  ) as T[]
  return data
}

export async function singleContractSingleDataFetcher<T>(
  args: null | [string, string, Interface, string[][]?],
  chainId: number
): Promise<T[]> {
  if (!args) return []

  const [address, method, contractInterface, params] = args
  const mutilCallContract = getMulticall3Contract(
    getChainConfig(chainId).contracts.mutilCall,
    chainId
  )

  const calls = (params || []).map(v => ({
    target: address,
    allowFailure: true,
    callData: contractInterface.encodeFunctionData(method, v || undefined),
  }))
  const results = await mutilCallContract.aggregate3.staticCall(calls)
  const data = results.map(({ success, returnData }) =>
    success && returnData !== '0x' ? contractInterface.decodeFunctionResult(method, returnData) : []
  ) as T[]
  return data
}
