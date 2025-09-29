export interface AccountState {
  balance: AccountBalance
  fetchBalance: () => void
}

export type AccountBalance = Record<string, Record<string, BalanceDetail>>

export interface BalanceDetail {
  balanceOrigin: string
  balance: string
  balance4: string
  balance6: string
  balance8: string
}
