import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: `${process.env.AUTH_SECRET}`,
  adapter: PrismaAdapter(prisma),
  pages: {},
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return true;
        // return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    signIn({ profile }) {
      return profile?.email === process.env.EMAIL;
    },
  },
  providers: [
    Google({
      clientId: `${process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET}`,
    }),
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;
