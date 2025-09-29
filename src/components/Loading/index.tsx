import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

interface IProps {
  size?: 'sm' | 'lg'
}

export function Loading(props: IProps) {
  const { size } = props

  return (
    <div
      className="loading flex justify-center items-center fixed top-1/2 left-1/2 h-1/5 w-2/5 rounded-lg"
      style={{
        transform: 'translate3d(-50%, -50%, 0)',
      }}
    >
      <Loading2 size={size} />
    </div>
  )
}

export function Loading2({ cn, size = 'sm' }: { cn?: string; size?: 'sm' | 'lg' }) {
  const width = size === 'sm' ? 6 : 10

  const _cn = clsx(`ml-1 h-${width} w-${width} animate-spin`, cn)
  return <Loader2 className={_cn} />
}
