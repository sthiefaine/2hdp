"use client";

type MainProviderProps = {
  children: React.ReactNode;
};

export const MainProvider = (props: MainProviderProps) => {
  return <>{props.children}</>;
};
