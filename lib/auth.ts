import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: `${process.env.AUTH_SECRET}`,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: `${process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  callbacks: {
    signIn({ profile }) {
      return profile?.email === process.env.EMAIL;
    },
  },
});
