import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata = {
  title: 'Блог | WebStudio',
  description: 'Статьи о веб-разработке, дизайне и технологиях',
};

const posts = [
  {
    slug: 'tendencii-veb-designa-2025',
    title: 'Тенденции веб-дизайна в 2025 году',
    excerpt: 'Минимализм, микро-анимации и нестандартная типографика — разбираем главные тренды.',
    date: '15 марта 2025',
    author: 'Анна Смирнова',
  },
  {
    slug: 'zachem-nuzhna-crm',
    title: 'Зачем вашему бизнесу CRM?',
    excerpt: 'Разбираемся, как система управления взаимоотношениями с клиентами помогает увеличивать продажи.',
    date: '2 апреля 2025',
    author: 'Михаил Иванов',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <AnimatedSection>
          <h1 className="text-5xl md:text-6xl font-serif font-semibold mb-6 text-center text-[var(--foreground)]">
            Наш <span className="text-[var(--accent)]">блог</span>
          </h1>
          <p className="text-center text-[var(--muted-foreground)] text-xl mb-16 max-w-2xl mx-auto">
            Мысли, идеи и инсайты о digital-мире
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <AnimatedSection key={post.slug} delay={0.2 + index * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-500 bg-[var(--background)] border border-[var(--border)] cursor-pointer p-6">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-semibold mb-3 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[var(--muted-foreground)] mb-4">{post.excerpt}</p>
                  <div className="text-[var(--accent)] font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Читать далее
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}