import { useState, useRef } from "react";
import Modal from "./Modal";
export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);
  const editFormRef = useRef();

  const changeEditedTask = (key, event) => {
    setEditedTask((prev) => ({ ...prev, [key]: event.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };
  const { title, description, status } = editedTask;

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome Task:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => changeEditedTask("title", e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descrizione:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => changeEditedTask("description", e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stato:</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => changeEditedTask("status", e)}
            >
              {["To do", "Doing", "Done"].map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
}
