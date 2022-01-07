import React, { createContext, useContext, useState } from 'react';
const Context = createContext({});

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    languages: null,
    language: null,
    loading: false,
    alert: null,
  });

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default function useContextState() {
  return useContext(Context);
}
