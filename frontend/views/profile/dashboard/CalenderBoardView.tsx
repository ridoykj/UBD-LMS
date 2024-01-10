import React, { useState } from "react";
import { format, startOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";

function CalenderBoardView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
        <button
          className="text-gray-600 hover:text-gray-900"
          onClick={() => setCurrentDate(addDays(currentDate, -7))}
        >
          Prev
        </button>
        <span className="text-lg font-semibold text-gray-800">
          {format(currentDate, dateFormat)}
        </span>
        <button
          className="text-gray-600 hover:text-gray-900"
          onClick={() => setCurrentDate(addDays(currentDate, 7))}
        >
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className="w-1/7 text-center py-2 text-sm uppercase text-gray-600"
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="flex">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfWeek(currentDate);
    const cells = [];
    let startDate = monthStart;
    for (let i = 0; i < 7; i++) {
      const day = startDate;
      const formattedDate = format(day, "d");
      const cloneDay = day;
      cells.push(
        <div
          className={`w-1/7 h-20 flex flex-col border border-gray-300 ${!isSameMonth(day, monthStart)
            ? "text-gray-400"
            : isSameDay(day, new Date())
              ? "bg-blue-200"
              : ""
            }`}
          key={day.toString()}
          onClick={() => setCurrentDate(cloneDay)}
        >
          <div className="text-right px-2 py-1">
            <span className="text-sm font-medium">{formattedDate}</span>
          </div>
          <div className="text-sm px-2 overflow-y-auto">
            {/* Render the events here */}
          </div>
        </div>
      );
      startDate = addDays(startDate, 1);
    }
    return <div className="flex flex-wrap">{cells}</div>;
  };

  const tableHeader = () => {
    const cells = [];
    const cssE = `row-start-[1] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center`
    const monthStart = startOfWeek(currentDate);
    let startDate = monthStart;
    for (let i = 0; i < 7; i++) {
      const day = startDate;
      const formattedDate = format(day, "EEE");
      const cssColumn = `col-start-[${i + 2}]`;
      cells.push(
        <div className={cssColumn + cssE}>{formattedDate}</div>
      );
      startDate = addDays(startDate, 1);
    }
    return (
      <>
        <div className="row-start-[1] col-start-[1] sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2"></div>
        {cells}
      </>
    )
  }

  const daysName = () => {
    const cells = [];
    const monthStart = startOfWeek(currentDate);
    let startDate = monthStart;
    for (let i = 0; i < 7; i++) {
      const day = startDate;
      const formattedDate = format(day, "EEE");
      cells.push(formattedDate);
      startDate = addDays(startDate, 1);
    }
    return cells;
  }

  function createTableRow(rowIndex: number, data: string[], customCss?: string) {
    return (
      <>
        {data.map((item, columnIndex) => (
          <>
            <div key={columnIndex} className={`row-start-[${rowIndex + 1}] col-start-[${columnIndex + 1}] ${customCss}`}>
              {item}
            </div>
            {/* <div className={`row-start-[${rowIndex + 1}] col-start-[${columnIndex + 1}] border-slate-100 dark:border-slate-200/5 border-b border-r`}></div> */}
          </>
        ))}
      </>
    );
  }

  function createTableRowBorder(rowIndex: number, columnLength: number) {
    let columns = [];
    for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
      columns.push(
        <div key={columnIndex} className={`row-start-[${rowIndex + 1}] col-start-[${columnIndex + 1}] border-slate-100 dark:border-slate-200/5 border-b border-r`}></div>
      );
    }
    return columns;
  }

  function timeSheet() {
    const hours = ['5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM',];

    return (
      hours.map((hour, index) => (
        <>
          {createTableRowBorder(index + 1, 8)}
          {createTableRow(index + 1, [hour], tdCss)}
        </>
      ))
    );
  }
  type ContentProps = {
    schedule: string,
    title: string,
    description: string
  }

  function calContent(content: ContentProps) {
    return (
      <>
        <div className="row-start-[3] col-start-[3] row-span-4 bg-blue-400/20 dark:bg-sky-600/50 border border-blue-700/10 dark:border-sky-500 rounded-lg m-1 p-1 flex flex-col">
          <span className="text-xs text-blue-600 dark:text-sky-100">{content.schedule}</span>
          <span className="text-xs font-medium text-blue-600 dark:text-sky-100">{content.title}</span>
          <span className="text-xs text-blue-600 dark:text-sky-100">{content.description}</span>
        </div>
      </>
    )
  }
  const thCss = `sticky top-0 z-10 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 h-10 text-center`;
  const tdCss = `border-slate-100 dark:border-slate-200/5 border-b border-r text-xs p-1.5 text-right text-slate-400 uppercase sticky left-0 bg-white dark:bg-slate-800 font-medium`;
  return (
    <>
      <VerticalLayout className="h-full w-full items-stretch">
        <div className="overflow-scroll grid grid-cols-[70px,repeat(7,150px)] grid-rows-[auto,repeat(16,50px)] h-full">

          {createTableRowBorder(0, 8)}
          {createTableRow(0, ['', ...daysName()], thCss)}
          {timeSheet()}

          <div className="row-start-[17] col-start-[8]"></div>
          {/* Calendar contents  */}
          {/* <div className="row-start-[2] col-start-3 row-span-4 bg-blue-400/20 dark:bg-sky-600/50 border border-blue-700/10 dark:border-sky-500 rounded-lg m-1 p-1 flex flex-col">
            <span className="text-xs text-blue-600 dark:text-sky-100">5 AM</span>
            <span className="text-xs font-medium text-blue-600 dark:text-sky-100">Flight to vancouver</span>
            <span className="text-xs text-blue-600 dark:text-sky-100">Toronto YYZ</span>
          </div>
          <div className="row-start-[3] col-start-[4] row-span-4 bg-purple-400/20 dark:bg-fuchsia-600/50 border border-purple-700/10 dark:border-fuchsia-500 rounded-lg m-1 p-1 flex flex-col">
            <span className="text-xs text-purple-600 dark:text-fuchsia-100">6 AM</span>
            <span className="text-xs font-medium text-purple-600 dark:text-fuchsia-100">Breakfast</span>
            <span className="text-xs text-purple-600 dark:text-fuchsia-100">Mel's Diner</span>
          </div>
          <div className="row-start-[14] col-start-[7] row-span-3 bg-pink-400/20 dark:bg-indigo-600/50 border border-pink-700/10 dark:border-indigo-500 rounded-lg m-1 p-1 flex flex-col">
            <span className="text-xs text-pink-600 dark:text-indigo-100">5 PM</span>
            <span className="text-xs font-medium text-pink-600 dark:text-indigo-100">🎉 Party party 🎉</span>
            <span className="text-xs text-pink-600 dark:text-indigo-100">We like to party!</span>
          </div> */}
        </div>
      </VerticalLayout>
    </>
  );
}

export default CalenderBoardView;
