import Buddy from "./_components/Buddy";
import Questtions from "./_components/Questions";

export default function Home() {
  return (
    <div className="w-full h-screen bg-[#fff] ">
      <Questtions />
      <Buddy />
    </div>
  );
}
