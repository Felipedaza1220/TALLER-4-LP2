'use client'

import useSWR from 'swr'
import { getCategorias, getEjercicio, getEjercicios, type ApiError } from '@/lib/api'
import type { Categoria, Ejercicio } from '@/lib/types'

const swrOptions = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}

export function useCategorias() {
  return useSWR<Categoria[], ApiError>('categorias', getCategorias, swrOptions)
}

export function useEjercicios(categoriaId: number | null) {
  return useSWR<Ejercicio[], ApiError>(
    ['ejercicios', categoriaId],
    () => getEjercicios(categoriaId),
    { ...swrOptions, keepPreviousData: true },
  )
}

export function useEjercicio(id: number | null) {
  return useSWR<Ejercicio, ApiError>(
    id ? ['ejercicio', id] : null,
    () => getEjercicio(id as number),
    swrOptions,
  )
}
