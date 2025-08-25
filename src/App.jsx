import "./App.css";
import TableComponent from "./component/TableComponent";
import { ToastContainer } from "react-toastify";

import { columns,row } from "./MOCK_DATA.js";



function App() {
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product Table</h1>
        <TableComponent columns={columns} rows={row} />
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
