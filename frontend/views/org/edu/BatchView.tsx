import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { Upload, UploadSuccessEvent } from "@hilla/react-components/Upload.js";
import { useForm } from "@hilla/react-form";
import { UploadBeforeEvent } from "@vaadin/upload";
import BranchRC, { BranchCombobox } from "Frontend/components/branch/BranchRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import BatchDto from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDto";
import BatchDtoModel from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDtoModel";
import ProgrammeDtoModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDtoModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BatchDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '600px', columns: 2 },
];

const BatchView = () => {
  const [branchFilter, setBranchFilter] = useState<BranchCombobox>({
    organizationFilter: undefined,
    departmentFilter: undefined,
    programmeFilter: undefined,
  });
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const [selectedBatchItems, setSelectedBatchItems] = useState<BatchDto[]>([]);
  const form = useForm(BatchDtoModel, {
    onSubmit: async (batch) => {
      await BatchDtoCrudService.save(batch).then((result) => {
        console.log('result', result);
        refreshGrid();
        setSelectedBatchItems(result ? [result] : []);
        clear();
        // setProgrammeNameFilter(result?.programme?.name ?? '');
      });
    }
  });

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = form

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const programmeDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<ProgrammeDtoModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'department.id',
            filterValue: branchFilter.departmentFilter?.id?.toString() ?? '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        ProgrammeDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });

      },
    [branchFilter.departmentFilter]
  );

  const primary = () => {
    return (
      <>
        <BranchRC
          visibleFields={
            { organization: true, department: true, programme: true }
          }
          branchProps={{ branch: branchFilter, setBranch: setBranchFilter }}
        />
        <AutoGrid service={BatchDtoCrudService} model={BatchDtoModel} ref={autoGridRef}
          visibleColumns={['name', 'programme.name', 'graduationDate', 'admissionStartDate', 'admissionEndDate', 'status',]}
          selectedItems={selectedBatchItems}
          theme="row-stripes"
          columnOptions={{
            'programme.name': {
              header: 'Programme',
              externalValue: branchFilter.programmeFilter != null ? branchFilter.programmeFilter?.name : '',
              // setExternalValue: setProgrammeFilter,
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedBatchItems(item ? [item] : []);
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
              setSelectedBatchItems([]);
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
        <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
          <ComboBox label={'Programme'}  {...field(model.programme)} dataProvider={programmeDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
          <TextField label={'Name'}  {...field(model.name)} />
          <TextField label={'Description'}  {...field(model.description)} />
          <DatePicker label={'Graduation Date'}  {...field(model.graduationDate)} />
          <DateTimePicker label={'Admission Start'}  {...field(model.admissionStartDate)} />
          <DateTimePicker label={'Admission End'}  {...field(model.admissionEndDate)} />
          <TextField label={'Status'}  {...field(model.status)} />
          <Upload capture="camera"
            method="POST"
            target="/api/fileupload"
            headers='{"path": "batch" }'
            onUploadBefore={async (e: UploadBeforeEvent) => {
              const file = e.detail.file;
              // e.preventDefault();
              console.log('file', file);
              // if (form.value) {
              //   form.value.avatarBase64 = await readAsDataURL(file);
              // }
            }}
            onUploadSuccess={(e: UploadSuccessEvent) => {
              const file = e.detail.file;
              console.log('file s', file);
            }}
          ></Upload>
        </FormLayout>
      </>
    );
  }

  async function onConfirm() {
    return await BatchDtoCrudService.delete(selectedBatchItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedBatchItems([]);
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

export default BatchView;
