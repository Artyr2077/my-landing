import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/**
 * GET /api/admin/leads - Получить список всех лидов
 * 
 * @param request - HTTP запрос
 * @returns JSON со списком лидов или ошибкой
 * 
 * @requires Авторизация через cookie admin-auth=true
 * 
 * @example
 * GET /api/admin/leads
 * 
 * Успешный ответ (200):
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "id": 1,
 *       "name": "Иван Петров",
 *       "email": "ivan@mail.com",
 *       "message": "Хочу заказать сайт",
 *       "status": "new",
 *       "created_at": "2024-01-01T12:00:00"
 *     }
 *   ]
 * }
 * 
 * Ответ при отсутствии авторизации (401):
 * {
 *   "success": false,
 *   "error": "Unauthorized"
 * }
 * 
 * Ответ при ошибке сервера (500):
 * {
 *   "success": false,
 *   "error": "Ошибка базы данных"
 * }
 */
export async function GET(request: Request) {
  try {
    // Проверка авторизации через cookie
    const cookieHeader = request.headers.get("cookie") || "";
    const isAuthed = cookieHeader.split(";").some(c => {
      const [name, value] = c.trim().split("=");
      return name === "admin-auth" && value === "true";
    });
    
    if (!isAuthed) {
      return NextResponse.json({ 
        success: false, 
        error: "Unauthorized" 
      }, { status: 401 });
    }

    // Получаем данные из Supabase
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      data 
    });
  } catch (e: any) {
    console.error("Server error:", e);
    return NextResponse.json({ 
      success: false, 
      error: e.message || "Internal server error" 
    }, { status: 500 });
  }
}