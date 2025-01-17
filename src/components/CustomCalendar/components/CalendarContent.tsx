import {
  CalendarContext,
  ICalendarContextParams,
} from "@/context/CalendarContext";
import { daysOfWeek } from "@/utils/constant";
import dayjs from "dayjs";
import React, { useContext } from "react";

export const CalendarContent: React.FC = () => {
  const CalendarCtx = useContext<ICalendarContextParams | undefined>(
    CalendarContext
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700">
        {daysOfWeek.map((day, index) => {
          const textColor =
            index === 0
              ? "text-red-500"
              : index === 6
              ? "text-blue-500"
              : "text-black";
          return (
            <div key={day} className={`${textColor} text-sm`}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 text-center">
        {CalendarCtx?.days.map(({ day, isCurrentMonth }, index) => {
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
                  CalendarCtx?.currentDate.isSame(dayjs(), "month") &&
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
