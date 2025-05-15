import {
  CalendarContext,
  ICalendarContextParams,
} from "@/context/CalendarContext";
import { daysOfWeek } from "@/utils/constant";
import dayjs from "dayjs";
import React, { useContext } from "react";

const getTextColor = (dayIndex: number, opacity: boolean = false) => {
  const opacitySuffix = opacity ? "/40" : "";
  if (dayIndex === 0) return `text-red-500${opacitySuffix}`;
  if (dayIndex === 6) return `text-blue-500${opacitySuffix}`;
  return `text-black${opacitySuffix}`;
};

export const CalendarContent: React.FC = () => {
  const CalendarCtx = useContext<ICalendarContextParams | undefined>(
    CalendarContext
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700">
        {daysOfWeek.map((day, index) => (
          <div key={day} className={`${getTextColor(index)} text-sm`}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {CalendarCtx?.days.map(({ day, schedules, isCurrentMonth }, index) => {
          const dayOfWeek = index % 7; // 날짜 셀의 요일 계산
          const textColor = getTextColor(dayOfWeek);
          const opacityTextColor = getTextColor(dayOfWeek, true);
          //   console.log("schedules", schedules);
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
              {schedules.map((item, index) => {
                return (
                  <ul key={index} className="text-black text-start">
                    {item.time} - {item.description}
                  </ul>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
