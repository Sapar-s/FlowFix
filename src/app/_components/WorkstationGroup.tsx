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
    <div className="flex gap-[100px] justify-center">
      {row.map((employee, index) => (
        <div
          key={`${isTop ? "top" : "bottom"}-${index}`}
          className="text-center"
        >
          {isTop && (
            <div className="text-xs text-[#2d3748] font-bold mb-1">
              {employee.name}
            </div>
          )}
          <div className="text-2xl">{employee.avatar}</div>
          {!isTop && (
            <div className="text-xs text-[#2d3748] font-bold mt-1">
              {employee.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-5 items-center my-10 mx-auto w-fit">
      {renderRow(topRow, true)}

      <img
        src={deskImage}
        alt="Shared Desk"
        className="w-full max-w-[400px] h-auto object-contain"
      />

      {renderRow(bottomRow, false)}
    </div>
  );
};

export default WorkstationGroup;
