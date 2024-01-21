import { Button } from "@hilla/react-components/Button.js";
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
import FloorDTO from "Frontend/generated/com/itbd/application/dto/org/place/FloorDTO";
import FloorDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/FloorDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BuildingDtoCrudService, FloorDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";

const FloorView = () => {
  const [sectorNameFilter, setSectorNameFilter] = useState('');
  const [buildingNameFilter, setBuildingNameFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedInstructorItems, setSelectedInstructorItems] = useState<FloorDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(FloorDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await FloorDtoCrudService.save(instructor).then((result) => {
        refreshGrid();
        setSelectedInstructorItems(result ? [result] : []);
        setSuccessNotification(true);
      });
    }
  });

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const buildingDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<FloorDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'sector.name',
            filterValue: sectorNameFilter,
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        console.log('params', params);
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BuildingDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });

      },
    [sectorNameFilter]
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
              { sector: true, building: true, }
            }
            sector={{
              sectorName: sectorNameFilter,
              setSectorName: setSectorNameFilter
            }}
            building={{
              buildingName: buildingNameFilter,
              setBuildingName: setBuildingNameFilter
            }}
          />
          <AutoGrid service={FloorDtoCrudService} model={FloorDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'floorLevel', 'totalBlocks', 'floorColor', 'alternateName', 'building.name',]}
            selectedItems={selectedInstructorItems}
            theme="row-stripes"
            columnOptions={{
              'name': {
                header: 'Name',
                resizable: true,
              },
              'alternateName': {
                header: 'Alternate Name',
                resizable: true,
              },
              'floorLevel': {
                header: 'Floor Level',
                resizable: true,
              },
              'totalBlocks': {
                header: 'Total Blocks',
                resizable: true,
              },
              'floorColor': {
                header: 'Floor Color',
                resizable: true,
              },
              'building.name': {
                header: 'Building',
                resizable: true,
                externalValue: buildingNameFilter
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
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full">#{selectedInstructorItems[0]?.id ?? ''} - Floor</p>
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
              <ComboBox label={'Building'}  {...field(model.building)} dataProvider={buildingDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              <TextField label={'Name'}  {...{ colspan: 2 }} {...field(model.name)} />
              <IntegerField label={'Floor Level'}  {...{ colspan: 2 }} {...field(model.floorLevel)} />
              <TextField label={'Floor Color Code'}  {...{ colspan: 2 }} {...field(model.floorColorCode)} />
              <TextField label={'Floor Color'}  {...{ colspan: 2 }} {...field(model.floorColor)} />
              <IntegerField label={'totalBlocks'}  {...{ colspan: 2 }} {...field(model.totalBlocks)} />
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
          FloorDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
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
export default FloorView;
