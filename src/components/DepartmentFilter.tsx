"use client";

import React from "react";

interface DepartmentFilterProps {
  departments: { id: string; name: string }[];
  selected: string;
  onChange: (deptId: string) => void;
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  departments,
  selected,
  onChange,
}) => {
  return (
    <div style={{ margin: "16px 0" }}>
      <label
        style={{
          marginRight: "8px",
          fontWeight: 600,
          fontFamily: "Arial, sans-serif",
        }}
      >
        Filter by Department:
      </label>

      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{
          border: "1px solid #ccc",
          padding: "6px 10px",
          borderRadius: "5px",
          fontSize: "14px",
          fontFamily: "Arial, sans-serif",
          cursor: "pointer",
          backgroundColor: "#fff",
          outline: "none",
        }}
      >
        <option value="">All</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentFilter;
