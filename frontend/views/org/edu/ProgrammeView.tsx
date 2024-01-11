import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { FormItem } from "@hilla/react-components/FormItem.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Grid, GridDataProviderCallback, GridDataProviderParams } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { GridFilterColumn } from '@hilla/react-components/GridFilterColumn.js';
import { GridSortColumn } from '@hilla/react-components/GridSortColumn.js';
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { Icon } from '@hilla/react-components/Icon.js';
import { Scroller } from "@hilla/react-components/Scroller.js";
import { Select } from '@hilla/react-components/Select.js';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoGridRef } from "@hilla/react-crud";
import { useForm } from "@hilla/react-form";
import ProgrammeTypeEnum from "Frontend/generated/com/itbd/application/constants/ProgrammeTypeEnum";
import OrganizationDTOModel from "Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel";
import DepartmentDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel";
import ProgrammeDTO from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTO";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { DepartmentDtoCrudService, OrganizationDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import { gridLazyFilter } from "Frontend/util/gridLazyFilterUtil";
import React from "react";
import { useMemo, useState } from "react";

const ProgrammeView = () => {
  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [departmentReset, setDepartmentReset] = useState('' || undefined);
  const [selectedProgrameeItems, setSelectedProgrameeItems] = useState<ProgrammeDTO[]>([]);
  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(ProgrammeDTOModel, {
    onSubmit: async (programme) => {
      await ProgrammeDtoCrudService.save(programme).then((result) => {
        // setSelectedProgrameeItems(value ? [value] : []);     
        // setSelectedProgrameeItems(result ? [result] : []);
        // setRefreshGrid(true);
        // setDepartmentNameFilter((d) => '');
        console.log('result', result);
      });
    }
  });

  const studyLevels = Object.values(ProgrammeTypeEnum).map(level => ({ label: level, value: level }));

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
        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'name',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        }, {
          '@type': 'propertyString',
          propertyId: 'organization.name',
          filterValue: orgNameFilter,
          matcher: Matcher.EQUALS
        },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        DepartmentDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    [orgNameFilter]
  );
  const programmeDataProvider = useMemo(
    () =>
      async (
        params: GridDataProviderParams<ProgrammeDTO>,
        callback: GridDataProviderCallback<ProgrammeDTO>
      ) => {
        console.log('params programme', params);

        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'department.name',
          filterValue: departmentNameFilter,
          matcher: Matcher.CONTAINS
        },];

        params.filters?.forEach((filter) => {
          if (filter.path !== 'department.name') {
            child.push({
              '@type': 'propertyString',
              propertyId: filter.path,
              filterValue: filter.value,
              matcher: Matcher.CONTAINS
            });
          }
        });
        console.log('child programme', child);

        const { pagination, filter } = gridLazyFilter(params, 'and', child);
        ProgrammeDtoCrudService.list(pagination, filter).then((result: any) => {
          callback(result, result.length);
        });
      },
    [departmentNameFilter]
  );

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '600px', columns: 2 },
  ];

  const handleProfileComboBoxChange = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    setDepartmentReset((dr) => undefined); // Reset department combobox
    setOrgNameFilter((o) => searchTerm);
  };

  const handleDepartmentComboBoxChange = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    setDepartmentReset((dr) => searchTerm);
    setDepartmentNameFilter((d) => searchTerm);
  };

  return (
    <SplitLayout className="h-full w-full">
      <VerticalLayout className="h-full w-full items-stretch">
        <HorizontalLayout className="w-full items-stretch">
          <FormLayout responsiveSteps={responsiveSteps}>
            <FormItem>
              <label slot="label">Profile</label>
              <ComboBox dataProvider={organizationDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible onValueChanged={handleProfileComboBoxChange} />
            </FormItem>
            <FormItem>
              <label slot="label">Department</label>
              <ComboBox dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible selectedItem={departmentReset} onValueChanged={handleDepartmentComboBoxChange} />
            </FormItem>
          </FormLayout>
        </HorizontalLayout>
        <Grid dataProvider={programmeDataProvider} selectedItems={selectedProgrameeItems}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedProgrameeItems(item ? [item] : []);
            read(item);
            console.log('item', item);
          }}>
          <GridSortColumn path="name" header="Name" />
          <GridFilterColumn path="studyLevel" />
          <GridColumn path="department.name" header="Department" />
        </Grid>
      </VerticalLayout>
      <VerticalLayout className="w-1/4 min-w-96">
        <header className="bg-gray-100 w-full">
          <div className="flex flex-row space-x-4">
            <p className="text-blue-600 text-xl font-bold p-1 m-1 w-full"># Title</p>
            <Button className="text-white content-end bg-blue-600" onClick={clear}>
              <Icon icon="vaadin:plus" />New
            </Button>
          </div>
        </header>
        <Scroller scrollDirection="vertical" className="w-full h-full">
          <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
            <label slot="label">Profile</label>
            <ComboBox label={'Department'}  {...field(model.department)} dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
            <TextField label={'Name'}  {...field(model.name)} />
            <Select label={'Study Level'}  {...field(model.studyLevel)} items={studyLevels} />
            <TextField label={'Description'}  {...field(model.description)} />
            <TextField label={'Status'}  {...field(model.status)} />
          </FormLayout>
        </Scroller>
        <footer className="flex flex-row bg-gray-100 w-full">
          <div className="w-full">
            {
              selectedProgrameeItems[0]?.id === undefined ? null : <Button className="text-white bg-orange-500">Delete</Button>
            }
          </div>
          {
            value.name === undefined ? null :
              <div className="flex flex-row content-end space-x-4">
                <Button className={`text-white bg-${!dirty ? 'gray-900' : 'indigo-500'}`} disabled={!dirty} onClick={reset}>Discard</Button>
                <Button
                  className={`text-white bg-${invalid || submitting || !dirty ? 'gray-900' : 'emerald-500'}`}
                  disabled={invalid || submitting || !dirty}
                  onClick={() => {
                    submit();
                    console.log('submit', departmentNameFilter);

                  }}
                >
                  {selectedProgrameeItems[0]?.id !== undefined ? 'Update' : 'Save'}
                </Button>
              </div>
          }
        </footer>
      </VerticalLayout>
    </SplitLayout>
  );
};

export default ProgrammeView;
function useEffect(arg0: () => void, arg1: boolean[]) {
  throw new Error("Function not implemented.");
}

