"use client";

import React from "react";

interface Employee {
  name: string;
  avatar: string;
}

interface WorkstationProps {
  topRow: Employee[];
  bottomRow: Employee[];
  deskImage: string; // ганц ширээний зураг
}

const WorkstationGroup: React.FC<WorkstationProps> = ({
  topRow,
  bottomRow,
  deskImage,
}) => {
  const renderRow = (row: Employee[], isTop: boolean) => (
    <div style={{ display: "flex", gap: "100px", justifyContent: "center" }}>
      {row.map((employee, index) => (
        <div
          key={`${isTop ? "top" : "bottom"}-${index}`}
          style={{ textAlign: "center" }}
        >
          {isTop && (
            <div
              style={{
                fontSize: "12px",
                color: "#2d3748",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              {employee.name}
            </div>
          )}
          <div style={{ fontSize: "28px" }}>{employee.avatar}</div>
          {!isTop && (
            <div
              style={{
                fontSize: "12px",
                color: "#2d3748",
                fontWeight: "bold",
                marginTop: "4px",
              }}
            >
              {employee.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        margin: "40px auto",
        width: "fit-content",
      }}
    >
      {renderRow(topRow, true)}

      <img
        src={deskImage}
        alt="Shared Desk"
        style={{
          width: "100%", // эсвэл 400-600px гэж ч болно
          maxWidth: "400px",
          height: "auto",
          objectFit: "contain",
        }}
      />

      {renderRow(bottomRow, false)}
    </div>
  );
};

export default WorkstationGroup;
