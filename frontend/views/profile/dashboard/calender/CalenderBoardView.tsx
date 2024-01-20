import CalenderBoardComponent, { DayItem, TimeRange } from './CalenderBoardComponent';
import './calendarBoardView.css';

// const dd: DayItem[] = [];
const dd: DayItem[] = [
  { dayName: 'Mon', event: [{ start: '13:45', end: '18:45', content: 'hello sdfasdfsdf\n asdfa\nsdfsdf sdfjkasdfjk asdfjhasdjkfh kjashdfjkaslhdfkashdlf', },] },
  // { name: 'Tue', event: [{ name: 'how are', start: '9:45', end: '18:45' }, { name: 'how are', start: '17:45', end: '18:45' }, { name: 'how are', start: '9:45', end: '18:45' },] },
  { dayName: 'Wed', event: [{ start: '10:30', end: '12:30', content: 'event 1', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }] },
  { dayName: 'Thu', event: [{ start: '12:45', end: '15:31', content: <><b>event 2</b></>, },] },
  { dayName: 'Fri', event: [{ start: '11:25', end: '16:45', content: 'event 3', },] },
  { dayName: 'Sat', event: [{ start: '12:15', end: '17:45', content: 'event 4', },] },
  { dayName: 'Sun', event: [{ start: '11:45', end: '14:45', content: 'event 5', },] },
];

const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',];
const timeRange: TimeRange = { open: '09:00', close: '21:00', interval: 30 };

function CalenderBoardView() {

  return (
    <>
      <CalenderBoardComponent
        dayNames={dayNames}
        timeRange={timeRange} dayItems={dd} />
    </>
  );
}
export default CalenderBoardView;
