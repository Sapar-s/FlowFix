"use client";

import React, { useState } from "react";
import WorkstationGroup from "./WorkstationGroup";
import RightSheet from "./RightSheet";

const OfficeLayout: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const computerImages = [
    "https://res.cloudinary.com/da2ltmfaf/image/upload/v1751257079/back1_kjqbwi.png",
    "https://res.cloudinary.com/da2ltmfaf/image/upload/v1751257088/back2_q2dfxp.png",
    "https://res.cloudinary.com/da2ltmfaf/image/upload/v1751257096/back3_zoqaop.png",
    "https://res.cloudinary.com/da2ltmfaf/image/upload/v1751257006/front1_znibuk.png",
    "https://res.cloudinary.com/da2ltmfaf/image/upload/v1751257058/front2_ewqpb5.png",
    "https://res.cloudinary.com/da2ltmfaf/image/upload/v1751257069/front3_hjjzlm.png",
  ];

  const workstationData = Array(4).fill({
    topRow: [
      { name: "Tsatsa", avatar: "🐸" },
      { name: "namu", avatar: "⚡" },
      { name: "Hulan", avatar: "🖤" },
    ],
    bottomRow: [
      { name: "nemhe", avatar: "🐸" },
      { name: "Zorig", avatar: "🦁" },
      { name: "Odnoo", avatar: "🌿" },
    ],
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#D4C4A8",
        backgroundImage: `
          linear-gradient(90deg, rgba(139, 125, 107, 0.1) 1px, transparent 1px),
          linear-gradient(rgba(139, 125, 107, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Main Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          maxWidth: "1200px",
          margin: "60px auto 100px",
          padding: "20px",
        }}
      >
        {workstationData.map((workstation, index) => (
          <WorkstationGroup
            key={index}
            topRow={workstation.topRow}
            bottomRow={workstation.bottomRow}
            deskImage={
              "https://res.cloudinary.com/da2ltmfaf/image/upload/v1751265465/officeSetup_o57ipn.png"
            }
          />
        ))}
      </div>

      {/* Footer Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          right: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#4A5568",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🏠 Зайнаас ажиллах байна
        </button>

        <button
          onClick={() => setIsSheetOpen(true)}
          style={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#4A5568",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Санал хураалт {">"}
        </button>
      </div>

      {/* Right Sheet */}
      <RightSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
    </div>
  );
};

export default OfficeLayout;
