import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from '@hilla/react-components/ConfirmDialog.js';
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from '@hilla/react-components/Icon.js';
import { Scroller } from "@hilla/react-components/Scroller.js";
import { Select } from '@hilla/react-components/Select.js';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import BranchRC from "Frontend/components/branch/BranchRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import ProgrammeTypeEnum from "Frontend/generated/com/itbd/application/constants/ProgrammeTypeEnum";
import DepartmentDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel";
import ProgrammeDTO from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTO";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { DepartmentDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";

const ProgrammeView = () => {
  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedProgrameeItems, setSelectedProgrameeItems] = useState<ProgrammeDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(ProgrammeDTOModel, {
    onSubmit: async (programme) => {
      await ProgrammeDtoCrudService.save(programme).then((result) => {
        refreshGrid();
        setSelectedProgrameeItems(result ? [result] : []);
        setSuccessNotification(true);
      });
    }
  });

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
          propertyId: 'organization.name',
          filterValue: orgNameFilter,
          matcher: Matcher.EQUALS
        },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        DepartmentDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [orgNameFilter]
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
              { organization: true, department: true }
            }
            organization={{
              organizationName: orgNameFilter,
              setOrganizationName: setOrgNameFilter
            }}
            department={{
              departmentName: departmentNameFilter,
              setDepartmentName: setDepartmentNameFilter
            }}
          />
          <AutoGrid service={ProgrammeDtoCrudService} model={ProgrammeDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'studyLevel', 'department.name', 'status',]}
            selectedItems={selectedProgrameeItems}
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedProgrameeItems(item ? [item] : []);
              read(item);
            }}
            columnOptions={{
              'department.name': {
                header: 'Department',
                externalValue: departmentNameFilter,
                setExternalValue: setDepartmentNameFilter,
              },
            }}
          />
        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold p-1 m-1 w-full"># {value.name?.substring(0, 15) || 'Unkown Title'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
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
                selectedProgrameeItems[0]?.id === undefined ? null :
                  <Button
                    className="text-white bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setDialogOpened(true);
                      console.log('delete', selectedProgrameeItems[0]?.id);
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
                    {selectedProgrameeItems[0]?.id !== undefined ? 'Update' : 'Save'}
                  </Button>
                </div>
            }
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
          ProgrammeDtoCrudService.delete(selectedProgrameeItems[0]?.id).then((result) => {
            refreshGrid();
            setSelectedProgrameeItems([]);
            reset();
          });
        }}>
        {`Do you want to delete?${value.name}`}
      </ConfirmDialog >
    </>
  );
};

export default ProgrammeView;