import { useEffect, useState } from "react";

interface ISizeProps {
  width: undefined | number;
  height: undefined | number;
}

export function useDeviceType() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState<ISizeProps>({
    width: undefined,
    height: undefined,
  });
  const [isWebBrowser, setIsWebBrowser] = useState(true);

  function handleResize() {
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }

  useEffect(() => {
    var UA = navigator.userAgent;
    const hasTouchScreen =
      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
      /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    setIsWebBrowser(!hasTouchScreen);

    return () => {
      setIsWebBrowser(false);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return { windowSize, isWebBrowser };
}
