import { Button } from '@hilla/react-components/Button.js';
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox';
import { ConfirmDialog } from '@hilla/react-components/ConfirmDialog.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from '@hilla/react-form';
import BranchRC from 'Frontend/components/branch/BranchRC';
import { AutoGrid, AutoGridRef } from 'Frontend/components/grid/autogrid';
import OrganizationDTOModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel';
import DepartmentDTO from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTO';
import DepartmentDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { DepartmentDtoCrudService, OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from 'Frontend/util/NotificationUtil';
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import React, { useMemo, useState } from 'react';

const DepartmentView = () => {
  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedDepartmentItems, setSelectedDepartmentItems] = useState<DepartmentDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(DepartmentDTOModel, {
    onSubmit: async (department) => {
      await DepartmentDtoCrudService.save(department).then((result) => {
        refreshGrid();
        setSelectedDepartmentItems(result ? [result] : []);
        setSuccessNotification(true);
        clear();
      }).catch((error) => {
        console.log('error', error);
      });
    }
  });

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const organizationDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<OrganizationDTOModel>
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
              { organization: true }
            }
            organization={{
              organizationFilter: orgNameFilter,
              setOrganizationFilter: setOrgNameFilter
            }}
          />
          <AutoGrid service={DepartmentDtoCrudService} model={DepartmentDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'code', 'status', 'organization.name',]}
            selectedItems={selectedDepartmentItems}
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedDepartmentItems(item ? [item] : []);
              read(item);
            }}
            columnOptions={{
              'organization.name': {
                header: 'Organization',
                externalValue: orgNameFilter,
                setExternalValue: setOrgNameFilter,
              },
            }}
          />
        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full">#{value.name ?? 'Unknown Title'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <main className="overflow-y-scroll w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
              <label slot="label">Profile</label>
              <ComboBox label={'Organization'}  {...field(model.organization)} dataProvider={organizationDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              <TextField label={'Name'}  {...field(model.name)} />
              <TextField label={'Code'}  {...field(model.code)} />
              <TextField label={'Description'}  {...field(model.description)} />
              <TextField label={'Status'}  {...field(model.status)} />
            </FormLayout>
          </main>
          <footer className="flex flex-row bg-gray-100 w-full">
            <div className="w-full">
              {
                selectedDepartmentItems[0]?.id === undefined ? null :
                  <Button
                    className="text-white bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setDialogOpened(true);
                      console.log('delete', selectedDepartmentItems[0]?.id);
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
                    {selectedDepartmentItems[0]?.id !== undefined ? 'Update' : 'Save'}
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
          DepartmentDtoCrudService.delete(selectedDepartmentItems[0]?.id).then((result) => {
            refreshGrid();
            setSelectedDepartmentItems([]);
            reset();
          });
        }}>
        {`Do you want to delete?${value.name}`}
      </ConfirmDialog >
    </>
  );
};

export default DepartmentView;
