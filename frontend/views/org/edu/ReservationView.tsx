import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { MultiSelectComboBox } from '@hilla/react-components/MultiSelectComboBox.js';
import { NumberField } from "@hilla/react-components/NumberField.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import BranchRC, { BranchCombobox } from "Frontend/components/branch/BranchRC";
import PlaceRC, { PlaceCombobox } from "Frontend/components/branch/PlaceRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import { ClassActivity, ItemSelect } from "Frontend/constants/ItemSelect";
import BuildingDAO from "Frontend/generated/com/itbd/application/dao/org/place/BuildingDAO";
import FloorDAO from "Frontend/generated/com/itbd/application/dao/org/place/FloorDAO";
import SectorDAO from "Frontend/generated/com/itbd/application/dao/org/place/SectorDAO";
import BatchDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDTOModel";
import CourseDTO from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDTO";
import CourseDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDTOModel";
import ReservationDTO from "Frontend/generated/com/itbd/application/dto/org/edu/ReservationDTO";
import ReservationDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ReservationDTOModel";
import RoomDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/RoomDTOModel";
import InstructorDTOModel from "Frontend/generated/com/itbd/application/dto/user/instructor/InstructorDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BatchDtoCrudService, CourseDtoCrudService, InstructorDtoCrudService, ReservationDtoCrudService, RoomDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";

