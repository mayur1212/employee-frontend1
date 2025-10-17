"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_EMPLOYEES } from "@/graphql/queries";
import Layout from "@/Layout";
import EmployeeForm from "@/components/EmployeeForm";

const HomePage: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_EMPLOYEES);
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  if (loading)
    return (
      <Layout>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: "80px",
            fontSize: "18px",
            animation: "pulse 1.5s infinite",
          }}
        >
          Loading employees...
        </p>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <p
          style={{
            textAlign: "center",
            color: "#ef4444",
            marginTop: "80px",
            fontSize: "18px",
          }}
        >
          Error: {error.message}
        </p>
      </Layout>
    );

  const employees = data?.getAllEmployees ?? [];

  const departments: string[] = Array.from(
    new Set(
      employees
        .map((e: any) => e.department?.name)
        .filter((name: string | undefined): name is string => !!name)
    )
  );

  const filtered = selectedDept
    ? employees.filter((e: any) => e.department?.name === selectedDept)
    : employees;

  return (
    <Layout>
      {/* DASHBOARD HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "30px",
          padding: "16px 24px",
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#1e3a8a",
              margin: "0 0 5px 0",
            }}
          >
            Employee Management
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Overview of all employees and departments
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
            boxShadow: "0 3px 6px rgba(37,99,235,0.3)",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#1d4ed8")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
        >
          + Add Employee
        </button>
      </div>

      {/* FILTER PANEL */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "24px",
          gap: "8px",
        }}
      >
        <label
          style={{
            fontWeight: 600,
            color: "#374151",
            fontSize: "14px",
          }}
        >
          Filter by Department:
        </label>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{
            border: "1px solid #cbd5e1",
            padding: "8px 10px",
            borderRadius: "6px",
            outline: "none",
            fontSize: "14px",
            color: "#374151",
            backgroundColor: "#f9fafb",
            transition: "0.2s",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #60a5fa")}
          onBlur={(e) => (e.target.style.border = "1px solid #cbd5e1")}
        >
          <option value="">All</option>
          {departments.map((dept: string) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* EMPLOYEE TABLE */}
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          padding: "16px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "15px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f1f5f9",
                borderBottom: "2px solid #e2e8f0",
              }}
            >
              {["Name", "Position", "Department", "Salary"].map((header) => (
                <th
                  key={header}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    color: "#1e3a8a",
                    fontWeight: "600",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp: any, index: number) => (
              <tr
                key={emp.id}
                onClick={() => (window.location.href = `/employee/${emp.id}`)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                  cursor: "pointer",
                  transition: "background-color 0.2s, transform 0.1s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0f2fe";
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f9fafb" : "#ffffff";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <td
                  style={{
                    padding: "10px 16px",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  {emp.name}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    color: "#4b5563",
                  }}
                >
                  {emp.position}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    color: "#4b5563",
                  }}
                >
                  {emp.department?.name}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontWeight: "600",
                    color: "#16a34a",
                  }}
                >
                  ${emp.salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPLOYEE FORM MODAL */}
      {showForm && (
        <EmployeeForm
          onAdded={() => {
            refetch();
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </Layout>
  );
};

export default HomePage;
