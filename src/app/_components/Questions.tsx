"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const questions = [
  {
    q: "Ариун цэврийн өрөө хаана байдаг вэ?",
    a: "Ариун цэврийн өрөө 1-р давхрын баруун талд байрладаг.",
  },
  { q: "Хэдэн цагт тарах вэ?", a: "Өдөр бүр 17:00 цагт тарна." },
  {
    q: "Принтер хаана байрладаг вэ?",
    a: "Принтер 2-р давхрын оффисын буланд байрладаг.",
  },
  { q: "Цайны цаг хэзээ вэ?", a: "Цайны цаг 12:30-13:00 хооронд." },
  {
    q: "Өглөө хэдэн цагт ирэх ёстой вэ?",
    a: "Өглөө 9:00 цагт ирсэн байх ёстой. Хоцролгүй ирээрэй!",
  },
  {
    q: "Өдөр бүрийн төлөвлөгөөг хаанаас харж болох вэ?",
    a: "Өдөр бүрийн төлөвлөгөөг 'Хийх зүйлс' таб дотроос харна.",
  },
  {
    q: "Шинэ хүмүүстэй танилцах хамгийн сайн арга юу вэ?",
    a: "Цайны цагаар хамт суух эсвэл Buddy-г ашиглан танилцах боломжтой.",
  },
];

export default function Questions() {
  const [activeAnswerIndex, setActiveAnswerIndex] = useState<number | null>(
    null
  );

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-[904px] h-[618px] bg-white shadow-xl">
        <CardHeader className="pb-0">
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
            <h2 className="text-lg font-semibold text-gray-800">Pikachu</h2>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-between h-[400px]">
          <div>
            <p className="text-sm text-[#7F7F7F] mb-3">Жишээ асуултууд:</p>
            <div className="space-y-2">
              {questions.map((item, index) => (
                <div key={index}>
                  <Button
                    variant="outline"
                    className="text-left justify-start h-auto py-2 px-3 text-sm text-[#000] hover:bg-gray-50 bg-white rounded-[12px] border border-[rgba(0,0,0,0.2)]"
                    onClick={() =>
                      setActiveAnswerIndex(
                        activeAnswerIndex === index ? null : index
                      )
                    }
                  >
                    {item.q}
                  </Button>
                  {activeAnswerIndex === index && (
                    <div className="mt-1 ml-3 text-sm text-[#7F7F7F]">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Асуултаа асуугаарай"
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
