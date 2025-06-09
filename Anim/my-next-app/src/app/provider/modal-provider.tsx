"use client";

import { useEffect, useState } from "react";
import CardModal from "../components/modal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <CardModal />
    </>
  );
};
