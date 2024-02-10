import { NotNull } from '@hilla/form';
import { Button } from '@hilla/react-components/Button.js';
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { Tab } from '@hilla/react-components/Tab.js';
import { TabSheet } from '@hilla/react-components/TabSheet.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { useForm, useFormPart } from '@hilla/react-form';
import BranchRC, { BranchCombobox } from 'Frontend/components/branch/BranchRC';
import PlaceRC, { PlaceCombobox } from 'Frontend/components/branch/PlaceRC';
import SpeedDialRC from 'Frontend/components/speeddial/SpeedDialRC';
import DayTypeEnum from 'Frontend/generated/com/itbd/application/constants/enums/DayTypeEnum';
import EventTypeEnum from 'Frontend/generated/com/itbd/application/constants/enums/EventTypeEnum';
import BatchCourseDTO from 'Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTO';
import BatchCourseDTOModel from 'Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTOModel';
import BatchRoomDTO from 'Frontend/generated/com/itbd/application/dto/org/allocation/BatchRoomDTO';
import BatchRoomDTOModel from 'Frontend/generated/com/itbd/application/dto/org/allocation/BatchRoomDTOModel';
import RoomDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/RoomDTOModel';
import Filter from 'Frontend/generated/dev/hilla/crud/filter/Filter';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';
import { BatchCourseDtoCrudService, BatchRoomDtoCrudService, RoomDtoCrudService } from 'Frontend/generated/endpoints';
import { configDatePickerI18n } from 'Frontend/util/DatePickerI18n';
import NotificationUtil from 'Frontend/util/NotificationUtil';
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { useEffect, useMemo, useState } from 'react';
import { FaCopy, FaDownload, FaPrint, FaRegCalendarPlus, FaShareAlt } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import TimeTableComponent, { DayItem, TimeRange } from './TimeTableComponent';
import { FormLayout } from '@hilla/react-components/FormLayout.js';

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '500px', columns: 2 },
];


const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',];
const timeRange: TimeRange = { open: '09:00', close: '21:00', interval: 30 };

const days = Object.values(DayTypeEnum).map(level => ({ label: level, value: level }));
const eventTypes = Object.values(EventTypeEnum).map(level => ({ label: level, value: level }));

const courseCustomItemRenderer = (item: BatchCourseDTOModel<BatchCourseDTO>) => {
  const batch: BatchCourseDTO = item.valueOf();
  return (
    <div className="border-b">
      <p className="text-sm font-semibold">{`[${batch.semester}] - ${batch.course?.code} - ${batch.course?.name}`}</p>
    </div>
  );
};

