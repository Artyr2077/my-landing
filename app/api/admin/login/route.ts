import { NextResponse } from "next/server";

/**
 * Аутентификация администратора
 * 
 * @param request - HTTP запрос с паролем в теле
 * @returns JSON ответ и устанавливает cookie при успешном входе
 * 
 * @example
 * POST /api/admin/login
 * Body: { "password": "admin123" }
 * 
 * @throws {400} Пароль не указан
 * @throws {401} Неверный пароль
 * @throws {500} Ошибка сервера
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Пароль обязателен" },
        { status: 400 }
      );
    }

    if (password === process.env.ADMIN_PASSWORD) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("admin-auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 часа
        path: "/",
        sameSite: 'strict'
      });
      return res;
    } else {
      return NextResponse.json(
        { success: false, error: "Неверный пароль" },
        { status: 401 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Ошибка запроса" },
      { status: 500 }
    );
  }
}