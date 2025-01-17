"use client";

import { CalendarGenerator } from "@/utils/CalendarGenerator";
import { daysOfWeek } from "@/utils/constant";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useMemo, useState } from "react";
import { CalendarContent } from "./components/CalendarContent";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarDay } from "./types";

dayjs.locale("ko"); // 로케일 설정

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs()); // dayjs 객체 사용
  const [days, setDays] = useState<CalendarDay[]>([]);

  const calendarGenerator = useMemo(
    () => new CalendarGenerator(currentDate),
    [currentDate]
  );

  useEffect(() => {
    setDays(calendarGenerator.generateCalendar());
  }, [calendarGenerator]);

  const handlePrevMonth = () => {
    const newDate = currentDate.subtract(1, "month");
    setCurrentDate(newDate);
    calendarGenerator.setDate(newDate);
    setDays(calendarGenerator.generateCalendar());
  };

  const handleNextMonth = () => {
    const newDate = currentDate.add(1, "month");
    setCurrentDate(newDate);
    calendarGenerator.setDate(newDate);
    setDays(calendarGenerator.generateCalendar());
  };
  // 오늘 날짜로 이동
  const handleToday = () => {
    const newDate = dayjs();
    setCurrentDate(newDate);
    calendarGenerator.setDate(newDate);
    setDays(calendarGenerator.generateCalendar());
  };

  return (
    <div className="flex flex-col w-full p-4 gap-5">
      <CalendarHeader
        currentDate={currentDate}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        handleToday={handleToday}
      />
      <CalendarContent
        currentDate={currentDate}
        daysOfWeek={daysOfWeek}
        days={days}
      />
    </div>
  );
}
