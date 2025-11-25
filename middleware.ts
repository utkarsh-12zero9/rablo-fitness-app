import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const userId = request.cookies.get("userId")?.value;
    const accCreated = Number(request.cookies.get("accCreated")?.value ?? -1);
    const path = request.nextUrl.pathname;

    if (path === "/manager") {
        return NextResponse.next();
    }

    // Public routes
    if (!userId) {
        if (path === "/login" || path === "/splash") {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // User exists but profile incomplete
    if (userId && accCreated === 0 && path !== "/create-profile" && path !== "/manager") {
        return NextResponse.redirect(new URL("/create-profile", request.url));
    }

    // User exists and profile complete
    if (userId && accCreated === 1 && path !== "/dashboard" && path !== "/manager") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/dashboard", "/create-profile", "/splash", "/manager"],
};