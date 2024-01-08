import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { TextArea } from "@hilla/react-components/TextArea";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoCrud } from "@hilla/react-crud";
import { FormItem } from '@hilla/react-components/FormItem.js';
import OrganizationDTOModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel';
import DepartmentDTO from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTO';
import DepartmentDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { DepartmentDtoCrudService, OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { useMemo, useState } from 'react';

const DepartmentView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [searchTerm, setSearchTerm] = useState<OrganizationDTOModel[]>([]);

  function PriceRenderer({ item }: { item: DepartmentDTO }) {
    const { organization } = item;
    return <span style={{ fontWeight: 'bold' }}>{organization?.name}</span>;
  }
  const [orgNameFilter, setOrgNameFilter] = useState('');

  const filter = useMemo(() => {
    // const categoryFilter: PropertyStringFilter = {
    //   propertyId: 'name',
    //   filterValue: searchTerm,
    //   matcher: Matcher.EQUALS,
    //   '@type': 'propertyString',
    // };

    const nameFilter: PropertyStringFilter = {
      propertyId: 'organization.name',
      filterValue: orgNameFilter,
      matcher: Matcher.CONTAINS,
      '@type': 'propertyString',
    };

    // const andFilter: AndFilter = {
    //   '@type': 'and',
    //   children: [nameFilter, categoryFilter],
    // };

    // return searchTerm == 'All' ? nameFilter : andFilter;
    return nameFilter;
  }, [searchTerm, orgNameFilter]);

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
    [searchTerm, orgNameFilter]
  );

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
  ];

  return (
    <VerticalLayout style={{ alignItems: 'stretch', height: '100%', width: '100%' }}>
      <HorizontalLayout style={{ alignItems: 'stretch', width: '100%' }}>
        <FormLayout responsiveSteps={responsiveSteps}>
          <FormItem>
            <label slot="label">Profile</label>
            <ComboBox dataProvider={dataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible={true} onValueChanged={
              (e) => {
                console.log('value', e.detail.value);
                const searchTerm = (e.detail.value || '').trim().toLowerCase();
                console.log('searchTerm', searchTerm);
                setSearchTerm(searchTerm);
                setOrgNameFilter(searchTerm);
              }
            } />
          </FormItem>
        </FormLayout>
      </HorizontalLayout>
      <AutoCrud
        service={DepartmentDtoCrudService} model={DepartmentDTOModel}
        style={{ height: '100%', width: '100%' }}
        gridProps={{
          visibleColumns: ['name', 'code', 'status', 'organization.name',],
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
              renderer: ({ field }) => <ComboBox {...field} label="Profile" dataProvider={dataProvider} itemLabelPath='name' itemValuePath='id' required={true} />,
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
