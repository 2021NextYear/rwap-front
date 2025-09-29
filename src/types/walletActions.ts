export interface TransactionParame {
  to: string
  data: string
  value: string
  gas?: bigint
}

export interface TypedDataParame {
  domain: any
  types: any
  message: any
  primaryType: string
}
