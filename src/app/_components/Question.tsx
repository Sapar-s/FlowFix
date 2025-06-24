"use client";

import { Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const questions = [
  { q: "Ариун цэврийн өрөө хаана байдаг вэ?" },
  { q: "Хэдэн цагт тарах вэ?" },
  { q: "Принтер хаана байрладаг вэ?" },
  { q: "Цайны цаг хэзээ вэ?" },
  { q: "Өглөө хэдэн цагт ирэх ёстой вэ?" },
  { q: "Өдөр бүрийн төлөвлөгөөг хаанаас харж болох вэ?" },
  { q: "Шинэ хүмүүстэй танилцах хамгийн сайн арга юу вэ?" },
];

export default function Questions() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-[904px] h-[618px] bg-white shadow-xl flex flex-col">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/pikachu.png"
                alt="Pikachu"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <h2 className="text-[16px] text-[#000000]">Pikachu</h2>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1 ">
          <div className="overflow-y-auto pr-1">
            <p className="text-sm text-[#7F7F7F] mb-3">Жишээ асуултууд:</p>
            <div className="space-y-2">
              {questions.map((item, index) => (
                <div key={index}>
                  <Button
                    className="inline-flex text-left justify-start h-auto py-2 px-3 text-[14px]
             text-[#00000099] bg-white rounded-[24px] border border-[rgba(0,0,0,0.10)]
             hover:bg-white hover:border-[rgba(0,0,0,0.10)] hover:shadow-none
             focus:outline-none focus:ring-0 focus:border-[rgba(0,0,0,0.10)] cursor-default"
                  >
                    {item.q}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-[8px] mt-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Асуултаа асуугаарай"
                className="pl-10 rounded-[24px] focus-visible:ring-0"
              />
            </div>
            <Button
              variant="ghost"
              className="bg-[#2600FFB2] w-[40px] h-[40px] rounded-full
             hover:bg-[#2600FFB2] hover:shadow-none hover:cursor-default
             focus-visible:ring-0 focus-visible:outline-none border-none"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
