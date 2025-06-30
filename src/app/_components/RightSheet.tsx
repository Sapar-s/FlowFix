"use client";

import React from "react";

interface RightSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSheet: React.FC<RightSheetProps> = ({ isOpen, onClose }) => (
  <>
    {/* Backdrop */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        transition: "opacity 0.3s ease, visibility 0.3s ease",
      }}
      onClick={onClose}
    />

    {/* Sheet */}
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "400px",
        backgroundColor: "white",
        boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        padding: "24px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1a202c" }}>
          Санал хураалт
        </h2>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#718096",
          }}
        >
          ×
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#2d3748" }}>
            Санал хураалтын мэдээлэл
          </h3>
          <p style={{ color: "#718096", fontSize: "14px" }}>
            Энд санал хураалтын дэлгэрэнгүй мэдээлэл, сонголтууд болон бусад
            холбогдох мэдээлэл харагдана.
          </p>
        </div>
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f7fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#2d3748" }}>
            Санал өгөх
          </h4>
          <p style={{ fontSize: "12px", color: "#718096", margin: 0 }}>
            Санал хураалтын функц энд байрлана.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default RightSheet;
