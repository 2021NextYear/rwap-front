export const sanitizeInput = (
  inputValue: string,
  decimals: number = 6,
  allowNegative: boolean = false
): string => {
  // 1. 根据 allowNegative 决定是否保留负号
  const sanitizedValue = inputValue.replace(allowNegative ? /[^0-9.-]/g : /[^0-9.]/g, '')

  // 2. 处理负号（确保只有一个且在开头）
  let isNegative = false
  let numStr = sanitizedValue
  if (allowNegative) {
    isNegative = sanitizedValue.includes('-')
    numStr = sanitizedValue.replace(/-/g, '') // 移除所有负号，后面再统一添加
  }

  // 3. 移除前导零（但保留 "0" 或 "0.xxx"）
  numStr = numStr.replace(/^0+(?=\d)/, '')

  // 4. 处理小数点
  const hasDecimalPoint = numStr.includes('.')
  if (hasDecimalPoint) {
    let [integerPart, decimalPart = ''] = numStr.split('.')
    integerPart = integerPart || '0' // 处理 ".123" -> "0.123"

    // decimals=0 时直接过滤小数点
    if (decimals === 0) {
      return `${isNegative ? '-' : ''}${integerPart}`
    }

    // 否则截断小数部分
    const truncatedDecimal = decimalPart.slice(0, decimals)
    return `${isNegative ? '-' : ''}${integerPart}${
      truncatedDecimal ? `.${truncatedDecimal}` : '.'
    }`
  }

  // 5. 无小数点时直接返回（若为空则返回 "0"）
  return `${isNegative ? '-' : ''}${numStr}`
}
