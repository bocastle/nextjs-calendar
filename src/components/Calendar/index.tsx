"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React from "react";
export const Calendar: React.FC = () => {
  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: "event 1", date: "2025-01-01" },
          { title: "event 2", date: "2025-01-20" },
        ]}
      />
    </div>
  );
};
