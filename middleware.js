// middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { syncUserToSupabase } from "@/lib/syncUserToSupabase"; // ✅ correct
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (isPublicRoute(req)) return NextResponse.next();
  if (isProtectedRoute(req)) {
    if (!userId) return redirectToSignIn();

    try {
      await syncUserToSupabase(userId); // ✅ safe to run on server only
    } catch (err) {
      console.error("Error syncing user in middleware:", err.message);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
