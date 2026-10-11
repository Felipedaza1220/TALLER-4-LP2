import Link from 'next/link'
import { Dumbbell } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Rutinas de Gimnasio, inicio">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            Rutinas de Gimnasio
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden sm:block">
          <Link
            href="/#ejercicios"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Ejercicios
          </Link>
        </nav>
      </div>
    </header>
  )
}
