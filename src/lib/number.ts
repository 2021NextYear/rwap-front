import { TOKEN_DECIMLS_DEFAULT, TOKEN_DECIMLS_FULL, USD_DECIMLS } from '@/constants'
import Big from 'big.js'

type StrOrNum = string | number

function isBadValue(v: StrOrNum) {
  return !Number(v)
}

function checkValue(number1: StrOrNum, number2: StrOrNum) {
  let _number1 = number1,
    _number2 = number2
  if (isBadValue(number1)) {
    _number1 = '0'
  }
  if (isBadValue(number2)) {
    _number2 = '0'
  }
  return [_number1, _number2]
}

export const number2Small = (
  value: StrOrNum,
  decimals = TOKEN_DECIMLS_FULL,
  tokenDecimls: number = TOKEN_DECIMLS_DEFAULT
): string => {
  if (isBadValue(value)) return '0'

  const number = Big(value)
    .div(10 ** decimals)
    .toFixed(tokenDecimls, Big.roundDown)

  return removeRedundantZero(number)
}

export const number2Big = (value: StrOrNum, decimals = TOKEN_DECIMLS_FULL): string => {
  if (isBadValue(value)) return '0'

  const number = Big(value).mul(Big(10).pow(decimals)).toString()
  return toFixed(number, TOKEN_DECIMLS_FULL)
}

export const toFixed = (value: StrOrNum, decimals = TOKEN_DECIMLS_DEFAULT): string => {
  if (isBadValue(value)) return '0'

  const number = Big(value).toFixed(decimals, Big.roundDown)
  return removeRedundantZero(number)
}

//return number1>number2
export const gt = (number1: StrOrNum, number2: StrOrNum): boolean => {
  const [_number1, _number2] = checkValue(number1, number2)
  return Big(_number1).gt(_number2)
}

//return number1>=number2
export const gte = (number1: StrOrNum, number2: StrOrNum): boolean => {
  const [_number1, _number2] = checkValue(number1, number2)
  return Big(_number1).gte(_number2)
}

export const add = (
  number1: StrOrNum,
  number2: StrOrNum,
  decimals = TOKEN_DECIMLS_FULL
): string => {
  const [_number1, _number2] = checkValue(number1, number2)

  const number = Big(_number1).add(_number2).toString()
  return toFixed(number, decimals)
}

export const minus = (
  number1: StrOrNum,
  number2: StrOrNum,
  decimals = TOKEN_DECIMLS_FULL
): string => {
  const [_number1, _number2] = checkValue(number1, number2)

  const number = Big(_number1).minus(_number2).toString()
  return toFixed(number, decimals)
}

export const times = (
  number1: StrOrNum,
  number2: StrOrNum,
  decimals = TOKEN_DECIMLS_FULL
): string => {
  if (isBadValue(number1) || isBadValue(number2)) {
    return '0'
  }

  const number = Big(number1).times(number2).toString()
  return toFixed(number, decimals)
}

export const div = (
  number1: StrOrNum,
  number2: StrOrNum,
  decimals = TOKEN_DECIMLS_FULL
): string => {
  if (isBadValue(number1) || isBadValue(number2)) {
    return '0'
  }

  const number = Big(number1).div(number2).toString()
  return toFixed(number, decimals)
}

//Remove redundant 0s after the decimal point. ex:2.7890--->2.789
const removeRedundantZero = (value: StrOrNum): string => {
  if (isBadValue(value)) return '0'
  const strV = String(value)
  return strV.includes('.') ? strV.replace(/\.?0+$/, '') : strV
}

export function number2Abbr(value: StrOrNum): string {
  if (isBadValue(value)) return '0'
  let abbrValue = toFixed(value, USD_DECIMLS)
  if (gte(value, 1_000_000_000)) {
    abbrValue = `${number2Small(value, 9, 1)}B`
  } else if (gte(value, 1_000_000)) {
    abbrValue = `${number2Small(value, 6, 1)}M`
  } else if (gte(value, 1_000)) {
    abbrValue = `${number2Small(value, 3, 1)}K`
  }
  return abbrValue
}
