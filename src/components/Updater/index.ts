import { useEffect } from 'react'

import { useReconnect } from 'wagmi'

export function Updater() {
  useWagmiReconnect()

  return null
}

export function useWagmiReconnect() {
  const { reconnect } = useReconnect()
  useEffect(() => {
    reconnect()
  }, [reconnect])
}
