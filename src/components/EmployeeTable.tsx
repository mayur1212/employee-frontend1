"use client";

import React from "react";
import { Employee } from "@/types";
import Link from "next/link";

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <table className="min-w-full bg-white rounded shadow overflow-hidden">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Position</th>
          <th className="px-4 py-2 text-left">Department</th>
          <th className="px-4 py-2 text-left">Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id} className="border-b hover:bg-gray-100">
            <td className="px-4 py-2">
              <Link href={`/employee/${emp.id}`} className="text-blue-600 hover:underline">
                {emp.name}
              </Link>
            </td>
            <td className="px-4 py-2">{emp.position}</td>
            <td className="px-4 py-2">{emp.department.name}</td>
            <td className="px-4 py-2">${emp.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
