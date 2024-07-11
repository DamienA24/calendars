import React from "react";
import { CalendarProps } from "@/types/calendar";

import { useTranslation } from "@/app/i18n";

const Calendar: React.FC<CalendarProps> = async ({
  year,
  monthNumber,
  lng,
  month,
}) => {
  const { t } = await useTranslation(lng);
  const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, monthNumber, 1).getDay();

  const days = [...Array(daysInMonth)].map((_, i) => i + 1);
  const blanks = [...Array(firstDayOfMonth)].map((_, i) => null);

  const allDays = [...blanks, ...days];
  const shortDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {t(`month.${month}`)} {year}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {shortDays.map((day) => (
          <div key={day} className="text-center font-bold">
            {t(`day.${day}`)}
          </div>
        ))}
        {allDays.map((day, index) => (
          <div
            key={index}
            className={`text-center p-2 ${day ? "bg-gray-100" : ""} ${
              day === new Date().getDate() &&
              monthNumber === new Date().getMonth() &&
              year === new Date().getFullYear()
                ? "bg-blue-200"
                : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
