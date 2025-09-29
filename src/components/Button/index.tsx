import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '../ui/button'
import { Loading2 } from '@/components/Loading'

export interface ButtonProps extends ShadcnButtonProps {
  loading?: boolean
}

export function Button({ loading = false, children, ...props }: ButtonProps) {
  return (
    <ShadcnButton {...props}>
      {children} {loading && <Loading2 />}
    </ShadcnButton>
  )
}
