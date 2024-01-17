
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Scroller } from '@hilla/react-components/Scroller.js';
import '@vaadin/icons';
import CourseDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/CourseDTOModel';
import BuildingDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/BuildingDTOModel';
import FloorDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/FloorDTOModel';
import RoomDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/RoomDTOModel';
import SectorDTOModel from 'Frontend/generated/com/itbd/application/dto/org/place/SectorDTOModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { BuildingDtoCrudService, CourseDtoCrudService, FloorDtoCrudService, RoomDtoCrudService, SectionDtoCrudService, SectorDtoCrudService } from 'Frontend/generated/endpoints';
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { Dispatch, SetStateAction, useMemo } from 'react';

type SectorProps = {
  sectorName: string,
  setSectorName: Dispatch<SetStateAction<string>>
}

type BuildingProps = {
  buildingName: string,
  setBuildingName: Dispatch<SetStateAction<string>>
}

type FloorProps = {
  floorName: string,
  setFloorName: Dispatch<SetStateAction<string>>
}

type RoomProps = {
  roomName: string,
  setRoomName: Dispatch<SetStateAction<string>>
}

type VisibleFields = {
  sector?: boolean,
  building?: boolean,
  floor?: boolean,
  room?: boolean,
};

export default function BranchRC({ visibleFields, sector,  building, floor, room, }: {
  visibleFields: VisibleFields, // ['organization', 'department', 'programme', 'batch', 'course'];
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
            propertyId: 'organization.name',
            filterValue: sector?.sectorName || '',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BuildingDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [sector?.sectorName]
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
            propertyId: 'department.name',
            filterValue: building?.buildingName || '',
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
    [building?.buildingName]
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
            propertyId: 'programme.name',
            filterValue: floor?.floorName || '',
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
    [floor?.floorName]
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
            propertyId: 'programme.name',
            filterValue: room?.roomName || '',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        CourseDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [room?.roomName]
  );

  const handleSector = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    building?.setBuildingName((dr) => ''); // Reset department combobox
    sector?.setSectorName((o) => searchTerm);
  };

  const handleBuilding = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    floor?.setFloorName((d) => ''); // Reset department combobox
    building?.setBuildingName((d) => searchTerm);
  };

  const handleFloor = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    room?.setRoomName((d) => ''); // Reset department combobox
    floor?.setFloorName((d) => searchTerm);
  };

  const handleRoom = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    room?.setRoomName((d) => searchTerm);
  };

  return (
    <>
      <Scroller scroll-direction="horizontal">
        <HorizontalLayout className="flex flex-row w-full items-center">
          {
            visibleFields['sector'] &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Sector</div>
              <ComboBox dataProvider={sectorDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible onValueChanged={handleSector} />
            </>
          }
          {
            visibleFields['building'] &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Building</div>
              <ComboBox dataProvider={buildingDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible value={building?.buildingName} onValueChanged={handleBuilding} />
            </>
          }
          {
            visibleFields['floor'] &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Floor</div>
              <ComboBox dataProvider={floorDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible value={floor?.floorName} onValueChanged={handleFloor} />
            </>
          }
          {
            visibleFields['room'] &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Room</div>
              <ComboBox dataProvider={roomDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible value={room?.roomName} onValueChanged={handleRoom} />
            </>
          }          
        </HorizontalLayout>
      </Scroller>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
    </>
  );
}