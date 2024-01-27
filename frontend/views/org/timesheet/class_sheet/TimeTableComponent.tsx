import { Button } from "@hilla/react-components/Button.js";
import { ComboBox } from "@hilla/react-components/ComboBox.js";
import { DatePicker } from "@hilla/react-components/DatePicker.js";
import { Dialog } from '@hilla/react-components/Dialog.js';
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { TimePicker } from "@hilla/react-components/TimePicker.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { useForm } from "@hilla/react-form";
import DayTypeEnum from "Frontend/generated/com/itbd/application/constants/DayTypeEnum";
import BatchRoomDTOModel from "Frontend/generated/com/itbd/application/dto/org/allocation/BatchRoomDTOModel";
import { BatchRoomDtoCrudService } from "Frontend/generated/endpoints";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

const headC = 'sticky top-0 left-0 z-50 bg-white dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-700 border-slate-100 dark:border-black/10 bg-clip-padding text-slate-900 dark:text-slate-200 border-b text-sm font-medium py-2 text-center';
const sideC = 'sticky top-0 left-0 border-slate-100 dark:border-slate-200/5 border-4 text-xs p-1 text-right text-slate-500 uppercase bg-white dark:bg-slate-800 font-medium';
const cellC = 'bg-blue-400/20 dark:bg-sky-600/50 border border-blue-700/10 dark:border-sky-500 rounded-lg';
const blankCellC = 'border-slate-100 dark:border-slate-200/5 border-2 min-w-16 p-1 m-1 align-top';
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

type EventCapture = {
  content?: any;
  start: string;
  end: string;
};

type EventGroup = {
  position: number;
  events: EventItem[];
  spanLength: number;
};

type EventItem = {
  content?: any;
  start: number;
  end: number;
};

function maxSlot(timeRange: TimeRange): number {
  return getTimeToSlot(timeRange.close, timeRange.interval) - getTimeToSlot(timeRange.open, timeRange.interval)
}

function getTimeToSlot(time: string, interval: number): number {
  const [hours, minutes] = time.split(":").map(Number);
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
const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '320px', columns: 2 },
];
function TimeTableComponent({ timeRange, dayNames, dayItems }: { timeRange: TimeRange, dayNames?: string[], dayItems: DayItem[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(BatchRoomDTOModel, {
    onSubmit: async (batchRoom) => {
      console.log('instructor', batchRoom);
      await BatchRoomDtoCrudService.save(batchRoom).then((result) => {
        // refreshGrid();
        // setSelectedInstructorItems(result ? [result] : []);
        // setSuccessNotification(true);
      });
    }
  });

  function timeManager() {
    const divItem = [
      <th scope="col" key={'head_day_time'} className={headC}>Day/Time</th>,
      ...Array.from({ length: maxSlot(timeRange) }, (_, ind) => {
        const i = Math.floor((ind + getTimeToSlot(timeRange.open, timeRange.interval)) / 2);
        const j = (ind % 2) * 30;
        const time = `${i.toString().padStart(2, '0')}:${j === 0 ? '00' : j}`;
        return (
          <th scope="col" key={`day_time_${ind}`} className={headC}>
            {time}
          </th>
        );
      }),
    ];
    return <tr>{divItem}</tr>;
  }


  const days = Object.values(DayTypeEnum).map(level => ({ label: level, value: level }));
  // const dialogButton: ButtonRCProps[] = [
  //   { type: 'primary', name: 'Save', onClick: () => { console.log('save'); } },
  // ];

  function dayNameManager() {
    const divItem = (dayNames ?? defaultDayNames).map((dayName, day) => {
      const eventGroups = groupTime(timeRange, dayItems.find(item => item.dayName.toUpperCase() === dayName.toUpperCase())?.event || []);
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
              <td key={`day_data_${dayName}_${row}_${column}`} draggable="true" colSpan={event.end - event.start + 1} className={blankCellC}
                onDoubleClick={() => { console.log('double click', day, row, column); }}
                onClick={() => { console.log('click', day, row, column); }}>
                <div className={cellC}>
                  <div className='font-bold text-sm'>{`[${dayName}] ${getSlotToTime(event.start, timeRange)} - ${getSlotToTime(event.end, timeRange)}`}</div>
                  {event.content}
                </div>
              </td>
            );
          } else {
            cells.push(<td key={`day_data_${dayName}_${row}_${column}`} draggable="true" className={blankCellC}></td>);
          }
        }
        rows.push(<tr key={`day_row_${dayName}_${row}`}>{cells}</tr>);
      }
      return (
        <>
          <td key={`head_side_${dayName}`} rowSpan={maxEventLength + 1} className={sideC}>{dayName}</td>
          {rows}
          <tr><td key={`blank_${dayName}`} colSpan={maxSlot(timeRange) + 1} className='bg-blue-300 h-1'></td></tr>
        </>
      );
    });
    return <>{divItem}</>;
  }

  const tableContent = dayNameManager();

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sm:min-w-16 lg:max-w-64">
          {timeManager()}
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
      <Dialog aria-label="Reserve Schedule" draggable modeless opened={isOpen} className="w-1/4"
        onOpenedChanged={(event) => {
          setIsOpen(event.detail.value);
        }}
        headerRenderer={() => (
          <>
            <h2 className="draggable flex-1 cursor-move margin-0 font-bold text-2xl padding-m-0">
              Reserve Schedule
            </h2>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              <FaX /> <span className="sr-only">Close</span>
            </button>
          </>
        )}
        footerRenderer={() => (
          <>
            <Button className="border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white" onClick={close}>Cancel</Button>
            <Button className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={close}>
              Delete
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={close}>
              Reserve
            </Button>
          </>
        )}
      >
        <div className="w-96">
          <FormLayout responsiveSteps={responsiveSteps} className="p-2 w-full">
            <ComboBox label={'Batch-Course'}  {...{ colspan: 2 }} {...field(model.batchCourse)} />
            <ComboBox label={'Room'}  {...{ colspan: 2 }} {...field(model.room)} />
            <ComboBox label={'Day'}  {...{ colspan: 2 }} {...field(model.dayName)} items={days} itemLabelPath="label" />
            <DatePicker label={'Start Date'}  {...{ colspan: 1 }} {...field(model.startDate)} />
            <DatePicker label={'End Date'}  {...{ colspan: 1 }} {...field(model.endDate)} />
            <TimePicker label={'Start Time'}  {...{ colspan: 1 }} {...field(model.startTime)} />
            <TimePicker label={'End Time'}  {...{ colspan: 1 }} {...field(model.endTime)} />
            {/* <TextField label={'Contact'}  {...{ colspan: 2 }} {...field(model.contact)} /> */}
            <TextArea label={'Description'}  {...{ colspan: 2 }} {...field(model.description)} />
          </FormLayout>
        </div>
      </Dialog>
    </>
  );
}

export default TimeTableComponent;
