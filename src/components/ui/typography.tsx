import type React from "react"
import { cn } from "../../lib/utils"

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>
type SpanProps = React.HTMLAttributes<HTMLSpanElement>

export function H1({ className, ...props }: HeadingProps) {
  return (<h1 className={cn("scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance", className)} {...props} />)
}

export function H2({ className, ...props }: HeadingProps) {
  return (<h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)} {...props} />)
}

export function H3({ className, ...props }: HeadingProps) {
  return (<h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />)
}

export function H4({ className, ...props }: HeadingProps) {
  return (<h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />)
}

export function P({ className, ...props }: ParagraphProps) {
  return (<p className={cn("leading-7 text-muted-foreground", className)} {...props} />)
}

export function Lead({ className, ...props }: ParagraphProps) {
  return (
    <p
      className={cn("text-lg text-muted-foreground", className)}
      {...props}
    />
  )
}

export function Small({ className, ...props }: SpanProps) {
  return (
    <small
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export function Muted({ className, ...props }: SpanProps) {
  return (
    <span
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
