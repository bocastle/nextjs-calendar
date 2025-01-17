import { CalendarDay } from "@/components/CustomCalendar/types";
import { CalendarGenerator } from "@/utils/CalendarGenerator";
import dayjs from "dayjs";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
export interface ICalendarContextParams {
  currentDate: dayjs.Dayjs;
  days: CalendarDay[];
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleToday: () => void;
}
export const CalendarContext = createContext<
  ICalendarContextParams | undefined
>(undefined);
interface IProps {
  children: ReactNode;
}

dayjs.locale("ko");

export default function CalendarContextProvider({ children }: IProps) {
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

  const calendarContextInitialState = {
    currentDate,
    days,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
  };
  return (
    <CalendarContext.Provider value={calendarContextInitialState}>
      {children}
    </CalendarContext.Provider>
  );
}
