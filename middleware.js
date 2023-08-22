import { NextRequest, NextResponse } from "next/server";

export function middleware (req, res) {

  if (req.nextUrl.pathname.startsWith("/user/checkout")) {
    if (req.cookies.get("token_user") === undefined) {
      return NextResponse.redirect(new URL("/auth/user-login", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/auth/user-login")) {
    if (req.cookies.get("token_user") !== undefined) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/auth/user-register")) {
    if (req.cookies.get("token_user") !== undefined) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/auth/admin-login")) {
    if (req.cookies.get("token_admin") !== undefined) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (req.cookies.get("token_admin") === undefined) {
      return NextResponse.redirect(new URL("/auth/admin-login", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard/product")) {
    if (req.cookies.get("token_admin") === undefined) {
      return NextResponse.redirect(new URL("/auth/admin-login", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard/checkout")) {
    if (req.cookies.get("token_admin") === undefined) {
      return NextResponse.redirect(new URL("/auth/admin-login", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard/category")) {
    if (req.cookies.get("token_admin") === undefined) {
      return NextResponse.redirect(new URL("/auth/admin-login", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard/transaction")) {
    if (req.cookies.get("token_admin") === undefined) {
      return NextResponse.redirect(new URL("/auth/admin-login", req.url));
    }
  }

}
