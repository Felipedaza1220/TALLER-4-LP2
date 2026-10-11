export interface Categoria {
  id: number
  nombre: string
}

export interface Ejercicio {
  id: number
  nombre: string
  descripcion: string
  series: number
  repeticiones: number
  categoria_id: number
  categoria: Categoria | null
}
