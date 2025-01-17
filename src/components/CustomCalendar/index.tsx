"use client";

import CalendarContextProvider from "@/context/CalendarContext";
import "dayjs/locale/ko";
import { CalendarContent } from "./components/CalendarContent";
import { CalendarHeader } from "./components/CalendarHeader";

export default function CustomCalendar() {
  return (
    <div className="flex flex-col w-full p-4 gap-5">
      <CalendarContextProvider>
        <CalendarHeader />
        <CalendarContent />
      </CalendarContextProvider>
    </div>
  );
}
