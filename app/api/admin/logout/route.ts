import { NextResponse } from "next/server";

/**
 * Выход администратора (удаление cookie)
 * 
 * @returns Редирект на страницу входа и очистка cookie
 * 
 * @example
 * POST /api/admin/logout
 * 
 * @note Удаляет cookie admin-auth и перенаправляет на /admin/login
 */
export async function POST() {
  const response = NextResponse.redirect('/admin/login');
  response.cookies.set('admin-auth', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // Устанавливает дату истечения в прошлом
    path: '/',
  });
  return response;
}