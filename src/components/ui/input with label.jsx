import { Label } from './label'

import { cn } from '@/lib/utils'

export default function InputWithLabel({ className, labelClassName, children, label, htmlFor, ...props }) {
  return (
    <div className={cn('grid w-full max-w-sm items-center gap-1.5', className)} {...props}>
      <Label className={cn('ml-2', labelClassName)} htmlFor={htmlFor}>
        {label}
      </Label>
      {children}
    </div>
  )
}
