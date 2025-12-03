import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);

  const task = tasks.find((t) => t.id === parseInt(id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleUpdate = async updatedTask => {
    try {
      await updateTask(updatedTask);
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container mt-4 d-flex flex-column align-items-center">
        <h1>Dettagli Task</h1>
        <h3>Titolo</h3>
        <p> {task.title}</p>
        <h3>Descrizione</h3>
        <p>{task.description}</p>
        <h3>Stato</h3>
        <p>Status: {task.status}</p>
        <p>Creata il: {new Date(task.createdAt).toLocaleString()}</p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="btn btn-primary"
        >
          Elimini Task
        </button>

        <button
          onClick={() => setShowEditModal(true)}
          className="btn btn-primary"
        >
          Modifica Task
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
        <EditTaskModal
          task={task}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      </div>
    </>
  );
}
