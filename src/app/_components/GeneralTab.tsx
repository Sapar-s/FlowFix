import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "./Settings";

export default function GeneralTab() {
  return (
    <DialogContent className="sm:max-w-[906px] w-full h-[618px]">
      <Tabs defaultValue="account" className="flex flex-col gap-8 ">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Question">Question</TabsTrigger>
          <TabsTrigger value="Buddy">Buddy</TabsTrigger>
          <TabsTrigger value="Todo">Todo</TabsTrigger>
          <TabsTrigger value="Settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="Question"></TabsContent>
        <TabsContent value="Buddy"></TabsContent>
        <TabsContent value="Todo"></TabsContent>
        <TabsContent value="Settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
