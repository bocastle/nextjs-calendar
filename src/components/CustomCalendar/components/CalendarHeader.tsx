import dayjs from "dayjs";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CalendarHeaderProps {
  currentDate: dayjs.Dayjs;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  handlePrevMonth,
  handleNextMonth,
  handleToday,
}) => {
  return (
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
  );
};
