'use client'

import { cn } from '@/lib/utils'
import type { Categoria } from '@/lib/types'

interface CategoryFilterProps {
  categorias: Categoria[] | undefined
  isLoading: boolean
  hasError: boolean
  selectedId: number | null
  onSelect: (id: number | null) => void
}

export function CategoryFilter({ categorias, isLoading, hasError, selectedId, onSelect }: CategoryFilterProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2" aria-busy="true" aria-label="Cargando categorías">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-secondary" />
        ))}
      </div>
    )
  }

  if (hasError) {
    return (
      <p className="text-sm text-muted-foreground">
        No se pudieron cargar las categorías. Se muestran todos los ejercicios.
      </p>
    )
  }

  const options = [{ id: null, nombre: 'Todas' }, ...(categorias ?? [])]

  return (
    <div
      role="radiogroup"
      aria-label="Filtrar por categoría"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {options.map((categoria) => {
        const active = categoria.id === selectedId
        return (
          <button
            key={categoria.id ?? 'todas'}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(categoria.id)}
            className={cn(
              'h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground',
            )}
          >
            {categoria.nombre}
          </button>
        )
      })}
    </div>
  )
}
