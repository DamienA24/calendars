"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { usePDF, Margin } from "react-to-pdf";
import { Download, Printer } from "lucide-react";

const CalendarClient: React.FC<{
  year: number;
  month: string;
  monthNumber: number;
  translations: any;
}> = ({ year, month, monthNumber, translations }) => {
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, monthNumber, 1).getDay();

  const days = [...Array(daysInMonth)].map((_, i) => i + 1);
  const blanks = [
    ...Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1),
  ].map((_, i) => null);

  const allDays = [...blanks, ...days];
  const { print, download, daysOfWeek, daysOfWeekShort } = translations;
  const daysToDisplay =
    isClient && window.innerWidth <= 768 ? daysOfWeekShort : daysOfWeek;
  const calendarRef = useRef<HTMLDivElement>(null);
  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "heures-converties.pdf",
    page: { margin: Margin.SMALL, orientation: "landscape" },
  });

  const handlePrint = useReactToPrint({
    content: () => calendarRef.current,
    documentTitle: `${
      translations.calendar.charAt(0).toUpperCase() +
      translations.calendar.slice(1)
    } - ${month} ${year}`,
    removeAfterPrint: true,
    pageStyle: `
      @page {
        size: landscape;
        margin-top: 2px;
      }
    `,
  });

  const handleDocument = (type: string) => {
    setDocumentType(type);
  };

  useEffect(() => {
    if (documentType === "print") {
      handlePrint();
    } else if (documentType === "pdf") {
      toPDF();
    }
    setDocumentType(null);
  }, [documentType]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Printer
          onClick={() => handleDocument("print")}
          className="h-6 w-6 sm:h-8 sm:w-8 cursor-pointer"
        />
        <Download
          onClick={() => handleDocument("pdf")}
          className="ml-10 h-6 w-6 sm:h-8 sm:w-8 cursor-pointer"
        />
      </div>
      <div
        ref={documentType === "print" ? calendarRef : targetRef}
        className="bg-white p-2 sm:p-4 rounded-lg shadow printable-calendar"
      >
        <h2 className="text-lg sm:text-2xl font-bold mb-4">
          {translations.month} {year}
        </h2>
        <div className="grid grid-cols-7 sm:grid-cols-7 gap-0.5">
          {daysToDisplay.map((day: string, index: number) => (
            <div
              key={day}
              className={`flex justify-center items-center font-bold text-white text-xs sm:text-base p-1 ${
                index === 6 ? "bg-secondary" : "bg-primary"
              }`}
            >
              <p>{day}</p>
            </div>
          ))}
          {allDays.map((day, index) => {
            const isSunday = index % 7 === 6;

            return (
              <div
                key={index}
                className={`h-14 sm:h-24 border text-left p-1 ${
                  day ? (isSunday ? "bg-secondary" : "bg-gray-100") : ""
                } flex items-start justify-start`}
              >
                <span className="text-xs sm:text-sm font-bold">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarClient;
