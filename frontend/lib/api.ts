import type { Categoria, Ejercicio } from './types'

// Rutas relativas: el Reverse Proxy Nginx redirige /api hacia FastAPI.
const API_BASE = '/api'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...init?.headers,
      },
    })
  } catch {
    throw new ApiError(
      'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.',
      0,
    )
  }

  if (!response.ok) {
    let detail = ''
    try {
      const body = await response.json()
      if (typeof body?.detail === 'string') detail = body.detail
    } catch {
      // El cuerpo no es JSON; se usa el mensaje genérico.
    }

    const message =
      detail ||
      (response.status === 404
        ? 'El recurso solicitado no existe.'
        : response.status >= 500
          ? 'El servidor respondió con un error. Inténtalo de nuevo más tarde.'
          : `La petición falló (código ${response.status}).`)

    throw new ApiError(message, response.status)
  }

  try {
    return (await response.json()) as T
  } catch {
    throw new ApiError('La respuesta del servidor no tiene un formato válido.', response.status)
  }
}

export function getCategorias() {
  return request<Categoria[]>('/categorias/')
}

export function getCategoria(id: number) {
  return request<Categoria>(`/categorias/${id}`)
}

export function getEjercicios(categoriaId?: number | null) {
  const query = categoriaId ? `?categoria_id=${encodeURIComponent(categoriaId)}` : ''
  return request<Ejercicio[]>(`/ejercicios/${query}`)
}

export function getEjercicio(id: number) {
  return request<Ejercicio>(`/ejercicios/${id}`)
}
