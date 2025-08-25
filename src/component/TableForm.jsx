import React, { useState, useEffect } from "react";

const TableForm = ({ columns, editingRow, onAdd, onCancel }) => {
  const [formData, setFormData] = useState({});

  // Initialize form data
  useEffect(() => {
    const initialData = Object.fromEntries(
      columns
        .filter(
          (col) => col.toLowerCase() !== "actions" && col.toLowerCase() !== "id"
        )
        .map((col) => [col.toLowerCase(), ""])
    );

    if (editingRow) {
      // Pre-populate form when editing
      const editData = { ...initialData };
      Object.keys(editData).forEach((key) => {
        if (editingRow[key] !== undefined) {
          editData[key] = editingRow[key];
        }
      });
      setFormData(editData);
    } else {
      setFormData(initialData);
    }
  }, [columns, editingRow]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);

    // Reset form
    const resetData = Object.fromEntries(
      columns
        .filter(
          (col) => col.toLowerCase() !== "actions" && col.toLowerCase() !== "id"
        )
        .map((col) => [col.toLowerCase(), ""])
    );
    setFormData(resetData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">
          {editingRow ? "Edit Row" : "Add New Row"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {columns.map(
            (column, i) =>
              column.toLowerCase() !== "actions" &&
              column.toLowerCase() !== "id" && (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {column}
                  </label>
                  <input
                    type={column.toLowerCase() === "price" ? "number" : "text"}
                    name={column.toLowerCase()}
                    value={formData[column.toLowerCase()] || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md "
                    required
                  />
                </div>
              )
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 font-medium"
            >
              {editingRow ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableForm;
