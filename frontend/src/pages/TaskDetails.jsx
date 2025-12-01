import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);

  const task = tasks.find((t) => t.id === parseInt(id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!task) {
    return <h2>Task non trovata</h2>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task elimiinata");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Dettagli Task</h1>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Creata il: {new Date(task.createdAt).toLocaleString()}</p>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="btn btn-primary"
      >
        Elimini Task
      </button>
      {/* Modale */}
      <Modal
        title="Elimina Task"
        content={<p>sei sicuro di eliminare la task?</p>}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
    </div>
  );
}
