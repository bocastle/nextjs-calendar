import dayjs from "dayjs";
import React from "react";
import { CalendarDay } from "../types";

interface CalendarContentProps {
  currentDate: dayjs.Dayjs;
  daysOfWeek: string[];
  days: CalendarDay[];
}

export const CalendarContent: React.FC<CalendarContentProps> = ({
  currentDate,
  daysOfWeek,
  days,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700">
        {daysOfWeek.map((day) => (
          <div key={day} className="uppercase text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {days.map(({ day, isCurrentMonth }, index) => {
          const dayOfWeek = index % 7; // 날짜 셀의 요일 계산
          const textColor =
            dayOfWeek === 0
              ? "text-red-500"
              : dayOfWeek === 6
              ? "text-blue-500"
              : "text-black";
          const opacityTextColor =
            dayOfWeek === 0
              ? "text-red-500/40"
              : dayOfWeek === 6
              ? "text-blue-500/40"
              : "text-black/40";

          return (
            <div
              key={index}
              className={`pt-1 border-t h-28 bg-white hover:bg-blue-100 cursor-pointer`}
            >
              <span
                className={`${
                  currentDate.isSame(dayjs(), "month") &&
                  day === dayjs().date() &&
                  "text-white rounded-full bg-blue-500 text-xs w-4 h-4 p-1"
                } ${isCurrentMonth ? textColor : opacityTextColor}`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
