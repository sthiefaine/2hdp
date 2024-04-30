import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  secret: `${process.env.AUTH_SECRET}`,
  adapter: PrismaAdapter(prisma),
  pages: {},
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (nextUrl.pathname.startsWith("/api/auth")) {
        return true;
      }
      console.log("nextUrl.pathname", auth);
      if (nextUrl.pathname.startsWith("/api")) {
        if (isLoggedIn) {
          return true;
        } else {
          return NextResponse.json("Invalid auth token", { status: 401 });
        }
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
