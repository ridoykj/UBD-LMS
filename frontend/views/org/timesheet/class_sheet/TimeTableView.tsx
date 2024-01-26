import BranchRC from 'Frontend/components/branch/BranchRC';
import CalenderBoardComponent, { DayItem, TimeRange } from './TimeTableComponent';
import './calendarBoardView.css';
import { useState } from 'react';
import PlaceRC from 'Frontend/components/branch/PlaceRC';

// const dd: DayItem[] = [];
const dd: DayItem[] = [
  { dayName: 'Mon', event: [{ start: '13:45', end: '18:45', content: 'hello sdfasdfsdf\n asdfa\nsdfsdf sdfjkasdfjk asdfjhasdjkfh kjashdfjkaslhdfkashdlf', },] },
  // { name: 'Tue', event: [{ name: 'how are', start: '9:45', end: '18:45' }, { name: 'how are', start: '17:45', end: '18:45' }, { name: 'how are', start: '9:45', end: '18:45' },] },
  { dayName: 'Tue', event: [{ start: '10:30', end: '12:30', content: 'event 1', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }] },
  { dayName: 'Wed', event: [{ start: '10:30', end: '12:30', content: 'event 1', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }, { start: '09:00', end: '10:30', content: 'event 111', }] },
  { dayName: 'Thu', event: [{ start: '12:45', end: '15:31', content: <><b>event 2</b></>, },] },
  { dayName: 'Fri', event: [{ start: '11:25', end: '16:45', content: 'event 3', },] },
  { dayName: 'Sat', event: [{ start: '12:15', end: '17:45', content: 'event 4', },] },
  { dayName: 'Sun', event: [{ start: '11:45', end: '14:45', content: 'event 5', },] },
];

const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',];
const timeRange: TimeRange = { open: '09:00', close: '21:00', interval: 30 };

function CalenderBoardView() {
  const [sectorNameFilter, setSectorNameFilter] = useState('');
  const [buildingNameFilter, setBuildingNameFilter] = useState('');
  const [floorNameFilter, setFloorNameFilter] = useState('');

  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [programmeNameFilter, setProgrammeNameFilter] = useState('');
  const [batchNameFilter, setBatchNameFilter] = useState('');



  return (
    <>
      <PlaceRC
        visibleFields={
          { sector: true, building: true, floor: true, room: true}
        }
        sector={{
          sectorName: sectorNameFilter,
          setSectorName: setSectorNameFilter
        }}
        building={{
          buildingName: buildingNameFilter,
          setBuildingName: setBuildingNameFilter
        }}
        floor={{
          floorName: floorNameFilter,
          setFloorName: setFloorNameFilter
        }}
      />
      <BranchRC
        visibleFields={
          { organization: true, department: true, programme: true, batch: true }
        }
        organization={{
          organizationName: orgNameFilter,
          setOrganizationName: setOrgNameFilter
        }}
        department={{
          departmentName: departmentNameFilter,
          setDepartmentName: setDepartmentNameFilter
        }}
        programme={{
          programmeName: programmeNameFilter,
          setProgrammeName: setProgrammeNameFilter
        }}
        batch={{
          batchName: batchNameFilter,
          setBatchName: setBatchNameFilter
        }}
      />

      <CalenderBoardComponent
        dayNames={dayNames}
        timeRange={timeRange} dayItems={dd} />
    </>
  );
}
export default CalenderBoardView;
