import { Suspense } from 'react'
import { Hero } from '@/components/hero'
import { ExerciseCatalog } from '@/components/exercise-catalog'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Suspense fallback={null}>
          <ExerciseCatalog />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