function TimeTableView() {
  const [startTime, setStartTime] = useState('');
  const [closeTime, setCloseTime] = useState('');

  const [successNotification, setSuccessNotification] = useState<boolean>(false);
  const [failureNotification, setFailureNotification] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);

  const [placeFilter, setPlaceFilter] = useState<PlaceCombobox>({
    sectorFilter: undefined,
    buildingFilter: undefined,
    floorFilter: undefined,
  });


  const [branchFilter, setBranchFilter] = useState<BranchCombobox>({
    organizationFilter: undefined,
    departmentFilter: undefined,
    programmeFilter: undefined,
    batchFilter: undefined,
    semesterFilter: undefined,
  });

  const [dayEvents, setDayEvents] = useState<DayItem[]>();
  const [eventRefresh, setEventRefresh] = useState<boolean>(false);
  const [eventItem, setEventItem] = useState<BatchRoomDTOModel>();

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting, validate, } = useForm(BatchRoomDTOModel, {
    onSubmit: async (batchRoom) => {
      console.log('instructor', batchRoom);
      await BatchRoomDtoCrudService.save(batchRoom).then((result) => {
        clear();
        setSuccessNotification(true);
        setIsOpen(false);
        setEventRefresh(!eventRefresh);
      }).catch((error) => {
        setFailureNotification(true);
      })
    }
  });
  const batchCourseField = useFormPart(model.batchCourse);
  const roomField = useFormPart(model.room);

  useEffect(() => {
    batchCourseField.addValidator(
      new NotNull({
        message: 'Please select a Course'
      }));
    roomField.addValidator(
      new NotNull({
        message: 'Please select a Room'
      }));
  }, []);

  const roomDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<RoomDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'floor.id',
            filterValue: placeFilter.floorFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          },
          {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        console.log('roomDataProvider', placeFilter.floorFilter);
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        RoomDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [placeFilter.floorFilter]
  );

  const batchCourseDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<BatchCourseDTOModel>
      ) => {
        console.log('semesterNameFilter', branchFilter.semesterFilter);
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'batch.id',
            filterValue: branchFilter.batchFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'course.code',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          }, {
            '@type': 'propertyString',
            propertyId: 'semester',
            filterValue: branchFilter.semesterFilter?.semester?.toString() || '0',
            matcher: Matcher.EQUALS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BatchCourseDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    [branchFilter.batchFilter, branchFilter.semesterFilter,]
  );

  const batchRoomDataProvider = useEffect(
    () => {
      const child: PropertyStringFilter[] = [
        {
          '@type': 'propertyString',
          propertyId: 'batchCourse.semester',
          filterValue: branchFilter.semesterFilter?.semester?.toString() || '0',
          matcher: Matcher.EQUALS
        },
      ];

      const pagination: Pageable = {
        pageNumber: 0,
        pageSize: 1,
        sort: {
          orders: []
        },
      };
      const filters: Filter = {
        '@type': 'or',
        children: child
      };
      BatchRoomDtoCrudService.list(pagination, filters).then((result: BatchRoomDTO[]) => {
        const dayEvents: DayItem[] = [];
        result.map((batchRoom, index) => {
          const events = dayEvents.find((item) => item.dayName === batchRoom.dayName?.substring(0, 3));
          const contentBuild = `${batchRoom.batchCourse?.course?.code}, ${batchRoom.eventType}, [${batchRoom.batchCourse?.batchCoordinators?.map(el => el?.instructor?.person?.givenName).join(', ')}], ${batchRoom.room?.name ?? ''}, ${batchRoom.room?.floor?.name ?? ''}, ${batchRoom.room?.floor?.building?.name ?? ''}, ${batchRoom.description ?? ''}`;
          events?.event.push({
            id: batchRoom.id ?? 0,
            item: batchRoom,
            start: batchRoom.startTime ?? '',
            end: batchRoom.endTime ?? '',
            content: contentBuild,
          });
          if (!events) {
            const dayItem: DayItem = {
              dayName: batchRoom.dayName?.substring(0, 3) ?? '',
              event: [{
                id: batchRoom.id ?? 0,
                item: batchRoom,
                start: batchRoom.startTime ?? '',
                end: batchRoom.endTime ?? '',
                content: contentBuild,
              },]
            };
            dayEvents.push(dayItem);
          }
        });
        setDayEvents(dayEvents);
      });
    },
    [branchFilter.semesterFilter, eventRefresh]
  );

  useEffect(() => {
    if (eventItem) {
      read(eventItem.valueOf());
      setIsOpen(true);
      setEventRefresh(!eventRefresh);
    }
  }, [eventItem]);

  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='flex-none'>
          <PlaceRC
            visibleFields={
              { sector: true, building: true, floor: true, room: true }
            }
            placeProps={{ place: placeFilter, setPlace: setPlaceFilter }}
          />
          <BranchRC
            visibleFields={
              { organization: true, department: true, programme: true, batch: true, semester: true }
            }
            branchProps={{ branch: branchFilter, setBranch: setBranchFilter }}
          />
        </div>
        <TabSheet className='grow overflow-x-auto p-0 m-0'>
          <Tabs slot="tabs">
            <Tab id="week-tab">Week</Tab>
            <Tab id="month-tab">Month</Tab>
            <Tab id="day-tab">Day</Tab>
          </Tabs>

          <div {...{ tab: 'week-tab' }} className='p-0 m-0'>
            <TimeTableComponent
              dayNames={dayNames}
              timeRange={timeRange} dayItems={dayEvents || []}
              itemSelect={{
                eventItem: eventItem,
                setEventItem: setEventItem
              }} />
          </div>
          <div {...{ tab: 'month-tab' }} className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <img className='w-52' src="images/empty-plant.png" />
            <h2>This place intentionally left empty</h2>
            <p>It’s a place where you can grow your own UI 🤗</p></div>
          <div {...{ tab: 'day-tab' }} className="flex flex-col h-full items-center justify-center p-l text-center box-border">
            <img className='w-52' src="images/empty-plant.png" />
            <h2>This place intentionally left empty</h2>
            <p>It’s a place where you can grow your own UI 🤗</p>
          </div>
        </TabSheet >
      </div >
      <div className='w-full'>
        <NotificationUtil opened={successNotification} type="update"
          message={{
            title: 'Successfully Updated',
            description: value.batchCourse?.code,
          }}
          onOpenedChanged={(event) => {
            if (!event.detail.value) {
              setSuccessNotification(event.detail.value);
            }
          }}
          onClick={() => { setSuccessNotification(false) }}
        />
        <NotificationUtil opened={failureNotification} type="error"
          message={{
            title: 'Unable to Updated',
            description: 'Please set required fields and try again.',
          }}
          onOpenedChanged={(event) => {
            if (!event.detail.value) {
              setFailureNotification(event.detail.value);
            }
          }}
          onClick={() => { setSuccessNotification(false) }}
        />
        <Dialog modeless draggable resizable opened={isOpen} overlayClass='w-1/2'
          onOpenedChanged={(event) => {
            setIsOpen(event.detail.value);
          }}
          headerRenderer={() => (
            <>
              <h2 className="draggable flex-1 cursor-move margin-0 font-bold text-2xl padding-m-0">Reserve Schedule</h2>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setIsOpen(false);
                  clear();
                }}>
                <FaX /> <span className="sr-only">Close</span>
              </button>
            </>
          )}
          footerRenderer={({ original }) => (
            <>
              <Button className="border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white" onClick={() => {
                setIsOpen(false);
                clear();
              }}>Cancel</Button>
              {value.id && <Button className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => {
                  BatchRoomDtoCrudService.delete(value.id).then((result) => {
                    setEventRefresh(!eventRefresh);
                    setIsOpen(false);
                    clear();
                  })
                }}>Delete</Button>
              }
              <Button className={`text-white disabled:opacity-75 ${dirty ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'}`} disabled={!dirty} onClick={(e) => submit()}>
                {value.id != null ? 'Update' : 'Add'}</Button>
            </>
          )}
        >
          <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
            <ComboBox label={'Course Code'} {...{ colspan: 1 }} dataProvider={batchCourseDataProvider} {...field(model.batchCourse)} itemLabelPath='course.code' itemValuePath='batchCourse.id' clearButtonVisible
              renderer={({ item }) => courseCustomItemRenderer(item)}
              style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties} />
            <ComboBox label={'Room'} {...{ colspan: 1 }} dataProvider={roomDataProvider} {...field(model.room)} itemLabelPath='name' itemValuePath='room.id' clearButtonVisible />
            <ComboBox label={'Day'} {...{ colspan: 1 }} {...field(model.dayName)} items={days} itemLabelPath="label" />
            <ComboBox label={'Event Activity'} {...{ colspan: 1 }} {...field(model.eventType)} items={eventTypes} itemLabelPath="label" />
            <DatePicker label={'Start Date'} {...{ colspan: 1 }} {...field(model.startDate)} i18n={{ ...configDatePickerI18n, }}
              max={value.endDate ? value.endDate.toString() : ''}
              onValueChanged={(event) => {
                console.log('event.detail.value', event.detail.value);
              }} />
            <DatePicker label={'End Date'} {...{ colspan: 1 }} {...field(model.endDate)} i18n={{ ...configDatePickerI18n, }}
              min={value.startDate ? value.startDate.toString() : ''}
              onValueChanged={(event) => {
                console.log('event.detail.value', event.detail.value);
              }} />
            <TimePicker label={'Start Time'}{...{ colspan: 1 }} min='09:00' max={closeTime}  {...field(model.startTime)}
              onValueChanged={(event) => {
                setStartTime(event.detail.value);
              }} />
            <TimePicker label={'End Time'} {...{ colspan: 1 }} min={startTime} max='20:00' {...field(model.endTime)}
              onValueChanged={(event) => {
                setCloseTime(event.detail.value);
              }} />
            {/* <TextField label={'Contact'}  {...{ colspan: 2 }} {...field(model.contact)} /> */}
            <TextArea label={'Description'} {...{ colspan: 2 }} className='col-span-2' {...field(model.description)} />
          </FormLayout>
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
export default TimeTableView;
