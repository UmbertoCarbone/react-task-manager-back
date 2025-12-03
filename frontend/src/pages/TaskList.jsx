import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  
  // MILESTONE 12: Stati per la ricerca con debounce
  const [search, setSearch] = useState(""); // Valore immediato dell'input
  const [searchQuery, setSearchQuery] = useState(""); // Valore con debounce per filtrare

  const sortIcon = sortOrder === 1 ? "+" : "-";

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  // MILESTONE 12: Funzione debounce ottimizzata con useCallback
  // Ritarda l'aggiornamento di searchQuery di 500ms dopo che l'utente smette di digitare
  const debouncedSearch = useCallback(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [search]);

  // MILESTONE 12: Attiva il debounce ogni volta che search cambia
  useMemo(() => {
    const cleanup = debouncedSearch();
    return cleanup;
  }, [debouncedSearch]);

  // MILESTONE 12: Modifica useMemo per filtrare E ordinare
  const sortedTask = useMemo(() => {
    // STEP 1: Filtra le task per searchQuery (case-insensitive)
    const filteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // STEP 2: Ordina i risultati filtrati
    return [...filteredTasks].sort((a, b) => {
      let comparison;
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const statusOptions = ['To do', 'Doing', 'Done'];
        comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
      } else if (sortBy === "createdAt") {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      }
      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder, searchQuery]); // Include searchQuery nelle dipendenze

  return (
    <div className="container mt-4">
      <h1>Lista Task</h1>

      {/* MILESTONE 12: Input di ricerca controllato con feedback visivo */}
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control"
          placeholder="Cerca task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* MILESTONE 12: Mostra risultati della ricerca */}
        {searchQuery && (
          <small className="text-muted">
            Risultati per: "{searchQuery}" ({sortedTask.length} task trovate)
          </small>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>
                Nome {sortBy === "title" && sortIcon}
              </th>
              <th onClick={() => handleSort("status")}>Stato
                {sortBy === "status" && sortIcon}
              </th>
              <th onClick={() => handleSort("createdAt")}>Data di Creazione
                {sortBy === "createdAt" && sortIcon}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* MILESTONE 12: Gestione caso nessun risultato */}
            {sortedTask.length > 0 ? (
              sortedTask.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  {searchQuery ? "Nessuna task trovata" : "Nessuna task disponibile"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}