import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import GeneralTab from "./GeneralTab";

export default function PikachuAndSearch() {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full cursor-pointer">
        <div className="flex flex-col items-center gap-2 w-full">
          <Image
            src={"/pikachu.png"}
            alt="Pikachu"
            width={2000}
            height={2000}
            className="w-[120px] h-[120px]"
          />
          <div className="flex relative w-[300px]">
            <div className="absolute left-0 top-0 w-10 h-10 z-20  rounded-full flex items-center justify-center">
              <Search size={16} color="#333" />
            </div>
            <Input
              placeholder="Асуух зүйл байна уу?"
              className="pl-10 absolute left-0 top-0 w-full h-10 rounded-full  text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <GeneralTab />
    </Dialog>
  );
}
