import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { Select } from "@hilla/react-components/Select.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { TimePicker } from "@hilla/react-components/TimePicker.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import PlaceRC from "Frontend/components/branch/PlaceRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import BuildingTypeEnum from "Frontend/generated/com/itbd/application/constants/BuildingTypeEnum";
import SectorDAOModel from "Frontend/generated/com/itbd/application/dao/org/place/SectorDAOModel";
import BuildingDTO from "Frontend/generated/com/itbd/application/dto/org/place/BuildingDTO";
import BuildingDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/BuildingDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BuildingDtoCrudService, SectorDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";

const BuildingView = () => {
  const [sectorNameFilter, setSectorNameFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedInstructorItems, setSelectedInstructorItems] = useState<BuildingDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(BuildingDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await BuildingDtoCrudService.save(instructor).then((result) => {
        refreshGrid();
        setSelectedInstructorItems(result ? [result] : []);
        setSuccessNotification(true);
      });
    }
  });

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const sectorDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<SectorDAOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        console.log('params', params);
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        SectorDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });

      },
    [sectorNameFilter]
  );

  const buildingType = Object.values(BuildingTypeEnum).map(level => ({ label: level, value: level }));
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
              { sector: true }
            }
            sector={{
              sectorName: sectorNameFilter,
              setSectorName: setSectorNameFilter
            }}
          />
          <AutoGrid service={BuildingDtoCrudService} model={BuildingDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'alternateName', 'type', 'block', 'openingTime', 'closingTime', 'sector.name',]}
            selectedItems={selectedInstructorItems}
            theme="row-stripes"
            columnOptions={{
              'name': {
                header: 'Name',
                resizable: true,
              },
              'additionalName': {
                header: 'Additional Name',
                resizable: true,
              },
              'type': {
                header: 'Building Type',
                resizable: true,
              },
              'block': {
                header: 'Block',
                resizable: true,
              },
              'openingTime': {
                header: 'Opening Time',
                resizable: true,
              },
              'closingTime': {
                header: 'Closing Time',
                resizable: true,
              },
              'sector.name': {
                header: 'Sector',
                resizable: true,
                externalValue: sectorNameFilter,
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
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full">#{selectedInstructorItems[0]?.id ?? ''} - Building</p>
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
              <ComboBox label={'Sector'}  {...field(model.sector)} dataProvider={sectorDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              <TextField label={'Name'}  {...{ colspan: 2 }} {...field(model.name)} />
              <Select label={'Building Type'}  {...{ colspan: 1 }} {...field(model.type)} items={buildingType} />
              <TextField label={'Block'}  {...{ colspan: 2 }} {...field(model.block)} />
              <TextField label={'Alternate Name'}  {...{ colspan: 2 }} {...field(model.alternateName)} />

              {/* <DateTimePicker label={'Opening Date'}  {...{ colspan: 2 }} {...field(model.openingDate)} />
              <DateTimePicker label={'Closing Date'}  {...{ colspan: 2 }} {...field(model.closingDate)} /> */}

              <TimePicker label={'Opening Time'}  {...{ colspan: 2 }} {...field(model.openingTime)} />
              <TimePicker label={'Closing Time'}  {...{ colspan: 2 }} {...field(model.closingTime)} />

              <TextField label={'Contact'}  {...{ colspan: 2 }} {...field(model.contact)} />
              <TextField label={'Building Color'}  {...{ colspan: 2 }} {...field(model.buildingColor)} />
              <TextField label={'Building Color Code'}  {...{ colspan: 2 }} {...field(model.buildingColorCode)} />
              <TextField label={'Pin Code'}  {...{ colspan: 2 }} {...field(model.pincode)} />
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
              value.name === undefined ? null :
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
          BuildingDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
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

export default BuildingView;