const ReservationView = () => {

  const [branchFilter, setBranchFilter] = useState<BranchCombobox>({
    organizationFilter: undefined,
    departmentFilter: undefined,
    programmeFilter: undefined,
  });


  // const [orgFilter, setOrgFilter] = useState<OrganizationDAO>({} as OrganizationDAO);
  // const [departmentFilter, setDepartmentFilter] = useState<DepartmentDAO>({} as DepartmentDAO);
  // const [programmeFilter, setProgrammeFilter] = useState<ProgrammeDAO>({} as ProgrammeDAO);

  // const [sectorFilter, setSectorFilter] = useState<SectorDAO>({} as SectorDAO);
  // const [buildingFilter, setBuildingFilter] = useState<BuildingDAO>({} as BuildingDAO);
  // const [floorFilter, setFloorFilter] = useState<FloorDAO>({} as FloorDAO);

  const [placeFilter, setPlaceFilter] = useState<PlaceCombobox>({
    sectorFilter: {} as SectorDAO,
    buildingFilter: {} as BuildingDAO,
    floorFilter: {} as FloorDAO,
  });


  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedReservationItems, setSelectedReservationItems] = useState<ReservationDTO[]>([]);

  const { model, field, value, read, update, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(ReservationDTOModel, {
    onSubmit: async (reservation) => {
      console.log('reservation', reservation);
      await ReservationDtoCrudService.save(reservation).then((result) => {
        refreshGrid();
        setSelectedReservationItems(result ? [result] : []);
        setSuccessNotification(true);
        clear();
      });
    }
  });

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }


  const classTypeDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<ItemSelect>
      ) => {
        // const child: PropertyStringFilter[] = [{
        //   '@type': 'propertyString',
        //   propertyId: 'name',
        //   filterValue: params.filter,
        //   matcher: Matcher.CONTAINS
        // },];

        // const { pagination, filters } = comboBoxLazyFilter(params, 'or', child);
        const data: ItemSelect[] = ClassActivity.filter(el => el.item === params.filter || params.filter === '');
        console.log('classTypes', data);
        callback(data, data.length === 0 ? 1 : data.length);
      },
    []
  );

  const roomDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<RoomDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'name',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'or', child);
        RoomDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    []
  );

  const batchDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<BatchDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'programme.id',
            filterValue: branchFilter.programmeFilter?.id?.toString() || '',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BatchDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    [branchFilter.programmeFilter]
  );

  const courseDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<CourseDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'programme.id',
            filterValue: branchFilter.programmeFilter?.id?.toString() || '',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          }, {
            '@type': 'propertyString',
            propertyId: 'code',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        CourseDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    [branchFilter.programmeFilter]
  );

  const instructorDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<InstructorDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'person.givenName',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'or', child);
        InstructorDtoCrudService.list(pagination, filters).then((result: any) => {
          console.log('instructorDataProvider', result);
          callback(result);
        });
      },
    []
  );

  const courseCustomItemRenderer = (item: CourseDTOModel<CourseDTO>) => {
    const course: CourseDTO = item.valueOf();
    console.log('courseCustomItemRenderer', item.valueOf().name);
    return (
      <div className="border-b">
        <p className="text-sm font-semibold">{`${course.code} - ${course.name}`}</p>
      </div>
    );
  }

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '600px', columns: 2 },
  ];

  const discardButtonColors: { [key: string]: string } = {
    true: 'text-white bg-indigo-400 hover:bg-indigo-500',
    false: 'text-white bg-gray-300',
  };

  const saveButtonColors: { [key: string]: string } = {
    true: 'text-white bg-emerald-400 hover:bg-emerald-500',
    false: 'text-white bg-gray-300',
  };

  return (
    <>
      <SplitLayout className="h-full w-full">
        <VerticalLayout className="h-full w-full items-stretch">
          <PlaceRC
            visibleFields={
              { sector: true, building: true, }
            }
            // sector={{
            //   sectorFilter: sectorFilter,
            //   setSectorFilter: setSectorFilter
            // }}
            // building={{
            //   buildingFilter: buildingFilter,
            //   setBuildingFilter: setBuildingFilter
            // }}
            // floor={{
            //   floorFilter: floorFilter,
            //   setFloorFilter: setFloorFilter
            // }}
            placeProps={{ place: placeFilter, setPlace: setPlaceFilter }}
          />
          <BranchRC
            visibleFields={
              { organization: true, department: true, programme: true, }
            }
            branchProps={{ branch: branchFilter, setBranch: setBranchFilter }}
          />
          <AutoGrid service={ReservationDtoCrudService} model={ReservationDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'code', 'duration', 'room.name', 'room.block', 'course.programme.name', 'status',]}
            selectedItems={selectedReservationItems}
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              console.log('item', item);
              setSelectedReservationItems(item ? [item] : []);
              read(item);
            }}
            columnOptions={{
              'course.programme.name': {
                header: 'Programme',
                externalValue: branchFilter.programmeFilter != null ? branchFilter.programmeFilter?.name : '',
                // setExternalValue: setProgrammeFilter,
              },
            }}
          />
        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96 h-full">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># {value.name ?? 'Unknown Title'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <main className="overflow-y-scroll w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
              <ComboBox label={'Room'}  {...field(model.room)} dataProvider={roomDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              <ComboBox label={'Batch'}  {...field(model.batch)} dataProvider={batchDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              {/* <ComboBox label={'Course'}  {...field(model.course)} dataProvider={courseDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible
                renderer={({ item }) => courseCustomItemRenderer(item)}
                style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties}
              /> */}
              <ComboBox label={'Instructor'}  {...field(model.instructor)} dataProvider={instructorDataProvider} itemLabelPath='person.givenName' itemValuePath='person.givenName' clearButtonVisible />
              <TextField label={'Name'}  {...field(model.name)} />
              <TextField label={'Code'}  {...field(model.code)} />
              <MultiSelectComboBox label={'Type'} dataProvider={classTypeDataProvider}
                itemLabelPath="item"
                itemValuePath='type'
                itemIdPath="id"
                selectedItems={JSON.parse(value.type ?? '[]')}
                onSelectedItemsChanged={(e) => {
                  console.log('onSelectedItemsChanged', e.detail.value);
                  value.type = JSON.stringify(e.detail.value);
                }}
                clearButtonVisible
              />
              <NumberField label={'Duration (min)'}  {...field(model.duration)} />
              <TextField label={'Description'}  {...field(model.description)} />
              <TextField label={'Status'}  {...field(model.status)} />
            </FormLayout>
          </main>
          <footer className="flex flex-row bg-gray-100 w-full">
            <div className="w-full">
              {
                selectedReservationItems[0]?.id === undefined ? null :
                  <Button
                    className="text-white bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setDialogOpened(true);
                      console.log('delete', selectedReservationItems[0]?.id);
                    }}
                  >Delete</Button>
              }
            </div>
            {
              !dirty ? null :
                <div className="flex flex-row content-end space-x-4">
                  <Button
                    className={discardButtonColors[dirty.toString()]}
                    disabled={!dirty}
                    onClick={reset}
                  >
                    Discard
                  </Button>
                  <Button
                    className={saveButtonColors[dirty.toString()]}
                    disabled={invalid || submitting || !dirty}
                    onClick={submit}
                  >
                    {selectedReservationItems[0]?.id !== undefined ? 'Update' : 'Save'}
                  </Button>
                </div>
            }
          </footer>
        </VerticalLayout>
      </SplitLayout>
      <NotificationUtil opened={successNotification} type="update"
        message={{
          title: 'Successfully Updated',
          description: value.name,
        }}
        onOpenedChanged={(event) => {
          if (!event.detail.value) {
            setSuccessNotification(event.detail.value);
          }
        }}
        onClick={() => { setSuccessNotification(false) }}
      />
      <ConfirmDialog
        header="Delete Item"
        cancelButtonVisible
        rejectButtonVisible
        rejectText="Discard"
        confirmText="Confirm"
        confirmTheme="error primary"
        opened={dialogOpened}
        onOpenedChanged={(event) => {
          setDialogOpened(event.detail.value);
          if (event.detail.value) {
            // setStatus('');
          }
        }}
        onConfirm={() => {
          ReservationDtoCrudService.delete(selectedReservationItems[0]?.id).then((result) => {
            refreshGrid();
            setSelectedReservationItems([]);
            reset();
          });
        }}>
        {`Do you want to delete?${value.name}`}
      </ConfirmDialog >
    </>
  );
};

export default ReservationView;
