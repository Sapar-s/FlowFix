"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const faqList = [
  { q: "Нойл хаана байдаг вэ?", a: "Нойл 1-р давхрын баруун талд байрладаг." },
  {
    q: "Ус уух газар хаана вэ?",
    a: "Ус уух газар гал тогооны хажууд байрлана.",
  },
  {
    q: "Гал тогоо хаана байна вэ?",
    a: "Гал тогоо 2-р давхрын зүүн жигүүрт байна.",
  },
  {
    q: "Хурал болдог өрөө хаана вэ?",
    a: "Хурлын өрөө 3-р давхрын голд байдаг.",
  },
  {
    q: "Хогийн сав аль хэсэгт байдаг вэ?",
    a: "Хогийн сав коридорын төгсгөлд байрлана.",
  },
];

export default function PetWidget() {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(1);
  const [answer, setAnswer] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Example notification logic
    const timeout = setTimeout(() => {
      setNotification((prev) => prev + 1);
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);

  const handleFAQClick = (faq: string) => {
    const matched = faqList.find((f) => f.q === faq);
    if (matched) setAnswer(matched.a);
  };

  const handleSearch = () => {
    const matched = faqList.find((f) => f.q.includes(search));
    if (matched) setAnswer(matched.a);
    else setAnswer("Уучлаарай, энэ асуултад хариулт олдсонгүй.");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Notification bubble */}
      {!open && notification > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {notification}
        </div>
      )}

      {/* Pet icon */}
      <motion.div
        drag
        className="w-16 h-16 bg-white border shadow-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition"
        onClick={() => {
          setOpen(!open);
          setNotification(0);
        }}
      >
        🐰
      </motion.div>

      {/* Popup */}
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute bottom-20 right-0 bg-white w-[300px] p-4 rounded-2xl shadow-xl border space-y-2"
        >
          <div className="text-center text-lg font-semibold text-gray-700">
            Сайн уу! 🐰
          </div>
          <div className="text-sm text-gray-600">
            Би туслагч туулай байна. Та асуултаа бичих эсвэл сонгоно уу.
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Асуух зүйлээ бич..."
            className="w-full border rounded px-2 py-1 text-sm text-black"
          />
          <div className="space-y-1 text-black">
            {faqList.slice(0, 5).map((faq, idx) => (
              <button
                key={idx}
                className="w-full bg-gray-100 hover:bg-gray-200 px-2 py-1 text-left text-sm rounded"
                onClick={() => handleFAQClick(faq.q)}
              >
                {faq.q}
              </button>
            ))}
          </div>
          {answer && (
            <div className="bg-blue-50 border border-blue-200 p-2 rounded text-sm mt-2 text-gray-600">
              {answer}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
