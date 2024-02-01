import { Button } from "@hilla/react-components/Button.js";
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { IntegerField } from "@hilla/react-components/IntegerField.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoGridRef } from "@hilla/react-crud";
import { useForm } from "@hilla/react-form";
import PlaceRC from "Frontend/components/branch/PlaceRC";
import { AutoGrid } from "Frontend/components/grid/autogrid";
import RoomTypeEnum from "Frontend/generated/com/itbd/application/constants/RoomTypeEnum";
import FloorDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/FloorDTOModel";
import RoomDTO from "Frontend/generated/com/itbd/application/dto/org/place/RoomDTO";
import RoomDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/RoomDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { FloorDtoCrudService, RoomDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";

const RoomView = () => {

  const [sectorNameFilter, setSectorNameFilter] = useState('');
  const [buildingNameFilter, setBuildingNameFilter] = useState('');
  const [floorNameFilter, setFloorNameFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedInstructorItems, setSelectedInstructorItems] = useState<RoomDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(RoomDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await RoomDtoCrudService.save(instructor).then((result) => {
        refreshGrid();
        setSelectedInstructorItems(result ? [result] : []);
        setSuccessNotification(true);
        clear();
      });
    }
  });

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const roomTypes = Object.values(RoomTypeEnum).map(level => ({ label: level, value: level }));

  const floorDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<FloorDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'building.name',
            filterValue: buildingNameFilter,
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        console.log('params', params);
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        FloorDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });

      },
    [floorNameFilter]
  );

  // const buildingType = Object.values(BuildingTypeEnum).map(level => ({ label: level, value: level }));
  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 4 },
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
              { sector: true, building: true, floor: true }
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
          <AutoGrid service={RoomDtoCrudService} model={RoomDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'hasPublicAccess', 'block', 'totalRooms', 'floor.name', 'floor.building.name',]}
            selectedItems={selectedInstructorItems}
            theme="row-stripes"
            columnOptions={{
              'name': {
                header: 'Name',
                resizable: true,
              },
              'hasPublicAccess': {
                header: 'Public Access',
                resizable: true,
              },
              'totalRooms': {
                header: 'Total Rooms',
                resizable: true,
              },
              'block': {
                header: 'Block',
                resizable: true,
              },
              'floor.name': {
                header: 'Floor',
                resizable: true,
                externalValue: floorNameFilter
              },
              'floor.building.name': {
                header: 'Building',
                resizable: true,
                externalValue: floorNameFilter
              },
            }}
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              console.log('item', item);
              setSelectedInstructorItems(item ? [item] : []);
              read(item);
            }}
          />
        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full">#{selectedInstructorItems[0]?.id ?? ''} - Room</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={() => {
                clear();
                setSelectedInstructorItems([]);
              }}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <main className="overflow-y-scroll w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
              <ComboBox label={'Floor'}  {...field(model.floor)} dataProvider={floorDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              <TextField label={'Name'}  {...{ colspan: 2 }} {...field(model.name)} />
              {/* <Select label={'Building Type'}  {...{ colspan: 1 }} {...field(model.type)} items={buildingType} /> */}
              <Checkbox label={'Public Access'}  {...{ colspan: 2 }} {...field(model.hasPublicAccess)} />
              <TextField label={'Block'}  {...{ colspan: 2 }} {...field(model.block)} />
              {/* <ComboBox label={'Room type'} items={roomTypes} itemLabelPath='value' itemValuePath='value'  {...field(model.type)} /> */}
              <IntegerField label={'Total Rooms'}  {...{ colspan: 2 }} {...field(model.totalRooms)} />
              <IntegerField label={'Total Beds'}  {...{ colspan: 2 }} {...field(model.totalBeds)} />
              <TextField label={'Alternate Name'}  {...{ colspan: 2 }} {...field(model.alternateName)} />

              {/* <DateTimePicker label={'Opening Date'}  {...{ colspan: 2 }} {...field(model.openingDate)} />
              <DateTimePicker label={'Closing Date'}  {...{ colspan: 2 }} {...field(model.closingDate)} /> */}

              <TextField label={'Contact'}  {...{ colspan: 2 }} {...field(model.contact)} />
            </FormLayout>
          </main>
          <footer className="flex flex-row bg-gray-100 w-full">
            <div className="w-full">
              {
                selectedInstructorItems[0]?.id === undefined ? null :
                  <Button
                    className="text-white bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setDialogOpened(true);
                      console.log('delete', selectedInstructorItems[0]?.id);
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
                    {selectedInstructorItems[0]?.id !== undefined ? 'Update' : 'Save'}
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
          RoomDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
            refreshGrid();
            setSelectedInstructorItems([]);
            reset();
          });
        }}>
        {`Do you want to delete?${value.name}`}
      </ConfirmDialog >
    </>
  );
};

export default RoomView;
