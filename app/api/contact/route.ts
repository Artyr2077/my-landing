import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Получаем данные из тела запроса
    const body = await request.json();
    const { name, email, message } = body;

    console.log('Получены данные:', { name, email, message }); // для отладки

    // Валидация
    const errors = [];

    if (!name || name.trim() === '') {
      errors.push({ field: 'name', message: 'Имя обязательно' });
    }

    if (!email || email.trim() === '') {
      errors.push({ field: 'email', message: 'Email обязателен' });
    } else {
      // Простая проверка email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push({ field: 'email', message: 'Неверный формат email' });
      }
    }

    if (!message || message.trim() === '') {
      errors.push({ field: 'message', message: 'Сообщение обязательно' });
    }

    // Если есть ошибки, возвращаем их
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Сохраняем в Supabase - правильный синтаксис!
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