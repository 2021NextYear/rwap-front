import { isAddress, zeroAddress } from 'viem'

export function getReferral() {
  const referral = window.localStorage.getItem('referral')
  if (isAddress(String(referral))) {
    return referral
  }
  return zeroAddress
}
