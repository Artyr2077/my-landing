import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold text-[var(--accent)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Статья не найдена</h2>
        <p className="text-[var(--muted-foreground)] mb-8">
          Запрошенная статья не существует или была удалена
        </p>
        <Button href="/blog" variant="primary">
          Вернуться к блогу
        </Button>
      </div>
    </div>
  );
}