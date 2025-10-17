"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import Layout from "@/Layout";
import { GET_EMPLOYEE_DETAILS } from "@/graphql/queries";
import { Employee, Department } from "@/types";

interface EmployeeDetailData {
  getEmployeeDetails: Employee;
}

interface EmployeeDetailVars {
  id: string;
}

interface EmployeeDetailPageProps {
  params: { id: string };
}

const EmployeeDetailPage: React.FC<EmployeeDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const { data, loading, error } = useQuery<
    EmployeeDetailData,
    EmployeeDetailVars
  >(GET_EMPLOYEE_DETAILS, {
    variables: { id },
    skip: !id,
  });

  if (loading)
    return (
      <Layout>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: "50px",
            fontSize: "18px",
            animation: "pulse 1.5s infinite",
          }}
        >
          Loading employee details...
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
            marginTop: "50px",
            fontSize: "18px",
          }}
        >
          Error: {error.message}
        </p>
      </Layout>
    );

  if (!data?.getEmployeeDetails)
    return (
      <Layout>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: "50px",
            fontSize: "18px",
          }}
        >
          Employee not found
        </p>
      </Layout>
    );

  const { name, position, department, salary } = data.getEmployeeDetails;
  const departmentName =
    typeof department === "string"
      ? department
      : (department as Department).name;

  return (
    <Layout>
      <div
        style={{
          maxWidth: "480px",
          margin: "60px auto",
          padding: "32px 28px",
          background: "linear-gradient(145deg, #ffffff, #f3f4f6)",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "36px",
              fontWeight: "700",
              margin: "0 auto 16px auto",
              boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "700",
              marginBottom: "6px",
              color: "#1f2937",
            }}
          >
            {name}
          </h2>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "15px" }}>
            Employee Profile Overview
          </p>
        </div>

        {/* Info Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "20px",
          }}
        >
          {/* Position */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#f9fafb",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
            }}
          >
            <span style={{ fontWeight: 600, color: "#374151" }}>Position:</span>
            <span style={{ color: "#111827" }}>{position}</span>
          </div>

          {/* Department */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#f9fafb",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
            }}
          >
            <span style={{ fontWeight: 600, color: "#374151" }}>Department:</span>
            <span style={{ color: "#111827" }}>{departmentName}</span>
          </div>

          {/* Salary */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#f9fafb",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
            }}
          >
            <span style={{ fontWeight: 600, color: "#374151" }}>Salary:</span>
            <span
              style={{
                color: "#16a34a",
                fontWeight: "600",
              }}
            >
              ${salary}
            </span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "28px",
            width: "100%",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 4px 8px rgba(37,99,235,0.3)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1d4ed8";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          ← Back to Home
        </button>
      </div>
    </Layout>
  );
};

export default EmployeeDetailPage;
