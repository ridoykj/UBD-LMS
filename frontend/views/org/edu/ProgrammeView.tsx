import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Select } from '@hilla/react-components/Select.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { useForm } from "@hilla/react-form";
import BranchRC, { BranchCombobox } from "Frontend/components/branch/BranchRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import ProgrammeTypeEnum from "Frontend/generated/com/itbd/application/constants/enums/ProgrammeTypeEnum";
import DepartmentDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel";
import ProgrammeDTO from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTO";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { DepartmentDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '600px', columns: 2 },
];

const ProgrammeView = () => {
  const [branchFilter, setBranchFilter] = useState<BranchCombobox>({
    organizationFilter: undefined,
    departmentFilter: undefined,
  });

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedProgrammeItems, setSelectedProgrammeItems] = useState<ProgrammeDTO[]>([]);

  const form = useForm(ProgrammeDTOModel, {
    onSubmit: async (programme) => {
      await ProgrammeDtoCrudService.save(programme).then((result) => {
        refreshGrid();
        setSelectedProgrammeItems(result ? [result] : []);
        clear();
      });
    }
  });

  const { model, field, value, read, clear, reset } = form;

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const studyLevels = Object.values(ProgrammeTypeEnum).map(level => ({ label: level, value: level }));

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
          propertyId: 'organization.id',
          filterValue: branchFilter.organizationFilter?.id?.toString() ?? '0',
          matcher: Matcher.EQUALS
        },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        DepartmentDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [branchFilter.organizationFilter]
  );

  const primary = () => {
    return (
      <>
        <BranchRC
          visibleFields={
            { organization: true, department: true }
          }
          branchProps={{ branch: branchFilter, setBranch: setBranchFilter }}
        />
        <AutoGrid service={ProgrammeDtoCrudService} model={ProgrammeDTOModel} ref={autoGridRef}
          visibleColumns={['name', 'code', 'studyLevel', 'department.name', 'status',]}
          selectedItems={selectedProgrammeItems}
          theme="row-stripes"  
          columnOptions={{
            'department.name': {
              header: 'Department',
              externalValue: branchFilter.departmentFilter != null ? branchFilter.departmentFilter.name : '',
              // setExternalValue: setDepartmentFilter,
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedProgrammeItems(item ? [item] : []);
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
              setSelectedProgrammeItems([]);
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
          <ComboBox label={'Department'}  {...field(model.department)} dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
          <TextField label={'Name'}  {...field(model.name)} />
          <Select label={'Study Level'}  {...field(model.studyLevel)} items={studyLevels} />
          <TextField label={'Code'}  {...field(model.code)} />
          <TextField label={'Description'}  {...field(model.description)} />
          <TextField label={'Status'}  {...field(model.status)} />
        </FormLayout>
      </>
    );
  }

  async function onConfirm() {
    return await ProgrammeDtoCrudService.delete(selectedProgrammeItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedProgrammeItems([]);
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

export default ProgrammeView;