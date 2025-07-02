"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Employee {
  name: string;
  buddyUrl: string;
  status: "office" | "remote";
  _id: string;
}

interface WorkstationProps {
  employees: Employee[];
  id: string | null; // logged-in user's ID
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
    { top: 435, left: 955 },
    { top: 435, left: 1137 },
    { top: 435, left: 1340 },
    { top: 630, left: 955 },
    { top: 630, left: 1137 },
    { top: 630, left: 1340 },
  ],
};

const WorkstationGroup: React.FC<WorkstationProps> = ({ employees, id }) => {
  const [assignedSeats, setAssignedSeats] = useState<{
    [userId: string]: number;
  }>({});

  const seats = seatPositions.office;

  const getEmoji = (status: string) => (status === "office" ? "🧑‍💻" : "🏠");

  // Initial seat assignment
  useEffect(() => {
    const used = new Set<number>();
    const seatMap: { [userId: string]: number } = {};

    employees.forEach((employee) => {
      for (let i = 0; i < seats.length; i++) {
        if (!used.has(i)) {
          used.add(i);
          seatMap[employee._id] = i;
          break;
        }
      }
    });

    setAssignedSeats(seatMap);
  }, [employees]);

  const handleSeatMove = (employeeId: string, direction: "left" | "right") => {
    const current = assignedSeats[employeeId];
    if (current === undefined) return;

    const step = direction === "left" ? -1 : 1;
    let newIndex = current;

    while (true) {
      newIndex += step;

      if (newIndex < 0 || newIndex >= seats.length) break;

      const isTaken = Object.entries(assignedSeats).some(
        ([uid, seat]) => seat === newIndex && uid !== employeeId
      );

      if (!isTaken) {
        setAssignedSeats((prev) => ({
          ...prev,
          [employeeId]: newIndex,
        }));
        break;
      }
    }
  };

  // ⌨️ Keyboard controls for current user
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!id) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSeatMove(id, "left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSeatMove(id, "right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [id, assignedSeats]);

  return (
    <>
      {employees.map((employee) => {
        const seatIndex = assignedSeats[employee._id];
        const position = seats[seatIndex];
        if (!position) return null;

        return (
          <div
            key={employee._id}
            className="absolute text-center text-white"
            style={{
              top: position.top,
              left: position.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`text-xs font-bold mb-1 rounded-full py-2 px-4 text-[14px] ${
                employee._id === id
                  ? "bg-white text-black"
                  : employee.status === "office"
                  ? "bg-[#000]/60"
                  : "bg-blue-400/40 text-white"
              }`}
            >
              <span className="mr-2">{getEmoji(employee.status)}</span>
              {employee.name}
            </div>
            <div className="mt-1">
              <Image
                src={employee.buddyUrl || "/default-avatar.png"}
                alt={employee.name}
                width={employee.status === "office" ? 50 : 40}
                height={employee.status === "office" ? 50 : 40}
                className={`rounded-full ${
                  employee.status === "remote" ? "opacity-60" : "opacity-100"
                }`}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default WorkstationGroup;
