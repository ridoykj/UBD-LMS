import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from '@hilla/react-components/ConfirmDialog.js';
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Grid, GridDataProviderCallback, GridDataProviderParams } from "@hilla/react-components/Grid.js";
import { GridFilterColumn } from '@hilla/react-components/GridFilterColumn.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Scroller } from "@hilla/react-components/Scroller.js";
import { Select } from '@hilla/react-components/Select.js';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import BranchRC from "Frontend/components/branch/BranchRC";
import ProgrammeTypeEnum from "Frontend/generated/com/itbd/application/constants/ProgrammeTypeEnum";
import DepartmentDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel";
import ProgrammeDTO from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTO";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { DepartmentDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import { gridLazyFilter } from "Frontend/util/gridLazyFilterUtil";
import { useMemo, useState } from "react";

const ProgrammeView = () => {
  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [refreshGrid, setRefreshGrid] = useState<boolean>(false);
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const [selectedProgrameeItems, setSelectedProgrameeItems] = useState<ProgrammeDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(ProgrammeDTOModel, {
    onSubmit: async (programme) => {
      await ProgrammeDtoCrudService.save(programme).then((result) => {
        setRefreshGrid(!refreshGrid);
        setSuccessNotification(true);
      });
    }
  });

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
          filterValue: departmentNameFilter !== undefined ? departmentNameFilter : '',
          matcher: Matcher.CONTAINS
        },];

        console.log('departmentNameFilter >>>>>>>>', departmentNameFilter, departmentNameFilter !== undefined ? departmentDataProvider.length : 0);
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
    [departmentNameFilter, refreshGrid]
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
            setRefreshGrid(!refreshGrid);
            setSelectedProgrameeItems([]);
            reset();
          });
        }}>
        {`Do you want to delete?${value.name}`}
      </ConfirmDialog >
      <SplitLayout className="h-full w-full">
        <VerticalLayout className="h-full w-full items-stretch">
          <BranchRC
            organization={{
              organizationName: orgNameFilter,
              setOrganizationName: setOrgNameFilter
            }}
            department={{
              departmentName: departmentNameFilter,
              setDepartmentName: setDepartmentNameFilter
            }}
          />
          <Grid dataProvider={programmeDataProvider} selectedItems={selectedProgrameeItems}
            className="h-full w-full m-0"
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedProgrameeItems(item ? [item] : []);
              read(item);
              console.log('item', item);
            }}
          >
            <GridFilterColumn path="name" header="Name" autoWidth flexGrow={2} />
            <GridFilterColumn path="studyLevel" header="Study Level" autoWidth flexGrow={2} />
            <GridFilterColumn path="department.name" header="Department" autoWidth flexGrow={2} />
            <GridFilterColumn path="status" header="Status" autoWidth flexGrow={1} />
          </Grid>
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
    </>
  );
};

export default ProgrammeView;