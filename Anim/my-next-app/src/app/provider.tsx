"use client";
import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import useAuthStore from "./store/auth-context";
import { Session } from "next-auth";

interface Props {
  children: React.ReactNode;
  pageProps?: {
    session?: Session | null;
  };
}

function TokenHydrator() {
  const { data: session } = useSession();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  useEffect(() => {
    if (session?.access_token) {
      const expiresIn = session.expires_in ?? 0;
      setAccessToken(session.access_token, Date.now() + expiresIn * 1000);
    }
    if (session?.refresh_token) {
      setRefreshToken(session.refresh_token);
    }
  }, [session, setAccessToken, setRefreshToken]);

  return null;
}

const Provider = ({ children, pageProps = {} }: Props) => {
  return (
    <SessionProvider session={pageProps.session}>
      <TokenHydrator />
      {children}
    </SessionProvider>
  );
};

export default Provider;
