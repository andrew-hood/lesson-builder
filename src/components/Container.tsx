import clsx from 'clsx'

interface Props {
  className?: string
  children?: any
}

export function Container({ className, ...props }: Props) {
  return (
    <div
      className={clsx('mx-auto max-w-5xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
