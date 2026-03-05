import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  try {
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

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
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
    return NextResponse.json({ 
      success: false, 
      error: e.message || "Internal server error" 
    }, { status: 500 });
  }
}