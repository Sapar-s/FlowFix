"use client";

import Image from "next/image";
import React from "react";

interface Employee {
  name: string;
  buddyUrl: string;
  status: string;
  _id: string;
}

interface WorkstationProps {
  employees: Employee[];
  id: string | null;
  isInOffice: boolean;
}

const seatPositions: { [key: string]: { top: number; left: number }[] } = {
  office: [
    { top: 45, left: 183 },
    { top: 45, left: 378 },
    { top: 45, left: 578 },
    { top: 240, left: 193 },
    { top: 240, left: 388 },
    { top: 240, left: 578 },
    { top: 45, left: 955 },
    { top: 45, left: 1137 },
    { top: 45, left: 1340 },
    { top: 240, left: 955 },
    { top: 240, left: 1137 },
    { top: 240, left: 1340 },
    { top: 435, left: 183 },
    { top: 435, left: 378 },
    { top: 435, left: 578 },
    { top: 630, left: 193 },
    { top: 630, left: 388 },
    { top: 630, left: 578 },
  ],
};

const WorkstationGroup: React.FC<WorkstationProps> = ({
  employees,
  id,
  isInOffice,
}) => {
  const getEmoji = () => {
    if (isInOffice) {
      return "🧑‍💻"; // Office emoji
    }
    return "🏠"; // Home emoji
    // switch (status) {
    //   case "office":
    //     return "🧑‍💻"; // Office emoji
    //   case "remote":
    //     return "🏠"; // Home emoji
    //   default:
    //     return "❓"; // Unknown status emoji
    // }
  };
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
            <div
              className={`text-xs font-bold mb-1 rounded-full py-2 px-4 text-[14px] ${
                employee._id === id ? "bg-white text-black" : "bg-[#000]/60 "
              }`}
            >
              <span className="mr-2">{getEmoji()}</span>
              {employee.name}
            </div>
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
