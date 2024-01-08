import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox';
import { TextArea } from "@hilla/react-components/TextArea";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoCrud } from "@hilla/react-crud";
import OrganizationDTOModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel';
import DepartmentDTO from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTO';
import DepartmentDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel';
import { DepartmentDtoCrudService, OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { useMemo, useState } from 'react';
import { Select, SelectItem } from '@hilla/react-components/Select.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import AndFilter from 'Frontend/generated/dev/hilla/crud/filter/AndFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';

const DepartmentView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [searchTerm, setSearchTerm] = useState<OrganizationDTOModel[]>([]);

  function PriceRenderer({ item }: { item: DepartmentDTO }) {
    const { organization } = item;
    // const color = name. === 'D' ? 'red' : 'green';
    // console.log('item', item);
    return <span style={{ fontWeight: 'bold' }}>{organization?.name}</span>;
  }
  const [nameFilterValue, setNameFilterValue] = useState('');

  const filter = useMemo(() => {
    // const categoryFilter: PropertyStringFilter = {
    //   propertyId: 'name',
    //   filterValue: searchTerm,
    //   matcher: Matcher.EQUALS,
    //   '@type': 'propertyString',
    // };

    const nameFilter: PropertyStringFilter = {
      propertyId: 'name',
      filterValue: nameFilterValue,
      matcher: Matcher.CONTAINS,
      '@type': 'propertyString',
    };

    // const andFilter: AndFilter = {
    //   '@type': 'and',
    //   children: [nameFilter, categoryFilter],
    // };

    // return searchTerm == 'All' ? nameFilter : andFilter;
    return nameFilter;
  }, [searchTerm, nameFilterValue]);

  const dataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<OrganizationDTOModel>
      ) => {
        const { pagination, filters } = comboBoxLazyFilter(params, 'name');
        OrganizationDtoCrudService.list(pagination, filters).then((result: any) => {
          console.log('result', result);
          console.log('filters', filters);
          callback(result, 2);
        });
      },
    [searchTerm]
  );


  return (
    <VerticalLayout style={{ alignItems: 'stretch', height: '100%', width: '100%' }}>
      <HorizontalLayout style={{ alignItems: 'stretch', width: '100%' }}>
        <ComboBox label="Profile" dataProvider={dataProvider} itemLabelPath='name' itemValuePath='name' onValueChanged={
          (e) => {
            console.log('value', e.detail.value);
            const searchTerm = (e.detail.value || '').trim().toLowerCase();
            console.log('searchTerm', searchTerm);
            setSearchTerm(searchTerm);
          }
        } />
      </HorizontalLayout>
      <AutoCrud
        service={DepartmentDtoCrudService} model={DepartmentDTOModel}
        style={{ height: '100%', width: '100%' }}
        gridProps={{
          visibleColumns: ['name', 'code', 'status', 'organization.name', 'programmes'],
          rowNumbers: true,
          experimentalFilter: filter,
          columnOptions: {
            'organization.name': {
              header: 'Profile',
              renderer: PriceRenderer,
            },
          },
        }}
        formProps={{
          visibleFields: ['organization', 'name', 'code', 'status', 'description',],
          fieldOptions: {
            organization: {
              renderer: ({ field }) => <ComboBox {...field} label="Profile" dataProvider={dataProvider} itemLabelPath='name' itemValuePath='id' />,
            },
            description: {
              renderer: ({ field }) => <TextArea {...field} label="Full Description" />,
            },
          },
        }}
      />
    </VerticalLayout>
  );
};

export default DepartmentView;
