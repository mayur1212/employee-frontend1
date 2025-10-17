"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EMPLOYEE } from "@/graphql/mutations";
import { GET_ALL_EMPLOYEES, GET_ALL_DEPARTMENTS } from "@/graphql/queries";

interface EmployeeFormProps {
  onAdded?: () => void;
  onClose?: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onAdded, onClose }) => {
  const { data } = useQuery(GET_ALL_DEPARTMENTS);
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
  });

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    departmentId: "",
    salary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEmployee({
      variables: {
        name: formData.name,
        position: formData.position,
        departmentId: formData.departmentId,
        salary: parseFloat(formData.salary),
      },
    });

    if (onAdded) onAdded();
    setFormData({ name: "", position: "", departmentId: "", salary: "" });
    if (onClose) onClose();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "42px", // ✅ uniform height for all fields
    border: "1px solid #d1d5db",
    padding: "10px 12px",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          border: "1px solid rgba(229, 231, 235, 0.8)",
          padding: "28px 30px 32px",
          maxWidth: "420px",
          width: "100%",
          position: "relative",
          transform: "translateY(0)",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "none",
            border: "none",
            color: "#6b7280",
            fontSize: "20px",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#111827")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          ✕
        </button>

        {/* Title */}
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 700,
            textAlign: "center",
            color: "#1f2937",
            marginBottom: "20px",
            letterSpacing: "0.3px",
          }}
        >
          Add New Employee
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {/* Full Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
            />
          </div>

          {/* Position */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter Position"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
            />
          </div>

          {/* Department */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Department
            </label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                backgroundColor: "#fff",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
            >
              <option value="">Select Department</option>
              {data?.getAllDepartments.map(
                (dept: { id: string; name: string }) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Salary */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Salary (in USD)
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter Salary"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            style={{
              background:
                "linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)",
              color: "#fff",
              padding: "12px 16px",
              height: "44px", // same visual height as inputs
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "15px",
              marginTop: "8px",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(59,130,246,0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ➕ Add Employee
          </button>
        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default EmployeeForm;
