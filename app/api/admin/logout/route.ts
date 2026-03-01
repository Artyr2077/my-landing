import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect('/admin/login');
  response.cookies.set('admin-auth', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: '/',
  });
  return response;
}