export interface CalendarProps {
  year: number;
  monthNumber: number;
  lng: string;
  month: string;
}

export interface CalendarPageProps {
  params: { year: string; month: string; lng: string };
}
