
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import '@vaadin/icons';
import OrganizationDTOModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel';
import DepartmentDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { DepartmentDtoCrudService, OrganizationDtoCrudService } from 'Frontend/generated/endpoints';
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { Dispatch, SetStateAction, useMemo } from 'react';

type OrganizationProps = {
  organizationName: string,
  setOrganizationName: Dispatch<SetStateAction<string>>
}

type DepartmentProps = {
  departmentName: string,
  setDepartmentName: Dispatch<SetStateAction<string>>
}

export default function BranchRC({ organization, department }: {
  organization?: OrganizationProps
  department?: DepartmentProps
}) {
  const organizationDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<OrganizationDTOModel>
      ) => {
        console.log('params organization', params);
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', [{
          '@type': 'propertyString',
          propertyId: 'name',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        },]);

        OrganizationDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    []
  );

  const departmentDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<DepartmentDTOModel>
      ) => {
        console.log('params department', params);
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'organization.name',
            filterValue: organization?.organizationName || '',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        DepartmentDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    [organization?.organizationName]
  );

  const handleOrganization = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    department?.setDepartmentName((dr) => ''); // Reset department combobox
    organization?.setOrganizationName((o) => searchTerm);
  };

  const handleDepartment = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    department?.setDepartmentName((d) => searchTerm);
  };
  return (
    <>
      <HorizontalLayout className="flex flex-row w-full items-center">
        <div className='text-sm font-medium ml-5 mr-2'>Profile</div>
        <ComboBox dataProvider={organizationDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible onValueChanged={handleOrganization} />
        <div className='text-sm font-medium ml-5 mr-2'>Department</div>
        <ComboBox dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible value={department?.departmentName} onValueChanged={handleDepartment} />
      </HorizontalLayout>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
    </>
  );
}