import { notFound } from 'next/navigation';
import Link from 'next/link';

const posts = [
  {
    slug: 'tendencii-veb-designa-2025',
    title: 'Тенденции веб-дизайна в 2025 году',
    content: `
      <p>Минимализм, микро-анимации и нестандартная типографика — разбираем главные тренды 2025 года.</p>
      
      <h2>1. Минимализм с характером</h2>
      <p>В 2025 году минимализм никуда не уходит, но становится более выразительным. Дизайнеры добавляют "изюминки" — неожиданные акценты, смелые шрифты, интерактивные элементы.</p>
      
      <h2>2. Микро-анимации</h2>
      <p>Каждая мелочь оживает: кнопки плавно меняют цвет, карточки подпрыгивают при наведении, фон переливается. Это создает wow-эффект и удерживает внимание.</p>
      
      <h2>3. Нестандартная типографика</h2>
      <p>Дизайнеры экспериментируют с размерами, наложениями и анимацией текста. Заголовки становятся главным визуальным элементом.</p>
    `,
    date: '15 марта 2025',
    author: 'Анна Смирнова',
  },
  {
    slug: 'zachem-nuzhna-crm',
    title: 'Зачем вашему бизнесу CRM?',
    content: `
      <p>Разбираемся, как система управления взаимоотношениями с клиентами помогает увеличивать продажи и экономить время.</p>
      
      <h2>Что такое CRM?</h2>
      <p>CRM (Customer Relationship Management) — это система, которая хранит всю историю взаимодействия с клиентами: звонки, письма, сделки, задачи.</p>
      
      <h2>5 причин внедрить CRM</h2>
      <ul>
        <li>Вся информация о клиентах в одном месте</li>
        <li>Автоматизация рутинных задач</li>
        <li>Контроль работы менеджеров</li>
        <li>Аналитика и прогнозирование продаж</li>
        <li>Повышение лояльности клиентов</li>
      </ul>
      
      <h2>Как выбрать CRM?</h2>
      <p>Обратите внимание на простоту интерфейса, возможности интеграции и стоимость. Лучше начать с бесплатной версии, чтобы протестировать.</p>
    `,
    date: '2 апреля 2025',
    author: 'Михаил Иванов',
  },
];

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        {/* Кнопка назад */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors mb-8 group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="rotate-180 group-hover:-translate-x-1 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Назад к блогу
        </Link>

        {/* Мета-информация */}
        <div className="flex items-center gap-4 text-[var(--muted-foreground)] mb-4">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-8 text-[var(--foreground)]">
          {post.title}
        </h1>

        {/* Контент */}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          style={{ color: 'var(--foreground)' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}