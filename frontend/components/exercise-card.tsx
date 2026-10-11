import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Ejercicio } from '@/lib/types'

export function CategoryBadge({ nombre }: { nombre: string }) {
  return (
    <span className="inline-flex w-fit items-center rounded-sm bg-primary/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
      {nombre}
    </span>
  )
}

export function StatBlock({ label, value, large }: { label: string; value: number; large?: boolean }) {
  return (
    <div className="rounded-md border border-border bg-secondary/60 px-3 py-2.5">
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className={cn('font-display font-bold leading-tight', large ? 'text-5xl' : 'text-2xl')}>{value}</dd>
    </div>
  )
}

export function ExerciseCard({ ejercicio }: { ejercicio: Ejercicio }) {
  return (
    <article className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50">
      <CategoryBadge nombre={ejercicio.categoria?.nombre ?? 'Sin categoría'} />
      <h3 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight tracking-wide text-balance">
        {ejercicio.nombre}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {ejercicio.descripcion}
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-3">
        <StatBlock label="Series" value={ejercicio.series} />
        <StatBlock label="Repeticiones" value={ejercicio.repeticiones} />
      </dl>
      <Link
        href={`/ejercicios/${ejercicio.id}`}
        className={cn(buttonVariants({ variant: 'outline' }), 'mt-5 h-10 w-full justify-between')}
      >
        Ver detalle
        <span className="sr-only">{` de ${ejercicio.nombre}`}</span>
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </article>
  )
}
