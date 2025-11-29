import { useState, useEffect } from "react";

export default function useTasks() {
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

  const addTask = async (newTask) => {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) => [...prev, task]);
  };

  const removeTask = () => {
    //effettua operazione
  };

  const updateTask = () => {
    //effettua operazione
  };
  return { tasks, addTask, removeTask, updateTask };
}
