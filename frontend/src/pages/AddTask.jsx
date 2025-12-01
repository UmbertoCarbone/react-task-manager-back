import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const { addTask } = useContext(GlobalContext);
  const navigate = useNavigate();

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const taskTitleError = useMemo(() => {
    if (!title.trim()) return "Il nome della Task non puo' essere vuoto";
    if ([...title].some((char) => symbols.includes(char)))
      return "Il nome della task contiene simboli";
    return "";
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskTitleError) return;
    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };
    try {
      await addTask(newTask);
      alert("Task creata con successo!");
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "";
      navigate("/")
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Aggiungi Task</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">
            Nome del task
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          {taskTitleError && <p style={{ color: "red" }}>{taskTitleError}</p>}
          <div className="mb-3">
            <label className="form-label">
              Descrizione
              <textarea
                className="form-control"
                id="description"
                rows="3"
                ref={descriptionRef}
              ></textarea>
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Stato
            </label>
            <select
              className="form-select"
              id="status"
              ref={statusRef}
              defaultValue="To do"
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={taskTitleError}
        >
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}
