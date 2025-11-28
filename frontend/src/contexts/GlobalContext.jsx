import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log("Lista Aggiornata", data);
      })
      .catch((err) => console.error("Errore nel recupero lista", err));
  }, [apiUrl]);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks, apiUrl }}>
      {children}
    </GlobalContext.Provider>
  );
}
