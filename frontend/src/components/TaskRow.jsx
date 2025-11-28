import React from 'react';

const TaskRow = React.memo(({ task }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'To do':
        return { backgroundColor: '#dc3545', color: 'white' };
      case 'Doing':
        return { backgroundColor: '#ffc107', color: 'black' }; 
      case 'Done':
        return { backgroundColor: '#198754', color: 'white' }; 
      default:
        return { backgroundColor: '#6c757d', color: 'white' };
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