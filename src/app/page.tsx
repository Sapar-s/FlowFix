import { Suspense } from "react";
import OfficeLayout from "./_components/OfficeLayout";

export default function Home() {
  return (
    <Suspense>
      <div className="w-full h-screen bg-[#fff] relative">
        <OfficeLayout />
      </div>
    </Suspense>
  );
}
