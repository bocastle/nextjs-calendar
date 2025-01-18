export interface CalendarDay {
  day: number; // 날짜 숫자
  isCurrentMonth: boolean; // 현재 달 여부
  schedules: Schedule[]; // 일정 배열
}
export interface Schedule {
  time: string; //시간
  description: string; //내용
}
