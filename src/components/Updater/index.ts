import { useEffect } from 'react'
import { isAddress } from 'viem'

import { useReconnect } from 'wagmi'

export function Updater() {
  useWagmiReconnect()
  useSaveReferral()
  return null
}

export function useWagmiReconnect() {
  const { reconnect } = useReconnect()
  useEffect(() => {
    reconnect()
  }, [reconnect])
}

function useSaveReferral() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const referral = params.get('referral')
    if (referral && isAddress(referral)) {
      window.localStorage.setItem('referral', referral)
    }
  }, [])
}
