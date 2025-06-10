import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext(undefined);

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch debe usarse dentro de SearchProvider");
  return context;
};
