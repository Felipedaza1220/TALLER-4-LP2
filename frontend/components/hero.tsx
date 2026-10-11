import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <Image
        src="/images/hero-gym.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Catálogo de entrenamiento
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-5xl font-bold uppercase leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Rutinas de Gimnasio
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          Consulta ejercicios organizados por grupo muscular, con sus series y repeticiones
          recomendadas para planificar cada sesión.
        </p>
        <a
          href="#ejercicios"
          className="mt-8 inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Explorar ejercicios
        </a>
      </div>
    </section>
  )
}
