"use client";

import Image from "next/image";
import React from "react";

interface Employee {
  name: string;
  buddyUrl: string;
  status: string;
}

interface WorkstationProps {
  employees: Employee[];
}

const seatPositions: { [key: string]: { top: number; left: number }[] } = {
  office: [
    { top: 70, left: 130 },
    { top: 70, left: 360 },
    { top: 70, left: 590 },
    { top: 240, left: 130 },
    { top: 240, left: 360 },
    { top: 240, left: 590 },
    { top: 410, left: 360 },
  ],
};

const WorkstationGroup: React.FC<WorkstationProps> = ({ employees }) => {
  return (
    <>
      {employees.map((employee, index) => {
        const position = seatPositions.office[index];
        if (!position) return null;

        return (
          <div
            key={index}
            className="absolute text-center text-white"
            style={{
              top: position.top,
              left: position.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="text-xs font-bold mb-1">{employee.name}</div>
            <div className="text-2xl">
              <Image
                src={employee.buddyUrl}
                alt={employee.name}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default WorkstationGroup;
