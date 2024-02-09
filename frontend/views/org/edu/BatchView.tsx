import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { DatePicker, DatePickerDate } from '@hilla/react-components/DatePicker.js';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { Upload, UploadSuccessEvent } from "@hilla/react-components/Upload.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { useForm } from "@hilla/react-form";
import { UploadBeforeEvent } from "@vaadin/upload";
import BranchRC, { BranchCombobox } from "Frontend/components/branch/BranchRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import BatchDTO from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDTO";
import BatchDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDTOModel";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BatchDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import { format, parse } from 'date-fns';
import React, { useMemo, useState } from "react";


function formatDateIso8601(dateParts: DatePickerDate) {
  const { year, month, day } = dateParts;
  const date = new Date(year, month, day);
  return format(date, 'yyyy-MM-dd');
}
function parseDateIso8601(inputValue: string) {
  const date = parse(inputValue.trim(), 'yyyy-MM-dd', new Date());
  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
}


const BatchView = () => {
  const [branchFilter, setBranchFilter] = useState<BranchCombobox>({
    organizationFilter: undefined,
    departmentFilter: undefined,
    programmeFilter: undefined,
  });

  // const [orgFilter, setOrgFilter] = useState<OrganizationDAO>({} as OrganizationDAO);
  // const [departmentFilter, setDepartmentFilter] = useState<DepartmentDAO>({} as DepartmentDAO);
  // const [programmeFilter, setProgrammeFilter] = useState<ProgrammeDAO>({} as ProgrammeDAO);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const [selectedBatchItems, setSelectedBatchItems] = useState<BatchDTO[]>([]);
  const form = useForm(BatchDTOModel, {
    onSubmit: async (batch) => {
      await BatchDtoCrudService.save(batch).then((result) => {
        console.log('result', result);
        refreshGrid();
        setSelectedBatchItems(result ? [result] : []);
        setSuccessNotification(true);
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
        callback: ComboBoxDataProviderCallback<ProgrammeDTOModel>
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

        console.log('params', params);
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        ProgrammeDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });

      },
    [branchFilter.departmentFilter]
  );

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '600px', columns: 2 },
  ];

  const discardButtonColors: { [key: string]: string } = {
    true: 'text-white bg-indigo-400 hover:bg-indigo-500',
    false: 'text-white bg-gray-300',
  };

  const saveButtonColors: { [key: string]: string } = {
    true: 'text-white bg-emerald-400 hover:bg-emerald-500',
    false: 'text-white bg-gray-300',
  };

  return (
    <>
      <SplitLayout className="h-full w-full">
        <VerticalLayout className="h-full w-full items-stretch">
          <BranchRC
            visibleFields={
              { organization: true, department: true, programme: true }
            }
            // organization={{
            //   organizationFilter: orgFilter,
            //   setOrganizationFilter: setOrgFilter
            // }}
            // department={{
            //   departmentFilter: departmentFilter,
            //   setDepartmentFilter: setDepartmentFilter
            // }}
            // programme={{
            //   programmeFilter: programmeFilter,
            //   setProgrammeFilter: setProgrammeFilter
            // }}
            branchProps={{ branch: branchFilter, setBranch: setBranchFilter }}
          />
          <AutoGrid service={BatchDtoCrudService} model={BatchDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'programme.name', 'graduationDate', 'admissionStartDate', 'admissionEndDate', 'status',]}
            selectedItems={selectedBatchItems}
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedBatchItems(item ? [item] : []);
              read(item);
              console.log('item', item);
            }}
            columnOptions={{
              'programme.name': {
                header: 'Programme',
                externalValue: branchFilter.programmeFilter != null ? branchFilter.programmeFilter?.name : '',
                // setExternalValue: setProgrammeFilter,
              },
            }}
          />

        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># {value.name ?? 'Unknown Title'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <main className="overflow-y-scroll  w-full h-full">
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
          </main>
          <footer className="w-full">
            <div className="flex flex-row bg-gray-100">
              <div className="w-full">
                {
                  selectedBatchItems[0]?.id === undefined ? null :
                    <Button
                      className="text-white bg-red-400 hover:bg-red-500"
                      onClick={() => {
                        setDialogOpened(true);
                        console.log('delete', selectedBatchItems[0]?.id);
                      }}
                    >Delete</Button>
                }
              </div>
              {
                value.name === undefined ? null :
                  <div className="flex flex-row content-end space-x-4">
                    <Button
                      className={discardButtonColors[dirty.toString()]}
                      disabled={!dirty}
                      onClick={reset}
                    >
                      Discard
                    </Button>
                    <Button
                      className={saveButtonColors[dirty.toString()]}
                      disabled={invalid || submitting || !dirty}
                      onClick={submit}
                    >
                      {selectedBatchItems[0]?.id !== undefined ? 'Update' : 'Save'}
                    </Button>
                  </div>
              }
            </div>
          </footer>
        </VerticalLayout>
      </SplitLayout>
      <NotificationUtil opened={successNotification} type="update"
        message={{
          title: 'Successfully Updated',
          description: value.name,
        }}
        onOpenedChanged={(event) => {
          if (!event.detail.value) {
            setSuccessNotification(event.detail.value);
          }
        }}
        onClick={() => { setSuccessNotification(false) }}
      />
      <ConfirmDialog
        header="Delete Item"
        cancelButtonVisible
        rejectButtonVisible
        rejectText="Discard"
        confirmText="Confirm"
        confirmTheme="error primary"
        opened={dialogOpened}
        onOpenedChanged={(event) => {
          setDialogOpened(event.detail.value);
          if (event.detail.value) {
            // setStatus('');
          }
        }}
        onConfirm={() => {
          BatchDtoCrudService.delete(selectedBatchItems[0]?.id).then((result) => {
            refreshGrid();
            setSelectedBatchItems([]);
            reset();
          });
        }}>
        Do you want to delete?
        {value.name}
      </ConfirmDialog >
    </>
  );
};

export default BatchView;
