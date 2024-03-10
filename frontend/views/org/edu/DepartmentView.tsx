import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { useForm } from '@hilla/react-form';
import BranchRC, { BranchCombobox } from 'Frontend/components/branch/BranchRC';
import { AutoGrid, AutoGridRef } from 'Frontend/components/grid/autogrid';
import SideCrudRC from 'Frontend/components/layout/splitlayout/SideCrudRC';
import SpeedDialRC from 'Frontend/components/speeddial/SpeedDialRC';
import OrganizationDtoModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDtoModel';
import DepartmentDto from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDto';
import DepartmentDtoModel from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDtoModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { DepartmentDtoCrudService, OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import React, { useMemo, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '600px', columns: 2 },
];

const DepartmentView = () => {
  const [branchFilter, setBranchFilter] = useState<BranchCombobox>({
    organizationFilter: undefined,
  });
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedDepartmentItems, setSelectedDepartmentItems] = useState<DepartmentDto[]>([]);

  const form = useForm(DepartmentDtoModel, {
    onSubmit: async (department) => {
      await DepartmentDtoCrudService.save(department).then((result) => {
        refreshGrid();
        setSelectedDepartmentItems(result ? [result] : []);
        clear();
      }).catch((error) => {
        console.log('error', error);
      });
    }
  });

  const { model, field, value, read, clear, reset } = form;

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const organizationDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<OrganizationDtoModel>
      ) => {
        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'name',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'or', child);
        OrganizationDtoCrudService.list(pagination, filters).then((result: any) => {
          console.log('result', result);
          console.log('filters', filters);
          callback(result);
        });
      },
    [branchFilter.organizationFilter]
  );

  const primary = () => {
    return (
      <>
        <BranchRC
          visibleFields={
            { organization: true }
          }
          branchProps={{ branch: branchFilter, setBranch: setBranchFilter }}
        />
        <AutoGrid service={DepartmentDtoCrudService} model={DepartmentDtoModel} ref={autoGridRef}
          visibleColumns={['name', 'code', 'status', 'organization.name',]}
          selectedItems={selectedDepartmentItems}
          theme="row-stripes"
          columnOptions={{
            'organization.name': {
              header: 'Organization',
              externalValue: branchFilter.organizationFilter != null ? branchFilter.organizationFilter?.name : '',
              // setExternalValue: setOrgFilter,
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedDepartmentItems(item ? [item] : []);
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
              setSelectedDepartmentItems([]);
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
        <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
          <label slot="label">Profile</label>
          <ComboBox label={'Organization'}  {...field(model.organization)} dataProvider={organizationDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
          <TextField label={'Name'}  {...field(model.name)} />
          <TextField label={'Code'}  {...field(model.code)} />
          <TextField label={'Description'}  {...field(model.description)} />
          <TextField label={'Status'}  {...field(model.status)} />
        </FormLayout>
      </>
    );
  }
  async function onConfirm() {
    return await DepartmentDtoCrudService.delete(selectedDepartmentItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedDepartmentItems([]);
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

export default DepartmentView;
