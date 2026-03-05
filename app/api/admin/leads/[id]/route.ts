import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("=== PATCH REQUEST STARTED ===");
  
  try {
    // В Next.js 15 params нужно развернуть через await
    const { id } = await params;
    console.log("ID from params after await:", id, "Type:", typeof id);

    if (!id) {
      console.log("ID is missing");
      return NextResponse.json({ 
        success: false, 
        error: "ID is required" 
      }, { status: 400 });
    }

    // Проверка авторизации
    const cookieHeader = request.headers.get("cookie") || "";
    console.log("Cookie header:", cookieHeader);
    
    const isAuthed = cookieHeader.split(";").some(c => {
      const [name, value] = c.trim().split("=");
      return name === "admin-auth" && value === "true";
    });
    
    if (!isAuthed) {
      console.log("Unauthorized");
      return NextResponse.json({ 
        success: false, 
        error: "Unauthorized" 
      }, { status: 401 });
    }

    // Получаем тело запроса
    const body = await request.json();
    console.log("Request body:", body);
    
    const { status } = body;

    if (!status) {
      console.log("Status is missing");
      return NextResponse.json({ 
        success: false, 
        error: "Status is required" 
      }, { status: 400 });
    }

    // Конвертируем ID в число (для Supabase)
    const numericId = parseInt(id, 10);
    console.log("Numeric ID for Supabase:", numericId);

    if (isNaN(numericId)) {
      console.log("Invalid ID format");
      return NextResponse.json({ 
        success: false, 
        error: "Invalid ID format" 
      }, { status: 400 });
    }

    console.log("Updating lead in Supabase...");
    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", numericId)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    console.log("Update successful:", data);
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
  } finally {
    console.log("=== PATCH REQUEST ENDED ===");
  }
}