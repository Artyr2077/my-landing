import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    // Проверка авторизации (cookie admin-auth)
    // Fastest way: Parse cookie header directly, since Next.js API route context may not provide cookies API
    const cookieHeader = request.headers.get("cookie") || "";
    const isAuthed = cookieHeader.split(";").some(c => {
      const [name, value] = c.trim().split("=");
      return name === "admin-auth" && value === "true";
    });
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400 });
    }

    const { status } = await request.json();

    const allowedStatuses = ["new", "read", "contacted"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || "Server error" }, { status: 500 });
  }
}