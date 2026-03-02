import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/validation';

/**
 * Обрабатывает отправку контактной формы
 * Сохраняет данные в таблицу leads в Supabase
 * 
 * @param request - HTTP запрос с данными формы (name, email, message)
 * @returns JSON ответ с результатом операции
 * 
 * @example
 * POST /api/contact
 * Body: {
 *   "name": "Иван Петров",
 *   "email": "ivan@example.com", 
 *   "message": "Хочу заказать сайт"
 * }
 * 
 * Успешный ответ:
 * {
 *   "success": true,
 *   "message": "Спасибо! Мы свяжемся с вами"
 * }
 * 
 * Ответ с ошибками валидации:
 * {
 *   "success": false,
 *   "errors": [
 *     { "field": "email", "message": "Неверный формат email" }
 *   ]
 * }
 * 
 * @throws {400} Ошибка валидации
 * @throws {500} Ошибка сервера или базы данных
 */
export async function POST(request: Request) {
  try {
    // Получаем данные из тела запроса
    const body = await request.json();
    const { name, email, message } = body;

    console.log('Получены данные:', { name, email, message }); // для отладки

    // Валидация с использованием библиотеки
    const validationErrors = validateContactForm({ name, email, message });
    
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      );
    }

    // Сохраняем в Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          status: 'new',
        },
      ]);

    // Проверяем ошибку от Supabase
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ошибка при сохранении: ' + error.message 
        },
        { status: 500 }
      );
    }

    // Всё хорошо!
    return NextResponse.json({
      success: true,
      message: 'Спасибо! Мы свяжемся с вами',
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Внутренняя ошибка сервера' 
      },
      { status: 500 }
    );
  }
}