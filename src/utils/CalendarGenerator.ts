import { CalendarDay } from "@/components/CustomCalendar/types";
import { dummySchedules } from "@/dummyData/dummySchedules";
import dayjs, { Dayjs } from "dayjs";

export class CalendarGenerator {
  private date: Dayjs;

  constructor(initialDate: Dayjs) {
    this.date = initialDate;
  }

  setDate(newDate: Dayjs) {
    this.date = newDate;
  }

  generateCalendar(): CalendarDay[] {
    const firstDayOfMonth = this.date.startOf("month").day();
    const daysInMonth = this.date.daysInMonth();

    const lastMonthDays: CalendarDay[] = Array.from(
      { length: firstDayOfMonth },
      (_, i) => ({
        day:
          this.date.subtract(1, "month").daysInMonth() -
          firstDayOfMonth +
          i +
          1,
        isCurrentMonth: false,
        schedules: [],
      })
    );

    const currentMonthDays: CalendarDay[] = Array.from(
      { length: daysInMonth },
      (_, i) => ({
        day: i + 1,
        isCurrentMonth: true,
        schedules: i === Number(dayjs().date() - 1) ? [...dummySchedules] : [], // 더미 일정 적용
      })
    );

    const nextMonthDaysCount =
      42 - (lastMonthDays.length + currentMonthDays.length);
    const nextMonthDays: CalendarDay[] = Array.from(
      { length: nextMonthDaysCount },
      (_, i) => ({ day: i + 1, isCurrentMonth: false, schedules: [] })
    );

    return [...lastMonthDays, ...currentMonthDays, ...nextMonthDays];
  }
}
