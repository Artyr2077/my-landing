# WebStudio — Современное веб-агентство

Корпоративный сайт веб-агентства с админ-панелью для управления заявками. Разработан на Next.js 15 с поддержкой темной и светлой темы.

## Технологии

- **Next.js 15** — фреймворк с App Router
- **TypeScript** — типизация
- **TailwindCSS 4** — стилизация
- **Framer Motion** — анимации
- **Supabase** — база данных (PostgreSQL)
- **Heroicons** — кастомные SVG иконки

## Функциональность

### Клиентская часть
- Главная страница с Hero-секцией, услугами и портфолио
- Страница "О нас" с информацией о компании
- Блог со статьями и динамическими маршрутами
- Форма обратной связи с валидацией и toast-уведомлениями
- Переключение между светлой и темной темой (сохраняется в localStorage)
- Полностью адаптивный дизайн для всех устройств

### Админ-панель
- Защищенный вход по паролю
- Просмотр всех заявок из формы
- Изменение статуса заявок (Новая / Прочитана / Связались)
- Детальный просмотр заявки в модальном окне
- Адаптация под тему сайта
## Установка и запуск

### Предварительные требования
- Node.js 20 или выше
- Аккаунт Supabase (бесплатный)

### Пошаговая установка

1. **Клонируй репозиторий**
   ```bash
   git clone https://github.com/your-username/my-landing.git
   cd my-landing
   
2. Установи зависимости

bash
npm install
3. Настрой переменные окружения
Создай файл .env.local в корне проекта:

env
NEXT_PUBLIC_SUPABASE_URL=твой_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=твой_anon_key
ADMIN_PASSWORD=твой_пароль_для_админки

4. Настрой базу данных в Supabase

Создай новый проект в Supabase

Выполни этот SQL для создания таблицы leads:

sql
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

5. Запусти проект

bash
npm run dev
Открой http://localhost:3000