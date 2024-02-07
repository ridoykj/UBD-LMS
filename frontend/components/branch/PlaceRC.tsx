
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox.js';
import '@vaadin/icons';
import BuildingDAO from 'Frontend/generated/com/itbd/application/dao/org/place/BuildingDAO';
import FloorDAO from 'Frontend/generated/com/itbd/application/dao/org/place/FloorDAO';
import RoomDAO from 'Frontend/generated/com/itbd/application/dao/org/place/RoomDAO';
import SectorDAO from 'Frontend/generated/com/itbd/application/dao/org/place/SectorDAO';
import BuildingDTO from 'Frontend/generated/com/itbd/application/dto/org/place/BuildingDTO';
import BuildingDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/BuildingDTOModel';
import FloorDTO from 'Frontend/generated/com/itbd/application/dto/org/place/FloorDTO';
import FloorDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/FloorDTOModel';
import RoomDTO from 'Frontend/generated/com/itbd/application/dto/org/place/RoomDTO';
import RoomDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/RoomDTOModel';
import SectorDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/SectorDTOModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { BuildingDtoCrudService, FloorDtoCrudService, RoomDtoCrudService, SectorDtoCrudService } from 'Frontend/generated/endpoints';
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { Dispatch, SetStateAction, useMemo } from 'react';

const comboboxStyle = {
  '--vaadin-combo-box-overlay-width': '350px'
} as React.CSSProperties;


type SectorProps = {
  sectorFilter: SectorDAO,
  setSectorFilter: Dispatch<SetStateAction<SectorDAO>>
}

type BuildingProps = {
  buildingFilter: BuildingDAO,
  setBuildingFilter: Dispatch<SetStateAction<BuildingDAO>>
}

type FloorProps = {
  floorFilter: FloorDAO,
  setFloorFilter: Dispatch<SetStateAction<FloorDAO>>
}

type RoomProps = {
  roomFilter: RoomDAO,
  setRoomFilter: Dispatch<SetStateAction<RoomDAO>>
}

type VisibleFields = {
  sector?: boolean,
  building?: boolean,
  floor?: boolean,
  room?: boolean,
};

export default function BranchRC({ visibleFields, sector, building, floor, room, }: {
  visibleFields: VisibleFields, // ['sector', 'building', 'floor', 'room',];
  sector?: SectorProps
  building?: BuildingProps
  floor?: FloorProps
  room?: RoomProps
}) {
  const sectorDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<SectorDTOModel>
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
        callback: ComboBoxDataProviderCallback<BuildingDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'sector.id',
            filterValue: sector?.sectorFilter.id?.toString() || '0',
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
    [sector?.sectorFilter]
  );

  const floorDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<FloorDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'building.id',
            filterValue: building?.buildingFilter.id?.toString() || '0',
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
    [building?.buildingFilter]
  );

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
            filterValue: floor?.floorFilter.id?.toString() || '0',
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
    [floor?.floorFilter]
  );

  const handleSector = (e: any) => {
    const selectedItem = e.detail.value;
    building?.setBuildingFilter((dr) => ({} as BuildingDTO)); // Reset Building combobox
    floor?.setFloorFilter((d) => ({} as FloorDTO));  // Reset Floor combobox
    room?.setRoomFilter((d) => ({} as RoomDTO)); // Reset Room combobox
    sector?.setSectorFilter((o) => selectedItem);
  };

  const handleBuilding = (e: any) => {
    const selectedItem = e.detail.value;
    floor?.setFloorFilter((d) => ({} as FloorDTO));  // Reset Floor combobox
    room?.setRoomFilter((d) => ({} as RoomDTO)); // Reset Room combobox
    building?.setBuildingFilter((d) => selectedItem);
  };

  const handleFloor = (e: any) => {
    const selectedItem = e.detail.value;
    room?.setRoomFilter((d) => ({} as RoomDTO)); // Reset Room combobox
    floor?.setFloorFilter((d) => selectedItem);
  };

  const handleRoom = (e: any) => {
    const selectedItem = e.detail.value;
    room?.setRoomFilter((d) => selectedItem);
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
            visibleFields['building'] && sector?.sectorFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Building</div>
              <ComboBox dataProvider={buildingDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleBuilding} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['floor'] && building?.buildingFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Floor</div>
              <ComboBox dataProvider={floorDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleFloor} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['room'] && floor?.floorFilter?.id &&
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