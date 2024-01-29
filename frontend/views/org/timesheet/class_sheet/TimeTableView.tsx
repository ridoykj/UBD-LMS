import { Button } from '@hilla/react-components/Button.js';
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { useForm } from '@hilla/react-form';
import BranchRC from 'Frontend/components/branch/BranchRC';
import PlaceRC from 'Frontend/components/branch/PlaceRC';
import SpeedDialRC from 'Frontend/components/speeddial/SpeedDialRC';
import DayTypeEnum from 'Frontend/generated/com/itbd/application/constants/DayTypeEnum';
import BatchCourseDTOModel from 'Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTOModel';
import BatchRoomDTOModel from 'Frontend/generated/com/itbd/application/dto/org/allocation/BatchRoomDTOModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { BatchCourseDtoCrudService, BatchRoomDtoCrudService } from 'Frontend/generated/endpoints';
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { useMemo, useState } from 'react';
import { FaCopy, FaDownload, FaPrint, FaRegCalendarPlus, FaShareAlt } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import TimeTableComponent, { DayItem, TimeRange } from './TimeTableComponent';
import './calendarBoardView.css';
import BatchCourseDTO from 'Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTO';

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

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '320px', columns: 2 },
];

const days = Object.values(DayTypeEnum).map(level => ({ label: level, value: level }));

const courseCustomItemRenderer = (item: BatchCourseDTOModel<BatchCourseDTO>) => {
  const batch: BatchCourseDTO = item.valueOf();
  console.log('courseCustomItemRenderer', item.valueOf().name);
  return (
    <div className="border-b">
      <p className="text-sm font-semibold">{`${batch.course?.code} - ${batch.course?.name} - [${batch.semester}]`}</p>
    </div>
  );
};


function CalenderBoardView() {
  const [isOpen, setIsOpen] = useState(false);

  const [sectorNameFilter, setSectorNameFilter] = useState('');
  const [buildingNameFilter, setBuildingNameFilter] = useState('');
  const [floorNameFilter, setFloorNameFilter] = useState('');

  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [programmeNameFilter, setProgrammeNameFilter] = useState('');
  const [batchNameFilter, setBatchNameFilter] = useState('');
  const [semesterNameFilter, setSemesterNameFilter] = useState('');

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


  const batchCourseDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<BatchCourseDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          // {
          //   '@type': 'propertyString',
          //   propertyId: 'programme.name',
          //   filterValue: programmeNameFilter || '',
          //   matcher: Matcher.EQUALS
          // }, 
          // {
          //   '@type': 'propertyString',
          //   propertyId: 'name',
          //   filterValue: params.filter,
          //   matcher: Matcher.CONTAINS
          // }, {
          //   '@type': 'propertyString',
          //   propertyId: 'code',
          //   filterValue: params.filter,
          //   matcher: Matcher.CONTAINS
          // },
        ];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BatchCourseDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    []
  );

  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='flex-none'>
          <PlaceRC
            visibleFields={
              { sector: true, building: true, floor: true, room: true }
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
              { organization: true, department: true, programme: true, batch: true, semester: true }
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
            semester={{
              semesterName: semesterNameFilter,
              setSemesterName: setSemesterNameFilter
            }}
          />
        </div>
        <div className='grow overflow-x-auto'>
          <TimeTableComponent
            dayNames={dayNames}
            timeRange={timeRange} dayItems={dd} />
        </div>
      </div>
      <div>
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
              <Button className="border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={close}>Delete</Button>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={close}>Reserve</Button>
            </>
          )}
        >
          <div className="w-96">
            <FormLayout responsiveSteps={responsiveSteps} className="p-2 w-full">
              <ComboBox label={'Batch-Course'}  {...{ colspan: 2 }} {...field(model.batchCourse)} dataProvider={batchCourseDataProvider} itemLabelPath='course.code' itemValuePath='course.code' clearButtonVisible
                renderer={({ item }) => courseCustomItemRenderer(item)}
                style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties} />

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
        <SpeedDialRC children={[
          { name: 'Share', icon: <FaShareAlt />, onClick: () => { console.log('Share') } },
          { name: 'Print', icon: <FaPrint />, onClick: () => { console.log('Print') } },
          { name: 'Save', icon: <FaDownload />, onClick: () => { console.log('Save') } },
          { name: 'Copy', icon: <FaCopy />, onClick: () => { console.log('Copy') } },
          { name: 'Reserve', icon: <FaRegCalendarPlus />, onClick: () => { setIsOpen(true) } },
        ]} />
      </div >
    </>
  );
}
export default CalenderBoardView;
