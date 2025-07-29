import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeGrid from "./components/EmployeeGrid";

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [editData, setEditData] = useState(null);
  const gridRef = useRef();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/employees");
      setRowData(res.data.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (data) => setEditData(data);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="app__container">
      <h1 className="title">Employee Form</h1>
      <EmployeeForm
        fetchEmployees={fetchEmployees}
        editData={editData}
        setEditData={setEditData}
      />
      <EmployeeGrid
        rowData={rowData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        gridRef={gridRef}
      />
    </div>
  );
};

export default App;
