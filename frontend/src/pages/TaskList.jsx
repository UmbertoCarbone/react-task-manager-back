import { useContext, useState,useMemo } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const sortIcon = sortOrder === 1 ? "+" : "-";

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };
const sortedTask = useMemo(()=>{
  return[...tasks].sort((a,b)=>{
    let comparison;
    if(sortBy === "title"){
      comparison = a.title.localeCompare(b.title)
    }else if(sortBy ==="status"){
      const statusOptions = ['To do','Doing','Done']
      comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)
    }else if(sortBy ==="createdAt"){
      comparison = new Date(a.createdAt) - new Date(b.createdAt)
    }
    return comparison * sortOrder;
  })
},[tasks,sortBy,sortOrder])


  return (
    <div className="container mt-4">
      <h1>Lista Task</h1>
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
            {sortedTask.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
