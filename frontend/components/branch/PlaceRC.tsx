
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox.js';
import '@vaadin/icons';
import BuildingDao from 'Frontend/generated/com/itbd/application/dao/org/place/BuildingDao';
import FloorDao from 'Frontend/generated/com/itbd/application/dao/org/place/FloorDao';
import RoomDao from 'Frontend/generated/com/itbd/application/dao/org/place/RoomDao';
import BuildingDtoModel from 'Frontend/generated/com/itbd/application/dto/org/place/BuildingDtoModel';
import FloorDtoModel from 'Frontend/generated/com/itbd/application/dto/org/place/FloorDtoModel';
import RoomDtoModel from 'Frontend/generated/com/itbd/application/dto/org/place/RoomDtoModel';
import SectorDtoModel from 'Frontend/generated/com/itbd/application/dto/org/place/SectorDtoModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { BuildingDtoCrudService, FloorDtoCrudService, RoomDtoCrudService, SectorDtoCrudService } from 'Frontend/generated/endpoints';
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { Dispatch, SetStateAction, useMemo } from 'react';

const comboboxStyle = {
  '--vaadin-combo-box-overlay-width': '350px'
} as React.CSSProperties;

type VisibleFields = {
  sector?: boolean,
  building?: boolean,
  floor?: boolean,
  room?: boolean,
};

export type PlaceCombobox = {
  sectorFilter?: BuildingDao,
  buildingFilter?: BuildingDao,
  floorFilter?: FloorDao,
  roomFilter?: RoomDao,
}

type PlaceProps = {
  place: PlaceCombobox,
  setPlace: Dispatch<SetStateAction<PlaceCombobox>>
}

export default function PlaceRC({ visibleFields, placeProps, }: {
  visibleFields: VisibleFields, // ['sector', 'building', 'floor', 'room',];
  placeProps: PlaceProps,
}) {
  const { sectorFilter, buildingFilter, floorFilter, roomFilter } = placeProps.place;
  const sectorDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<SectorDtoModel>
      ) => {
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', [{
          '@type': 'propertyString',
          propertyId: 'name',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        },]);

        SectorDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    []
  );

  const buildingDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<BuildingDtoModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'sector.id',
            filterValue: sectorFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        // console.log('buildingDataProvider', sector?.sectorFilter);
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BuildingDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [sectorFilter]
  );

  const floorDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<FloorDtoModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'building.id',
            filterValue: buildingFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        FloorDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });

      },
    [buildingFilter]
  );

  const roomDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<RoomDtoModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'floor.id',
            filterValue: floorFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        RoomDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [floorFilter]
  );

  const handleSector = (e: any) => {
    const selectedItem = e.detail.value;
    placeProps.setPlace((d) => {
      return {
        ...d,
        buildingFilter: undefined,
        floorFilter: undefined,
        roomFilter: undefined,
        sectorFilter: selectedItem,
      }
    }); // Reset Building combobox
  };

  const handleBuilding = (e: any) => {
    const selectedItem = e.detail.value;
    placeProps.setPlace((d) => {
      return {
        ...d,
        floorFilter: undefined,
        roomFilter: undefined,
        buildingFilter: selectedItem,
      }
    }); // Reset Building combobox
  };

  const handleFloor = (e: any) => {
    const selectedItem = e.detail.value;
    placeProps.setPlace((d) => {
      return {
        ...d,
        roomFilter: undefined,
        floorFilter: selectedItem,
      };
    }); // Reset Building combobox
  };

  const handleRoom = (e: any) => {
    const selectedItem = e.detail.value;
    placeProps.setPlace((d) => {
      return {
        ...d,
        roomFilter: selectedItem,
      }
    }); // Reset Building combobox
  };

  return (
    <>
      <div className='p-2 pt-0 m-auto drop-shadow-[0_5px_5px_#dfe7ff] w-full'>
        <div className="flex flex-row overflow-x-auto w-full items-center rounded-xl border-2 border-[#dfe7ff]">
          {
            visibleFields['sector'] &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Sector</div>
              <ComboBox dataProvider={sectorDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleSector} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['building'] && sectorFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Building</div>
              <ComboBox dataProvider={buildingDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleBuilding} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['floor'] && buildingFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Floor</div>
              <ComboBox dataProvider={floorDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleFloor} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['room'] && floorFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Room</div>
              <ComboBox dataProvider={roomDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleRoom} style={comboboxStyle} clearButtonVisible />
            </>
          }
        </div>
      </div>
    </>
  );
}