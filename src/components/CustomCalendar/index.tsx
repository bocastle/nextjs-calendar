"use client";

import { CalendarGenerator } from "@/utils/CalendarGenerator";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 아이콘 추가
import { CalendarDay } from "./types";

dayjs.locale("ko"); // 로케일 설정

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]; // 한국어 요일

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
      <header className="flex items-center gap-5">
        <h2 className="text-black text-xl font-bold">
          {currentDate.format("YYYY.MM")} {/* 연도과 월 포맷 */}
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
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700">
          {daysOfWeek.map((day) => (
            <div key={day} className="uppercase text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center">
          {days.map(({ day }, index) => {
            // isCurrentMonth false: 지난달,다음달 true:이번달
            const dayOfWeek = index % 7; // 날짜 셀의 요일 계산
            const textColor =
              dayOfWeek === 0
                ? "text-red-500"
                : dayOfWeek === 6
                ? "text-blue-500"
                : "text-black";

            return (
              <div
                key={index}
                className={`border-t h-28 ${
                  currentDate.isSame(dayjs(), "month") && day === dayjs().date()
                    ? "bg-green-200"
                    : "bg-white hover:bg-blue-100 cursor-pointer"
                } ${textColor}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
