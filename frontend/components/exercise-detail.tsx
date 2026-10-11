'use client'

import Link from 'next/link'
import { ArrowLeft, Repeat, Layers } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { CategoryBadge, StatBlock } from '@/components/exercise-card'
import { ErrorState } from '@/components/state-messages'
import { useEjercicio } from '@/hooks/use-gym-data'
import { cn } from '@/lib/utils'

export function ExerciseDetail({ id }: { id: number | null }) {
  const { data, error, isLoading, mutate } = useEjercicio(id)

  const backHref = data?.categoria_id ? `/?categoria=${data.categoria_id}#ejercicios` : '/#ejercicios'

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href={backHref} className={cn(buttonVariants({ variant: 'ghost' }), '-ml-3 text-muted-foreground')}>
        <ArrowLeft aria-hidden="true" />
        Volver a ejercicios
      </Link>

      <div className="mt-6">
        {id === null ? (
          <ErrorState title="Ejercicio no válido" message="El identificador del ejercicio no es válido." />
        ) : error ? (
          <ErrorState
            title={error.status === 404 ? 'Ejercicio no encontrado' : 'No se pudo cargar el ejercicio'}
            message={error.message}
            onRetry={error.status === 404 ? undefined : () => mutate()}
          />
        ) : isLoading || !data ? (
          <DetailSkeleton />
        ) : (
          <article className="rounded-xl border border-border bg-card p-6 sm:p-10">
            <CategoryBadge nombre={data.categoria?.nombre ?? 'Sin categoría'} />
            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance sm:text-5xl">
              {data.nombre}
            </h1>

            <dl className="mt-8 grid grid-cols-2 gap-4">
              <StatBlock label="Series" value={data.series} large />
              <StatBlock label="Repeticiones" value={data.repeticiones} large />
            </dl>

            <section className="mt-8 border-t border-border pt-8" aria-labelledby="descripcion-title">
              <h2 id="descripcion-title" className="font-display text-xl font-semibold uppercase tracking-wide">
                Descripción
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">{data.descripcion}</p>
            </section>

            <section className="mt-8 rounded-lg bg-secondary/60 p-5" aria-labelledby="resumen-title">
              <h2 id="resumen-title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Resumen de la rutina
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Layers className="size-4 text-primary" aria-hidden="true" />
                  {`Realiza ${data.series} ${data.series === 1 ? 'serie' : 'series'}`}
                </li>
                <li className="flex items-center gap-2">
                  <Repeat className="size-4 text-primary" aria-hidden="true" />
                  {`${data.repeticiones} repeticiones por serie · ${data.series * data.repeticiones} en total`}
                </li>
              </ul>
            </section>
          </article>
        )}
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-10" aria-busy="true" aria-label="Cargando ejercicio">
      <div className="h-5 w-24 animate-pulse rounded bg-secondary" />
      <div className="mt-4 h-12 w-2/3 animate-pulse rounded bg-secondary" />
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="h-24 animate-pulse rounded-md bg-secondary" />
        <div className="h-24 animate-pulse rounded-md bg-secondary" />
      </div>
      <div className="mt-8 space-y-2 border-t border-border pt-8">
        <div className="h-4 w-full animate-pulse rounded bg-secondary" />
        <div className="h-4 w-11/12 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  )
}
