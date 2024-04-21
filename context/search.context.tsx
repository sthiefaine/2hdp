"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type Search = {
  title: string;
  season: string;
  fandecoatch: boolean;
};

type SearchContext = {
  search: Search;

  setSearch: (search: Search) => void;
};

const searchContext = createContext<SearchContext>({
  search: {
    title: "",
    season: "",
    fandecoatch: false,
  },
  setSearch: () => {},
});

export const SearchProvider = (props: PropsWithChildren) => {
  const [search, setSearch] = useState({
    title: "",
    season: "",
    fandecoatch: false,
  });

  return (
    <searchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {props.children}
    </searchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(searchContext);

  if (!context) {
    throw new Error("searchContext must be used within a Provider");
  }
  return context;
};
