"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CircleMinus, CirclePlus } from "lucide-react";

interface Employee {
  name: string;
  buddyUrl: string;
  status: "office" | "remote";
  _id: string;
}

interface WorkstationProps {
  employees: Employee[];
  id: string | null; // logged-in user's ID
}

const seatPositions: { [key: string]: { top: number; left: number }[] } = {
  office: [
    { top: 55, left: 210 },
    { top: 55, left: 410 },
    { top: 55, left: 610 },
    { top: 250, left: 210 },
    { top: 250, left: 415 },
    { top: 250, left: 620 },
    { top: 55, left: 982 },
    { top: 55, left: 1180 },
    { top: 55, left: 1380 },
    { top: 250, left: 980 },
    { top: 250, left: 1180 },
    { top: 250, left: 1380 },
    { top: 530, left: 210 },
    { top: 530, left: 410 },
    { top: 530, left: 610 },
    { top: 720, left: 210 },
    { top: 720, left: 410 },
    { top: 720, left: 610 },
    { top: 530, left: 980 },
    { top: 530, left: 1180 },
    { top: 530, left: 1380 },
    { top: 720, left: 980 },
    { top: 720, left: 1180 },
    { top: 720, left: 1380 },
  ],
};

const WorkstationGroup: React.FC<WorkstationProps> = ({ employees, id }) => {
  const [assignedSeats, setAssignedSeats] = useState<{
    [userId: string]: number;
  }>({});
  const [zoom, setZoom] = useState(1);

  const seats = seatPositions.office;

  const getEmoji = (status: string) => (status === "office" ? "🧑‍💻" : "🏠");

  // Assign seats sequentially when employees change
  useEffect(() => {
    const seatMap: { [userId: string]: number } = {};
    employees.forEach((employee, idx) => {
      if (idx < seats.length) {
        seatMap[employee._id] = idx;
      }
    });
    setAssignedSeats(seatMap);
  }, [employees, seats]);

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
        if (newIndex !== current) {
          setAssignedSeats((prev) => ({
            ...prev,
            [employeeId]: newIndex,
          }));
        }
        break;
      }
    }
  };

  // Keyboard controls for logged-in user
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

  const handleZoomIn = () => setZoom((prev) => Math.min(2, prev + 0.1));
  const handleZoomOut = () => setZoom((prev) => Math.max(1, prev - 0.1));

  // Helper to get background classes based on employee status and logged-in user
  const getBgClass = (employee: Employee) => {
    if (employee._id === id) return "bg-white text-black";
    if (employee.status === "office") return "bg-[#000]/60";
    return "bg-blue-400/40 text-white";
  };

  return (
    <div className="relative w-full h-full overflow-auto">
      {/* Zoom Controls */}
      <div className="absolute bottom-24 fixed right-8 z-20 flex flex-col gap-2">
        <CirclePlus
          strokeWidth={1}
          fill="black"
          stroke="white"
          size={40}
          onClick={handleZoomIn}
          aria-label="Zoom in"
          style={{
            cursor: zoom >= 2 ? "not-allowed" : "pointer",
            opacity: zoom >= 2 ? 0.5 : 1,
          }}
        />
        <CircleMinus
          strokeWidth={1}
          fill="black"
          stroke="white"
          size={40}
          onClick={handleZoomOut}
          aria-label="Zoom out"
          style={{
            cursor: zoom <= 1 ? "not-allowed" : "pointer",
            opacity: zoom <= 1 ? 0.5 : 1,
          }}
        />
      </div>

      {/* Zoomable Workstation Area */}
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          position: "relative",
          width: 1540, // base width of layout, adjust as needed
          height: 940, // base height of layout, adjust as needed
        }}
      >
        {/* Background image (scaled with zoom) */}
        <Image
          src="/container.jpg"
          alt="Office Layout"
          fill
          className="absolute top-0 left-0 z-0 object-cover"
          priority
        />
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
                className={`text-xs font-bold mb-1 rounded-full py-2 px-4 text-[14px] ${getBgClass(
                  employee
                )}`}
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
                  className="rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkstationGroup;
