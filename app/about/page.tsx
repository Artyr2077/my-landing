import AnimatedSection from '@/components/AnimatedSection';

export const metadata = {
  title: 'О нас | WebStudio',
  description: 'Узнайте больше о нашей команде и философии',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <AnimatedSection>
          <h1 className="text-5xl md:text-6xl font-serif font-semibold mb-6 text-[var(--foreground)]">
            Мы создаем <span className="text-[var(--accent)]">цифровую эстетику</span>
          </h1>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <p className="text-xl text-[var(--muted-foreground)] mb-12 leading-relaxed">
            WebStudio — это команда дизайнеров и разработчиков, объединенных страстью к минимализму и вниманию к деталям. Мы верим, что лучший интерфейс — тот, который не замечаешь.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <AnimatedSection delay={0.3}>
            <h2 className="text-2xl font-serif font-semibold mb-4 text-[var(--foreground)]">Наша миссия</h2>
            <p className="text-[var(--muted-foreground)]">
              Помогать бизнесу расти, делая сложные технологии простыми и красивыми.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <h2 className="text-2xl font-serif font-semibold mb-4 text-[var(--foreground)]">Наш подход</h2>
            <p className="text-[var(--muted-foreground)]">
              Только ручная работа, только уникальные решения, только проверенные технологии.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}