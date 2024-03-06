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
import FloorDTO from "Frontend/generated/com/itbd/application/dto/org/place/FloorDTO";
import FloorDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/FloorDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BuildingDtoCrudService, FloorDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '500px', columns: 4 },
];

const FloorView = () => {
  const [placeFilter, setPlaceFilter] = useState<PlaceCombobox>({
    sectorFilter: undefined,
    buildingFilter: undefined,
  });

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedInstructorItems, setSelectedInstructorItems] = useState<FloorDTO[]>([]);

  const form = useForm(FloorDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await FloorDtoCrudService.save(instructor).then((result) => {
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

  const buildingDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<FloorDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'sector.id',
            filterValue: placeFilter?.sectorFilter?.id?.toString() || '0',
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
    [placeFilter.sectorFilter]
  );

  const primary = () => {
    return (
      <>
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
          placeProps={{ place: placeFilter, setPlace: setPlaceFilter }}
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
              externalValue: placeFilter.buildingFilter != null ? placeFilter.buildingFilter.name : '',
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
          <ComboBox label={'Building'}  {...field(model.building)} dataProvider={buildingDataProvider} itemLabelPath='name' itemValuePath='id' clearButtonVisible />
          <TextField label={'Name'}  {...{ colspan: 2 }} {...field(model.name)} />
          <IntegerField label={'Floor Level'}  {...{ colspan: 2 }} {...field(model.floorLevel)} helperText={'For Basement floor (-) ex: -2,-1'} />
          <TextField label={'Floor Color Code'}  {...{ colspan: 2 }} {...field(model.floorColorCode)} />
          <TextField label={'Floor Color'}  {...{ colspan: 2 }} {...field(model.floorColor)} />
          <IntegerField label={'totalBlocks'}  {...{ colspan: 2 }} {...field(model.totalBlocks)} />
          <TextField label={'Alternate Name'}  {...{ colspan: 2 }} {...field(model.alternateName)} />

          {/* <DateTimePicker label={'Opening Date'}  {...{ colspan: 2 }} {...field(model.openingDate)} />
              <DateTimePicker label={'Closing Date'}  {...{ colspan: 2 }} {...field(model.closingDate)} /> */}

          <TextField label={'Contact'}  {...{ colspan: 2 }} {...field(model.contact)} />
        </FormLayout>
      </>
    );
  }
  async function onConfirm() {
    return await FloorDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
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
export default FloorView;
