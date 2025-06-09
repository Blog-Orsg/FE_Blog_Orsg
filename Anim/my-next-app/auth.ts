import useAuthStore from "@/app/store/auth-context";
import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        if (!username || !password) {
          throw new Error("Invalid credentials");
        }

        const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const user = await response.json();
        if (response.ok && user.data) {
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user };
        token.refresh_token = user.refresh_token;
        token.access_token = user.access_token;

        try {
          const expiresInDate = new Date(user.expires_in);
          const expiresAt = expiresInDate.getTime();

          const setAccessToken = useAuthStore.getState().setAccessToken;
          const setRefreshToken = useAuthStore.getState().setRefreshToken;

          if (!isNaN(expiresAt)) {
            setAccessToken(user.access_token, expiresAt);
          } else {
            console.error("Invalid expiresAt value:", expiresAt);
          }

          setRefreshToken(user.refresh_token);
        } catch (error) {
          console.error("Error saving tokens to state:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as User;
      session.access_token = token.access_token as string;
      session.refresh_token = token.refresh_token as string;
      session.expires_in = token.expiresAt as number;
      return session;
    },
  },
};

export interface EnrichedSession extends Session {
  accesc_token: string;
  refresh_token: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}
