import { CHAIN_CONFIG } from '@/constants'
import { getBalanceCheckerContract, number2Small } from '@/lib'
import { useMemo } from 'react'
import useSWR from 'swr'
import { zeroAddress } from 'viem'
import { useAccount } from 'wagmi'

export function useBalance() {
  const { address } = useAccount()
  const { getBalance, usdt, rwat } = CHAIN_CONFIG.contract
  const balanceCheckerContract = getBalanceCheckerContract(getBalance, CHAIN_CONFIG.chainId)
  const { data = [], error } = useSWR<bigint[]>(
    address || null,
    () => balanceCheckerContract.balances([address], [zeroAddress, usdt, rwat]),
    {
      refreshInterval: 10 * 1000,
      focusThrottleInterval: 10 * 1000,
    }
  )

  return useMemo(() => {
    const balanceMap: Record<string, string> = {}

    ;['BNB', 'USDT', 'RWAT'].map((v, i) => {
      const balance = number2Small(String(data[i] || 0), 18)
      balanceMap[v] = balance
    })
    return balanceMap
  }, [data])
}
