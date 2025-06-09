import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    cognitoGroups: string[];
    access_token: string;
    refresh_token: string;
    expires_in: number;
    id_token: string;
    exp: number;
    role: string;
    token_type: string;
    username: string;
    picture?: string;
    user?: User;
  }

  interface Session {
    user?: User & DefaultSession["user"];
    expires: string;
    error?: string;
    expires_in?: number;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    picture?: string;
  }

  interface JWT {
    access_token?: string;
    refresh_token?: string;
    user?: User;
  }
}
