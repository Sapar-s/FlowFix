"use client";

import React, { useEffect, useState } from "react";
import WorkstationGroup from "./WorkstationGroup";
import RightSheet from "./RightSheet";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronRight, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";

const OfficeLayout: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isInOffice, setIsInOffice] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("_id");
  const [users, setUsers] = useState([]);

  const toggleStatus = async (newStatus: boolean) => {
    setIsInOffice(newStatus);
    try {
      const res = await axios.put("/api/changeStatus", {
        _id: id,
        status: newStatus == true ? "office" : "remote",
      });

      alert("amjilttai soligdloo ");
      setIsPopoverOpen(false);
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/api/login");

      setUsers(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("users", users);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[url('/container.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      {/* Main Content */}

      <WorkstationGroup employees={users} />

      {/* Footer Buttons */}
      <div className="fixed bottom-5 left-5 right-5 flex justify-between">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full px-4 py-3 cursor-pointer gap-2 w-[291px] flex justify-between text-[16px] font-[400] "
            >
              {isInOffice ? (
                <>
                  🧑‍💻 Оффис дээр байна <ChevronUp />
                </>
              ) : (
                <>
                  🏠 Зайнаас ажиллаж байна <ChevronUp />
                </>
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
          Санал хураалт <ChevronRight />
        </button>
      </div>

      {/* Right Sheet */}
      <RightSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
    </div>
  );
};

export default OfficeLayout;
