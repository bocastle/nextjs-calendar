import { Calendar } from "@/components/Calendar";

export default async function CalendarPage() {
  return (
    <div className="w-full items-start mx-auto p-8 flex gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center">
      <Calendar />
    </div>
  );
}
