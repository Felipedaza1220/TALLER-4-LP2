'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CategoryFilter } from '@/components/category-filter'
import { ExerciseCard } from '@/components/exercise-card'
import { EmptyState, ErrorState, ExerciseCardSkeleton } from '@/components/state-messages'
import { useCategorias, useEjercicios } from '@/hooks/use-gym-data'

function parseCategoriaId(value: string | null) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

export function ExerciseCatalog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoriaId = parseCategoriaId(searchParams.get('categoria'))

  const categorias = useCategorias()
  const ejercicios = useEjercicios(categoriaId)

  const selectedCategoria = categorias.data?.find((c) => c.id === categoriaId)
  const isInitialLoading = ejercicios.isLoading && !ejercicios.data
  const isRefreshing = ejercicios.isValidating && !!ejercicios.data

  function handleSelect(id: number | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (id) params.set('categoria', String(id))
    else params.delete('categoria')
    const query = params.toString()
    router.replace(query ? `/?${query}#ejercicios` : '/#ejercicios', { scroll: false })
  }

  return (
    <section id="ejercicios" aria-labelledby="ejercicios-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="ejercicios-title" className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            {selectedCategoria ? selectedCategoria.nombre : 'Todos los ejercicios'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
            {ejercicios.data && !ejercicios.error
              ? `${ejercicios.data.length} ${ejercicios.data.length === 1 ? 'ejercicio' : 'ejercicios'}`
              : isInitialLoading
                ? 'Cargando ejercicios…'
                : '\u00A0'}
            {isRefreshing && ' · Actualizando…'}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <CategoryFilter
          categorias={categorias.data}
          isLoading={categorias.isLoading}
          hasError={!!categorias.error}
          selectedId={categoriaId}
          onSelect={handleSelect}
        />
      </div>

      <div className="mt-8" aria-busy={isInitialLoading || isRefreshing}>
        {ejercicios.error ? (
          <ErrorState
            message={ejercicios.error.message}
            onRetry={() => {
              ejercicios.mutate()
              if (categorias.error) categorias.mutate()
            }}
          />
        ) : isInitialLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ExerciseCardSkeleton key={i} />
            ))}
          </div>
        ) : ejercicios.data && ejercicios.data.length === 0 ? (
          <EmptyState
            title="Sin ejercicios"
            message={
              selectedCategoria
                ? `Todavía no hay ejercicios registrados en la categoría ${selectedCategoria.nombre}.`
                : 'Todavía no hay ejercicios registrados.'
            }
            action={
              categoriaId ? (
                <Button variant="outline" onClick={() => handleSelect(null)}>
                  Ver todas las categorías
                </Button>
              ) : null
            }
          />
        ) : (
          <ul className={`grid gap-5 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${isRefreshing ? 'opacity-60' : ''}`}>
            {ejercicios.data?.map((ejercicio) => (
              <li key={ejercicio.id} className="flex">
                <div className="flex w-full flex-col [&>article]:flex-1">
                  <ExerciseCard ejercicio={ejercicio} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
