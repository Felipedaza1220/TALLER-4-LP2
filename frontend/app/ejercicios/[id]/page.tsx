import type { Metadata } from 'next'
import { ExerciseDetail } from '@/components/exercise-detail'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Detalle del ejercicio | Rutinas de Gimnasio',
}

export default async function EjercicioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const parsed = Number(id)
  const ejercicioId = Number.isInteger(parsed) && parsed > 0 ? parsed : null

  return (
    <>
      <main>
        <ExerciseDetail id={ejercicioId} />
      </main>
      <SiteFooter />
    </>
  )
}
