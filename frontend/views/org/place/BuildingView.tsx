import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Select } from "@hilla/react-components/Select.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { TimePicker } from "@hilla/react-components/TimePicker.js";
import { useForm } from "@hilla/react-form";
import PlaceRC, { PlaceCombobox } from "Frontend/components/branch/PlaceRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import BuildingTypeEnum from "Frontend/generated/com/itbd/application/constants/enums/BuildingTypeEnum";
import SectorDAOModel from "Frontend/generated/com/itbd/application/dao/org/place/SectorDAOModel";
import BuildingDTO from "Frontend/generated/com/itbd/application/dto/org/place/BuildingDTO";
import BuildingDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/BuildingDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BuildingDtoCrudService, SectorDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '500px', columns: 4 },
];

const BuildingView = () => {
  const [placeFilter, setPlaceFilter] = useState<PlaceCombobox>({
    sectorFilter: undefined,
  });

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedInstructorItems, setSelectedInstructorItems] = useState<BuildingDTO[]>([]);

  const form = useForm(BuildingDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await BuildingDtoCrudService.save(instructor).then((result) => {
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
    [placeFilter.sectorFilter]
  );

  const buildingType = Object.values(BuildingTypeEnum).map(level => ({ label: level, value: level }));

  const primary = () => {
    return (
      <>
        <PlaceRC
          visibleFields={
            { sector: true }
          }
          placeProps={{ place: placeFilter, setPlace: setPlaceFilter }}
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
              externalValue: placeFilter?.sectorFilter?.name?.toString() || '', // This is for filtering
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
          <ComboBox label={'Sector'}  {...field(model.sector)} dataProvider={sectorDataProvider} itemLabelPath='name' itemValuePath='id' clearButtonVisible />
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
      </>
    );
  }

  async function onConfirm() {
    return await BuildingDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
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

export default BuildingView;
