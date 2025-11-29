import React from 'react';

const TaskRow = React.memo(({ task }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'To do':
        return { backgroundColor: '#dc3545' };
      case 'Doing':
        return { backgroundColor: '#ffc107' }; 
      case 'Done':
        return { backgroundColor: '#198754' }; 
      default:
        return { backgroundColor: '#6c757d' };
    }
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>
        <span 
          className="badge" 
          style={getStatusStyle(task.status)}
        >
          {task.status}
        </span>
      </td>
      <td>{new Date(task.createdAt).toLocaleString()}</td>
    </tr>
  );
});



export default TaskRow;