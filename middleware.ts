import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const userId = request.cookies.get("userId")?.value;
    const accCreated = Number(request.cookies.get("accCreated")?.value ?? -1);
    const path = request.nextUrl.pathname;

    // Public route
    if (!userId) {
        if (path !== "/login") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }

    // User exists but profile incomplete
    if (userId && accCreated === 0 && path !== "/create-profile") {
        return NextResponse.redirect(new URL("/create-profile", request.url));
    }

    // User exists and profile complete
    if (userId && accCreated === 1 && path !== "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/dashboard", "/create-profile"],
};