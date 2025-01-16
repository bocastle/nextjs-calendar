"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 아이콘 추가
import { CalendarDay } from "./types";

dayjs.locale("ko"); // 로케일 설정

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]; // 한국어 요일

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs()); // dayjs 객체 사용
  const [days, setDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date: dayjs.Dayjs) => {
    const firstDayOfMonth = date.startOf("month").day();
    const daysInMonth = date.daysInMonth();

    const lastMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
      day: date.subtract(1, "month").daysInMonth() - firstDayOfMonth + i + 1,
      isCurrentMonth: false,
    }));

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
    }));

    const nextMonthDaysCount =
      42 - (lastMonthDays.length + currentMonthDays.length); // 6행 7열 기준
    const nextMonthDays = Array.from(
      { length: nextMonthDaysCount },
      (_, i) => ({ day: i + 1, isCurrentMonth: false })
    );

    setDays([...lastMonthDays, ...currentMonthDays, ...nextMonthDays]);
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };
  const handleToday = () => setCurrentDate(dayjs()); // 오늘 날짜로 이동

  return (
    <div className="w-full p-4">
      <header className="flex items-center gap-5">
        <h2 className="text-black text-xl font-bold">
          {currentDate.format("YYYY.MM")} {/* 월과 연도 포맷 */}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg border border-blue-500/100"
            aria-label="이전 달"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg border border-blue-500/100"
            aria-label="다음 달"
          >
            <FaChevronRight size={24} />
          </button>
          <button
            onClick={handleToday}
            className="px-4 py-2 text-blue-500 rounded-lg border border-blue-500/100"
          >
            오늘
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700">
        {daysOfWeek.map((day) => (
          <div key={day} className="uppercase text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {days.map(({ day, isCurrentMonth }, index) => (
          <div
            key={index}
            className={`p-4 border ${
              isCurrentMonth
                ? currentDate.isSame(dayjs(), "month") && day === dayjs().date()
                  ? "bg-green-200"
                  : "bg-white hover:bg-blue-100 cursor-pointer"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
