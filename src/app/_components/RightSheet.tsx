"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface RightSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSheet: React.FC<RightSheetProps> = ({ isOpen, onClose }) => {
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const polls = [
    {
      question: "Жилийн ойгоор юу хийх вэ?",
      createdBy: "Тогтуун",
      status: "05 цаг 23 мин",
      options: [
        "Ууланд гарах",
        "Хоолонд орох",
        "Кино үзэх",
        "Гэртээ амрах",
        "Сонголт нэмэх",
      ],
    },
    {
      question: "Өвлийн амралтаар яах вэ?",
      createdBy: "Намуун",
      status: "Хариу гарсан",
      options: ["Аялах", "Гэртээ амрах", "Ажиллах", "Сургалтанд суух"],
    },
    {
      question: "Дараа нь ямар үйл ажиллагаа зохиох вэ?",
      createdBy: "Хурал",
      status: "Хариу гарсан",
      options: ["Спорт", "Уралдаан", "Семинар", "Наадам"],
    },
  ];

  const handlePollSelect = (index: number) => {
    setSelectedPoll(index);
    setSelectedOption("");
  };

  const handleSubmit = () => {
    setLoading(true);
    toast.success(`Санал: ${selectedOption} илгээгдлээ!`);
    setTimeout(() => {
      setLoading(false);
      setSelectedPoll(null);
      setSelectedOption("");
      onClose();
    }, 1000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] px-5">
        <SheetHeader className="border-b border-gray-200  mb-4   gap-5">
          <SheetClose asChild>
            <div className="flex items-center gap-5 ml-[-30px]">
              <Button variant="ghost" className="cursor-pointer">
                <ChevronLeft className="h-10 w-10 text-gray-500" />
                <span className="sr-only">Close</span>

                <SheetTitle className="text-gray-900 text-xl font-bold">
                  Санал хураалт
                </SheetTitle>
              </Button>
            </div>
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-4">
          {selectedPoll === null ? (
            <>
              {polls.map((poll, index) => (
                <div
                  key={index}
                  className="border border-gray-200 py-4 px-5 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handlePollSelect(index)}
                >
                  <h3 className="text-gray-800 font-semibold text-base mb-2">
                    {poll.question}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Үүсгэсэн: {poll.createdBy}</span>
                    <span>{poll.status}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-gray-800 font-semibold text-lg mb-2">
                  {polls[selectedPoll].question}
                </h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Үүсгэсэн: {polls[selectedPoll].createdBy}</span>
                  <span>{polls[selectedPoll].status}</span>
                </div>
              </div>

              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="space-y-3"
              >
                {polls[selectedPoll].options.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`option-${idx}`} />
                    <Label htmlFor={`option-${idx}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPoll(null)}
                  className="flex-1"
                >
                  Буцах
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 cursor-pointer"
                  disabled={!selectedOption}
                >
                  {loading ? "Илгээж байна..." : "Илгээх"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RightSheet;
