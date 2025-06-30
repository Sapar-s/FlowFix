"use client";

import React, { useState } from "react";
import WorkstationGroup from "./WorkstationGroup";
import RightSheet from "./RightSheet";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const OfficeLayout: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isInOffice, setIsInOffice] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const toggleStatus = (newStatus: boolean) => {
    setIsInOffice(newStatus);
    setIsPopoverOpen(false);
    // Here you would typically make an API call to update the status
  };

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
    <div className="min-h-screen  bg-[#414141] p-5 relative">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      {/* Main Content */}
      <div className="grid grid-cols-2 gap-10 max-w-[1200px] mx-auto my-[60px] mb-[100px] p-5">
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
      <div className="fixed bottom-5 left-5 right-5 flex justify-between">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full px-4 py-3  gap-2 w-[291px] text-[16px] font-[400] "
            >
              {isInOffice ? (
                <>🧑‍💻 Оффис дээр байна</>
              ) : (
                <>🏠 Зайнаас ажиллаж байна</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[291px] p-2" align="start">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => toggleStatus(true)}
                className="flex items-center justify-between gap-2 cursor-pointer p-2 rounded hover:bg-gray-100 text-left"
              >
                <h4>🧑‍💻 Оффис дээр байна</h4>{" "}
                {isInOffice ? (
                  <div className="rounded-[99px] border border-[rgba(0,0,0,0.10)] bg-[#684DFF] shadow-[inset_-1px_2px_2px_rgba(255,255,255,0.24)] w-4 h-4"></div>
                ) : (
                  <div className="w-4 h-4 rounded-[99px] border  border-black/10 bg-white shadow-[inset_-1px_2px_2px_rgba(0,0,0,0.08)]"></div>
                )}
              </button>
              <button
                onClick={() => toggleStatus(false)}
                className="flex items-center justify-between gap-2 cursor-pointer p-2 rounded hover:bg-gray-100 text-left"
              >
                <h4>🏠 Зайнаас ажиллаж байна</h4>{" "}
                {isInOffice ? (
                  <div className="w-4 h-4 rounded-[99px] border  border-black/10 bg-white shadow-[inset_-1px_2px_2px_rgba(0,0,0,0.08)]"></div>
                ) : (
                  <div className="rounded-[99px] border border-[rgba(0,0,0,0.10)] bg-[#684DFF] shadow-[inset_-1px_2px_2px_rgba(255,255,255,0.24)] w-4 h-4"></div>
                )}
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <button
          onClick={() => setIsSheetOpen(true)}
          className="bg-white border border-[#e2e8f0] rounded-full py-3 px-5 text-sm font-medium text-[#4A5568] cursor-pointer flex items-center gap-2"
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
