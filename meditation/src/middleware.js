import { auth } from "@/auth"; // adjust this path based on where your auth config is

export default auth((req) => {
  if (!req.auth) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

// Protect these routes
export const config = {
  matcher: ["/dashboard/:path*"], 
};
