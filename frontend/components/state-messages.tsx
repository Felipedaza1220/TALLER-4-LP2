import type { ReactNode } from 'react'
import { AlertTriangle, Dumbbell, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({ title = 'No se pudieron cargar los datos', message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-lg border border-destructive/40 bg-destructive/10 px-6 py-12 text-center"
    >
      <AlertTriangle className="size-10 text-destructive" aria-hidden="true" />
      <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-wide">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          <RotateCw aria-hidden="true" />
          Reintentar
        </Button>
      )}
    </div>
  )
}

interface EmptyStateProps {
  title: string
  message: string
  action?: ReactNode
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-border px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-secondary">
        <Dumbbell className="size-7 text-muted-foreground" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-wide">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export function ExerciseCardSkeleton() {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-5" aria-hidden="true">
      <div className="h-5 w-20 animate-pulse rounded bg-secondary" />
      <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-secondary" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-secondary" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-secondary" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="h-14 animate-pulse rounded-md bg-secondary" />
        <div className="h-14 animate-pulse rounded-md bg-secondary" />
      </div>
      <div className="mt-5 h-10 animate-pulse rounded-md bg-secondary" />
    </div>
  )
}
