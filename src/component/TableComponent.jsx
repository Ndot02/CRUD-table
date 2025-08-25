import React, { useState } from "react";
import { toast } from "react-toastify";
import TableForm from "./TableForm";

const TableComponent = ({ columns, rows: initialRows }) => {
  const [rows, setRows] = useState(initialRows || []);
  const [showForm, setShowForm] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const handleDelete = (row) => {
    setRows(rows.filter((r) => r.id !== row.id));
    toast.error("Row deleted!");
  };

  const handleEdit = (row) => {
    setEditingRow(row);
    setShowForm(true);
  };

  const actions = [
    { label: "Edit", handler: handleEdit },
    { label: "Delete", handler: handleDelete },
  ];

  return (
    <div>
      {showForm && (
        <TableForm
          columns={columns}
          editingRow={editingRow}
          onAdd={(newRow) => {
            if (editingRow) {
              // Update existing row - preserve the original ID
              setRows(
                rows.map((r) =>
                  r.id === editingRow.id ? { ...newRow, id: editingRow.id } : r
                )
              );
              toast.info("Row updated!");
            } else {
              // Add new row - generate proper ID
              const maxId =
                rows.length > 0 ? Math.max(...rows.map((r) => r.id)) : 0;
              setRows([...rows, { ...newRow, id: maxId + 1 }]);
              toast.success("Row added!");
            }
            setEditingRow(null);
            setShowForm(false);
          }}
          onCancel={() => {
            setEditingRow(null);
            setShowForm(false);
          }}
        />
      )}

      <button
        className="border rounded-md bg-cyan-600 text-white p-2 m-2 hover:bg-cyan-700"
        onClick={() => {
          setShowForm(true);
          setEditingRow(null);
        }}
      >
        Add Row
      </button>

      <table className="border border-gray-600 w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-3 py-2 border bg-gray-100 text-left font-semibold"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border px-3 py-2">
                  {column.toLowerCase() === "actions" ? (
                    <div className="flex gap-2">
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => action.handler(row)}
                          className={`px-3 py-1 rounded text-white text-sm font-medium ${
                            action.label === "Delete"
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    // Handle the field name mapping properly
                    row[column.toLowerCase()]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
