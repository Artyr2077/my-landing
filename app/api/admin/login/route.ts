import { NextResponse } from "next/server";

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
        secure: true,
        maxAge: 60 * 60 * 24, // 24 часа в секундах
        path: "/"
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