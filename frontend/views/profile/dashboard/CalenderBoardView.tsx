import './calendarBoardView.css';

const headC = 'sticky top-0 left-0 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center';
const sideC = 'sticky top-0 left-0 border-slate-100 dark:border-slate-200/5 border-4 text-xs p-1.5 text-right text-slate-500 uppercase sticky left-0 bg-white dark:bg-slate-800 font-medium';
const cellC = 'bg-blue-400/20 dark:bg-sky-600/50 border border-blue-700/10 dark:border-sky-500 rounded-lg m-1 p-1 min-w-16 min-h-10';
const blankCellC = 'border-slate-100 dark:border-slate-200/5 border-2 min-w-16 align-top';
type EventItem = {
  name: string;
  start: number;
  end: number;
};

type EventGroup = {
  position: number;
  events: EventItem[];
  spanLength: number;
};

type DayItem = {
  name: string;
  event: EventItem[];
};

const days: DayItem[] = [
  { name: 'Mon', event: [{ name: 'hello sdfasdfsdf asdfasdfsdf sdfjkasdfjk asdfjhasdjkfh kjashdfjkaslhdfkashdlf', start: 4, end: 6 },] },
  { name: 'Tue', event: [{ name: 'how are', start: 3, end: 7 }, { name: 'how are', start: 5, end: 9 }, { name: 'how are', start: 5, end: 9 }, { name: 'how are', start: 5, end: 9 }, { name: 'how are', start: 5, end: 9 },] },
  { name: 'Wed', event: [{ name: 'how are', start: 3, end: 3 },] },
  { name: 'Thu', event: [{ name: 'how are', start: 3, end: 3 },] },
  { name: 'Fri', event: [{ name: 'how are', start: 8, end: 12 },] },
  { name: 'Sat', event: [{ name: 'how are', start: 3, end: 7 }, { name: 'how are', start: 5, end: 9 }, { name: 'how are', start: 5, end: 9 }, { name: 'how are', start: 5, end: 9 }, { name: 'how are', start: 5, end: 9 },] },
  { name: 'Sun', event: [{ name: 'how are', start: 3, end: 3 },] },
];


// const events: EventItem[] = [
//   { name: 'event1', start: 3, end: 3 },
//   { name: 'event2', start: 4, end: 6 },
//   { name: 'event3', start: 3, end: 9 },
//   { name: 'event4', start: 8, end: 12 },
//   { name: 'event5', start: 6, end: 15 },
//   { name: 'event6', start: 16, end: 18 },
//   { name: 'event7', start: 19, end: 21 },
//   { name: 'event8', start: 22, end: 24 },
//   { name: 'event9', start: 25, end: 27 },
//   { name: 'event10', start: 28, end: 30 },
//   { name: 'event11', start: 31, end: 33 },
//   { name: 'event12', start: 34, end: 40 },
//   { name: 'event13', start: 37, end: 39 },
//   { name: 'event14', start: 40, end: 42 },
//   { name: 'event15', start: 43, end: 45 },
//   // { name: 'event16', start: 46, end: 48 },
// ];

const events: EventItem[] = [
  { name: 'event1', start: 3, end: 3 },
  // { name: 'event16', start: 46, end: 48 },
];


function groupTime(events: EventItem[]): EventGroup[] {
  const slots: EventGroup[] = Array.from({ length: 48 }, (_, index) => ({
    position: index + 1,
    events: [],
    spanLength: 0,
  }));

  events.sort((a, b) => a.start - b.start).forEach(eventE => {
    for (let i = eventE.start; i <= eventE.end; i++) {
      slots[i - 1].events.push(eventE);
      slots[i - 1].spanLength = slots[i - 1].events.length;
    }
  });
  // console.log('logE', slots);
  return slots;
}

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',];

function CalenderBoardView() {

  const timeSlot = 30;
  const daySlot = 7;

  function timeManager() {
    const divItem = [
      <th scope="col" key={1} className={headC}>Day/Time</th>,
      ...Array.from({ length: 24 * (60 / timeSlot) }, (_, ind) => {
        const i = Math.floor(ind / 2);
        const j = (ind % 2) * 30;
        const time = `${i.toString().padStart(2, '0')}:${j === 0 ? '00' : j}`;
        return (
          <th scope="col" key={time} className={headC}>
            {time}
          </th>
        );
      }),
    ];
    return <tr>{divItem}</tr>;
  }

  function dayNameManager() {
    const divItem = dayNames.map((dayName, day) => {
      const eventGroups = groupTime(days.find(item => item.name === dayName)?.event || []);
      const maxEventLength = Math.max(...eventGroups.map(event => event.events.length));
      const rows = [];
      for (let row = 0; row < maxEventLength; row++) {
        const cells = []
        for (let column = 0; column < eventGroups.length; column++) {
          const group = eventGroups[column];
          const event = group.events[row];
          if (event && event.start === column + 1) {
            column += event.end - event.start;
            cells.push(
              <td key={dayName} draggable="true" colSpan={event.end - event.start + 1} className={blankCellC}
                onClick={() => { console.log('click', day, row, column); }}>
                <div className={cellC}>{event.name}</div>
              </td>
            );
          } else {
            cells.push(
              <td key={dayName} draggable="true" className={blankCellC}></td>
            );
          }
        }
        rows.push(
          <>
            <tr key={row}>{cells}</tr>
          </>
        );
      }
      return (
        <>
          <td rowSpan={maxEventLength + 1} className={sideC}>{dayName}</td>
          {rows}
          <tr><td colSpan={49} className=' bg-blue-300 h-1'></td></tr>
        </>
      );
    });
    return <>{divItem}</>;
  }

  return (
    <>
      <div className="overflow-x-auto h-full">
        <table className="min-w-full divide-y divide-gray-200 h-full">
          <thead className="sm:min-w-16 lg:max-w-64">
            {timeManager()}
          </thead>
          <tbody>
            {dayNameManager()}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CalenderBoardView;
