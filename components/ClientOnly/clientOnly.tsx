import { useEffect, useState } from "react";

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

export type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const isClient = useIsClient();
  if (!isClient) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};
