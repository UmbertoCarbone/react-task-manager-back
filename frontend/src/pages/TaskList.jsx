import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import TaskRow from '../components/TaskRow';

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);

   return (
    <div className="container mt-4">
      <h1>Lista Task</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Stato</th>
              <th>Data di Creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}