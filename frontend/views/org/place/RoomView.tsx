import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { IntegerField } from "@hilla/react-components/IntegerField.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { AutoGridRef } from "@hilla/react-crud";
import { useForm } from "@hilla/react-form";
import PlaceRC, { PlaceCombobox } from "Frontend/components/branch/PlaceRC";
import { AutoGrid } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import RoomTypeEnum from "Frontend/generated/com/itbd/application/constants/enums/RoomTypeEnum";
import FloorDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/FloorDTOModel";
import RoomDTO from "Frontend/generated/com/itbd/application/dto/org/place/RoomDTO";
import RoomDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/RoomDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { FloorDtoCrudService, RoomDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '500px', columns: 4 },
];

const RoomView = () => {
  const [placeFilter, setPlaceFilter] = useState<PlaceCombobox>({
    sectorFilter: undefined,
    buildingFilter: undefined,
    floorFilter: undefined,
  });

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedInstructorItems, setSelectedInstructorItems] = useState<RoomDTO[]>([]);

  const form = useForm(RoomDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await RoomDtoCrudService.save(instructor).then((result) => {
        refreshGrid();
        setSelectedInstructorItems(result ? [result] : []);
        clear();
      });
    }
  });

  const { model, field, value, read, clear, reset } = form;

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

        console.log('floorDataProvider1', placeFilter.buildingFilter?.id?.toString());
        console.log('floorDataProvider2', params.filter);
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'building.id',
            filterValue: placeFilter.buildingFilter?.id?.toString() ?? '0',
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
    [placeFilter.buildingFilter]
  );

  // const buildingType = Object.values(BuildingTypeEnum).map(level => ({ label: level, value: level }));

  const primary = () => {
    return (
      <>
        <PlaceRC
          visibleFields={
            { sector: true, building: true, floor: true }
          }
          placeProps={{ place: placeFilter, setPlace: setPlaceFilter }}
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
              externalValue: placeFilter.floorFilter != null ? placeFilter.floorFilter.name : ''
            },
            'floor.building.name': {
              header: 'Building',
              resizable: true,
              externalValue: placeFilter.buildingFilter != null ? placeFilter.buildingFilter.name : ''
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            console.log('item', item);
            setSelectedInstructorItems(item ? [item] : []);
            read(item);
            setShowSidebar(item?.id !== undefined);
          }}
        />
        <SpeedDialRC children={[
          {
            name: 'Add',
            icon: <FaUserPlus />,
            onClick: () => {
              clear();
              setSelectedInstructorItems([]);
              setShowSidebar(true);
            }
          },
        ]} />
      </>
    );
  }

  const secondary = () => {
    return (
      <>
        <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
          <ComboBox label={'Floor'}  {...field(model.floor)} dataProvider={floorDataProvider} itemLabelPath='name' itemValuePath='id' clearButtonVisible />
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
      </>
    );
  }
  async function onConfirm() {
    return await RoomDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedInstructorItems([]);
      reset();
    });
  }

  return (
    <>
      <SideCrudRC
        primary={primary()}
        secondary={secondary()}
        form={form}
        onConfirm={onConfirm}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </>
  );
};

export default RoomView;
