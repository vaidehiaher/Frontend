import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";

function App() {
  const [name, setName] = useState("");

  const data = [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 28 },
    { id: 3, name: "Charlie", age: 30 },
  ];

  const columns = [
    { key: "id", title: "ID", dataIndex: "id", sortable: true },
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  return (
    <div className="p-10 space-y-10">
      {/* ✅ InputField */}
      <div className="w-80">
        <InputField
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText="Please enter your full name"
        />
      </div>

      {/* ✅ DataTable */}
      <DataTable
        data={data}
        columns={columns}
        selectable
        onRowSelect={(rows) => console.log("Selected:", rows)}
      />
    </div>
  );
}

export default App;

