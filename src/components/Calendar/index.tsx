"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React from "react";
export const Calendar: React.FC = () => {
  return (
    <div className="w-full">
      <FullCalendar
        height={800}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: "event 1", date: "2025-01-01" },
          { title: "event 2", date: "2025-01-20" },
        ]}
        //달력 ko 추가
        locale={"ko"}
        //달력에 일 제거
        dayCellContent={(item) => {
          const { date } = item;
          return date.getDate();
        }}
      />
    </div>
  );
};
