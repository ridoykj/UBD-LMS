import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { FormItem } from "@hilla/react-components/FormItem.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Grid, GridDataProviderCallback, GridDataProviderParams } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { GridFilterColumn } from '@hilla/react-components/GridFilterColumn.js';
import { GridSortColumn } from '@hilla/react-components/GridSortColumn.js';
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoGridRef } from "@hilla/react-crud";
import OrganizationDTOModel from "Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel";
import DepartmentDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel";
import ProgrammeDTO from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTO";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import AndFilter from "Frontend/generated/dev/hilla/crud/filter/AndFilter";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { DepartmentDtoCrudService, OrganizationDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import { gridLazyFilter } from "Frontend/util/gridLazyFilterUtil";
import React, { useMemo, useState } from "react";

const ProgrammeView = () => {
  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [clear, setClear] = useState('');

  function PriceRenderer({ item }: { item: ProgrammeDTO }) {
    const { department } = item;
    return <span style={{ fontWeight: 'bold' }}>{department?.name}</span>;
  }


  const filter = useMemo(() => {
    const orgFilter: PropertyStringFilter = {
      propertyId: 'department.organization.name',
      filterValue: orgNameFilter,
      matcher: Matcher.CONTAINS,
      '@type': 'propertyString',
    };

    const departmentFilter: PropertyStringFilter = {
      propertyId: 'department.name',
      filterValue: departmentNameFilter,
      matcher: Matcher.CONTAINS,
      '@type': 'propertyString',
    };

    const andFilter: AndFilter = {
      '@type': 'and',
      children: [orgFilter, departmentFilter],
    };
    console.log('orgNameFilter', orgNameFilter);
    return orgNameFilter == '' ? orgFilter : andFilter;
  }, [orgNameFilter, departmentNameFilter]);

  const organizationDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<OrganizationDTOModel>
      ) => {
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', [{
          '@type': 'propertyString',
          propertyId: 'name',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        },]);

        OrganizationDtoCrudService.list(pagination, filters).then((result: any) => {
          console.log('result', result);
          console.log('filters', filters);
          callback(result);
        });
      },
    [orgNameFilter]
  );

  const departmentDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<DepartmentDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'name',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        }, {
          '@type': 'propertyString',
          propertyId: 'organization.name',
          filterValue: orgNameFilter,
          matcher: Matcher.CONTAINS
        },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        DepartmentDtoCrudService.list(pagination, filters).then((result: any) => {
          console.log('result', result);
          console.log('filters', filters);
          callback(result);
        });
      },
    [departmentNameFilter]
  );
  const programmeDataProvider = useMemo(
    () =>
      async (
        params: GridDataProviderParams<ProgrammeDTOModel>,
        callback: GridDataProviderCallback<ProgrammeDTOModel>
      ) => {
        console.log('params', params);

        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'department.name',
          filterValue: departmentNameFilter,
          // filterValue: params.filters?.filter,
          matcher: Matcher.CONTAINS
        },];

        params.filters?.forEach((filter) => {
          child.push({
            '@type': 'propertyString',
            propertyId: filter.path,
            filterValue: filter.value,
            // filterValue: params.filters?.filter,
            matcher: Matcher.CONTAINS
          });
        });

        const { pagination, filter } = gridLazyFilter(params, 'and', child);
        ProgrammeDtoCrudService.list(pagination, filter).then((result: any) => {
          console.log('result', result);
          console.log('filters', filter);
          callback(result, result.length);
        });
      },
    [departmentNameFilter]
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
            <ComboBox dataProvider={organizationDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible onValueChanged={
              (e) => {
                console.log('value', e.detail.value);
                const searchTerm = (e.detail.value || '').trim().toLowerCase();
                console.log('searchTerm', searchTerm);
                setOrgNameFilter(searchTerm);
                // setClear('');
              }
            } />
          </FormItem>
          <FormItem>
            <label slot="label">Department</label>
            <ComboBox dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible onValueChanged={
              (e) => {
                console.log('value', e.detail.value);
                const searchTerm = (e.detail.value || '').trim().toLowerCase();
                console.log('searchTerm', searchTerm);
                setDepartmentNameFilter(searchTerm);
              }
            } />
          </FormItem>
        </FormLayout>
      </HorizontalLayout>

      <Grid dataProvider={programmeDataProvider}>
        <GridSortColumn path="name" header="Name" rowHeader={false} role="" onClick={() => console.log("done")} />
        <GridFilterColumn path="studyLevel" />
        <GridFilterColumn path="department.name" />
        <GridColumn path="department.name" header="Department" />
      </Grid>
    </VerticalLayout>
  );
};

export default ProgrammeView;
