import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем, что запрос идет к админке (но не к странице входа)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Проверяем наличие cookie авторизации
    const isAuthenticated = request.cookies.has('admin-auth');
    
    if (!isAuthenticated) {
      // Если нет cookie - редирект на страницу входа
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Указываем, для каких путей вызывать middleware
export const config = {
  matcher: '/admin/:path*',
};