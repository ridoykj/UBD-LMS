import { Dispatch, SetStateAction } from "react";

const headC = 'sticky top-0 left-0 bg-white border-slate-100 bg-clip-padding text-slate-900 border-2 border-slate-100 text-sm font-medium py-2 text-center';
const sideC = 'sticky top-0 left-0 border-slate-100 border-2 text-xs p-1 text-right text-slate-500 uppercase bg-white font-medium';
const cellC = 'bg-blue-400/20 border border-blue-700/10 rounded-lg';
const blankCellC = 'border-2 border-slate-100 min-w-16 p-1 m-1 align-top';
const defaultDayNames = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI',];

export type TimeRange = {
  open: string;
  close: string;
  interval: number;
};

export type DayItem = {
  dayName: string;
  event: EventCapture[];
};

type EventItemProps = {
  eventItem: any,
  setEventItem: Dispatch<SetStateAction<any>>
}

type EventCapture = {
  id: number
  item: any
  start: string;
  end: string;
  content?: any;
};

type EventGroup = {
  position: number;
  events: EventItem[];
  spanLength: number;
};

type EventItem = {
  id: number
  item: any
  start: number;
  end: number;
  content?: any;
};

function maxSlot(timeRange: TimeRange): number {
  return getTimeToSlot(timeRange.close, timeRange.interval) - getTimeToSlot(timeRange.open, timeRange.interval)
}

function getTimeToSlot(time: string, interval: number): number {
  const [hours, minutes, second] = time.split(":").map(Number);
  // console.log('hour:', hours, minutes, second);
  const totalMinutes = hours * 60 + minutes;
  const slotIndex = Math.floor(totalMinutes / interval);
  return slotIndex;
}
function getSlotToTime(slotIndex: number, timeRange: TimeRange): string {
  const totalMinutes = (slotIndex + getTimeToSlot(timeRange.open, timeRange.interval) - 1) * timeRange.interval;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return time;
}

function groupTime(timeRange: TimeRange, events: EventCapture[]): EventGroup[] {
  const start = getTimeToSlot(timeRange.open, timeRange.interval);
  const end = getTimeToSlot(timeRange.close, timeRange.interval);
  const max = maxSlot(timeRange);

  const slots: EventGroup[] = Array.from({ length: max }, (_, index) => ({
    position: index + 1,
    events: [],
    spanLength: 0,
  }));

  events
    .map(event => ({
      ...event,
      start: 1 + getTimeToSlot(event.start, timeRange.interval) - start,
      end: 1 + getTimeToSlot(event.end, timeRange.interval) - start,
    }))
    .filter(event => event.start >= 0 && event.end <= end)
    .sort((a, b) => a.start - b.start)
    .forEach(eventE => {
      for (let i = eventE.start; i <= eventE.end; i++) {
        slots[i - 1].events.push(eventE);
        slots[i - 1].spanLength = slots[i - 1].events.length;
      }
    });
  // console.log('logE', slots);
  return slots;
}

function TimeTableComponent({ timeRange, dayNames, dayItems, itemSelect }: { timeRange: TimeRange, dayNames?: string[], dayItems: DayItem[], itemSelect: EventItemProps }) {

  function timeManager() {
    const divItem = [<th scope="col" key={'head_day_time'} className={`${headC} z-50`}>Day/Time</th>,];
    for (let index = 0; index < maxSlot(timeRange); index++) {
      const i = Math.floor((index + getTimeToSlot(timeRange.open, timeRange.interval)) / 2);
      const j = (index % 2) * 30;
      const time = `${i.toString().padStart(2, '0')}:${j === 0 ? '00' : j}`;
      divItem.push(<th scope="col" key={`day_time_${index}`} className={headC}>{time}</th>);
    }
    return divItem;
  }


  function dayNameManager() {
    return (dayNames ?? defaultDayNames).map((dayName, dayIndex) => {
      const eventGroups = groupTime(timeRange, dayItems.find(item => item.dayName.toUpperCase() === dayName.toUpperCase())?.event || []);
      const maxEventLength = Math.max(...eventGroups.map(event => event.events.length));
      const rows = [];
      for (let row = 0; row < maxEventLength; row++) {
        const cells = []
        if (row == 0) {
          cells.push(<td key={`head_${dayName}`} rowSpan={maxEventLength > 0 ? maxEventLength : 1} className={sideC}>{dayName}</td>);
        }
        for (let column = 0; column < eventGroups.length; column++) {
          const group = eventGroups[column];
          const event = group.events[row];
          if (event && event.start === column + 1) {
            column += event.end - event.start;
            cells.push(
              <td key={`day_data_${dayIndex}_${row}_${column}`} draggable="true" colSpan={event.end - event.start + 1} className={blankCellC}
                onDoubleClick={() => { itemSelect.setEventItem(event.item); }}
              >
                <div className={cellC}>
                  <div className='font-bold text-sm'>{`[${dayName}] ${getSlotToTime(event.start, timeRange)} - ${getSlotToTime(event.end, timeRange)}`}</div>
                  {event.content}
                </div>
              </td>
            );
          } else {
            cells.push(<td key={`blank_cell_${dayIndex}_${row}_${column}`} draggable="true" className={blankCellC}></td>);
          }
        }
        rows.push(<tr key={`cells_${dayIndex}_${row}`} className="border-2 border-slate-100">{cells}</tr>);
      }
      return (
        <>
          {rows.length > 0 ? rows : <tr key={`dayName_${dayIndex}`} className="border-2 border-slate-100"><td className={sideC}>{dayName}</td></tr>}
        </>
      );
    });
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sm:min-w-16 lg:max-w-64">
          <tr>
            {timeManager()}
          </tr>
        </thead>
        <tbody className="sm:min-w-16 lg:max-w-64">
          {dayNameManager()}
        </tbody>
      </table>
    </>
  );
}

export default TimeTableComponent;
