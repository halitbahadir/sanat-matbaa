import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Dynamic import to avoid initialization errors if DB is not available
          const { prisma } = await import("@/lib/prisma");
          const bcrypt = (await import("bcryptjs")).default;

          // Check if prisma is available
          if (!prisma || typeof prisma.user === 'undefined') {
            console.warn("[auth] Database not available - authentication disabled");
            return null;
          }

          const email = String(credentials.email).trim().toLowerCase();

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            console.warn("[auth] User not found:", email);
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.warn("[auth] Invalid password for:", email);
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: (user as any).role || "user",
          };
        } catch (error: any) {
          console.error("[auth] Auth error:", error?.message || error);
          // Return null - allows session endpoint to work without DB
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/giris",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "user";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id || token.sub;
        (session.user as any).role = token.role || "user";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key-change-in-production",
  debug: process.env.NODE_ENV === "development",
};

