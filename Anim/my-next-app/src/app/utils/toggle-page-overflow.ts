import { useEffect } from "react";

export const hidePageOverflow = () => {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";
  document.documentElement.style.setProperty("padding-right", scrollbarWidth);

  document.documentElement.classList.add("overflow-clip");
};

export const showPageOverflow = () => {
  document.documentElement.style.removeProperty("padding-right");
  document.documentElement.classList.remove("overflow-clip");
};

export const useHidePageOverflow = (hide: boolean) => {
  useEffect(() => {
    if (hide) {
      hidePageOverflow();
    } else {
      showPageOverflow();
    }
  }, [hide]);
};
