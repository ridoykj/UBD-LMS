import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Grid, GridDataProviderCallback, GridDataProviderParams } from "@hilla/react-components/Grid.js";
import { GridFilterColumn } from "@hilla/react-components/GridFilterColumn.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { Scroller } from "@hilla/react-components/Scroller.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import BranchRC from "Frontend/components/branch/BranchRC";
import CourseDTO from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDTO";
import CourseDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDTOModel";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { CourseDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import { gridLazyFilter } from "Frontend/util/gridLazyFilterUtil";
import { NumberField } from '@hilla/react-components/NumberField.js';
import { useMemo, useState } from "react";

const CourseView = () => {

  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [programmeNameFilter, setProgrammeNameFilter] = useState('');

  const [refreshGrid, setRefreshGrid] = useState<boolean>(false);

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const [selectedCourseItems, setSelectedCourseItems] = useState<CourseDTO[]>([]);
  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(CourseDTOModel, {
    onSubmit: async (batch) => {
      await CourseDtoCrudService.save(batch).then((result) => {
        setRefreshGrid(!refreshGrid);
        setSuccessNotification(true);
      });
    }
  });

  const programmeDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<ProgrammeDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'department.name',
            filterValue: departmentNameFilter || '',
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
    [departmentNameFilter]
  );

  const courseDataProvider = useMemo(
    () =>
      async (
        params: GridDataProviderParams<CourseDTO>,
        callback: GridDataProviderCallback<CourseDTO>
      ) => {
        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'programme.name',
          filterValue: programmeNameFilter,
          matcher: Matcher.CONTAINS
        },];

        params.filters?.forEach((filter) => {
          if (filter.path !== 'programme.name') {
            child.push({
              '@type': 'propertyString',
              propertyId: filter.path,
              filterValue: filter.value,
              matcher: Matcher.CONTAINS
            });
          }
        });

        const { pagination, filter } = gridLazyFilter(params, 'and', child);
        CourseDtoCrudService.list(pagination, filter).then((result: any) => {
          callback(result, result.length);
        });
      },
    [programmeNameFilter, refreshGrid]
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
            organization={{
              organizationName: orgNameFilter,
              setOrganizationName: setOrgNameFilter
            }}
            department={{
              departmentName: departmentNameFilter,
              setDepartmentName: setDepartmentNameFilter
            }}
            programme={{
              programmeName: programmeNameFilter,
              setProgrammeName: setProgrammeNameFilter
            }}
          />
          <Grid dataProvider={courseDataProvider} selectedItems={selectedCourseItems}
            className="h-full w-full m-0"
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedCourseItems(item ? [item] : []);
              read(item);
              console.log('item', item);
            }}
          >
            <GridFilterColumn path="name" header="Name" autoWidth flexGrow={2} />
            <GridFilterColumn path="headline" header="Headline" autoWidth flexGrow={2} />
            <GridFilterColumn path="language" header="Language" autoWidth flexGrow={1} />
            <GridFilterColumn path="numberOfCredits" header="Credits" autoWidth flexGrow={1} />
            <GridFilterColumn path="programme.name" header="Programme" autoWidth flexGrow={2} />
          </Grid>
        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># {value.name ?? 'Unkown Title'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <Scroller scrollDirection="vertical" className="w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
              <label slot="label">Profile</label>
              <ComboBox label={'Programme'}  {...field(model.programme)} dataProvider={programmeDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              <TextField label={'Name'}  {...field(model.name)} className="w-fit" />
              <TextField label={'Headline'}  {...field(model.headline)} className="w-fit" />
              <TextField label={'Language'}  {...field(model.language)} className="w-fit" />
              <NumberField label={'Credits'}  {...field(model.numberOfCredits)} className="w-fit" step={0.5} defaultValue={0} stepButtonsVisible />
            </FormLayout>
          </Scroller>
          <footer className="flex flex-row bg-gray-100 w-full">
            <div className="w-full">
              {
                selectedCourseItems[0]?.id === undefined ? null :
                  <Button
                    className="text-white bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setDialogOpened(true);
                      console.log('delete', selectedCourseItems[0]?.id);
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
                    {selectedCourseItems[0]?.id !== undefined ? 'Update' : 'Save'}
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
          CourseDtoCrudService.delete(selectedCourseItems[0]?.id).then((result) => {
            setRefreshGrid(!refreshGrid);
            setSelectedCourseItems([]);
            reset();
          });
        }}>
        Do you want to delete?
        {value.name}
      </ConfirmDialog >
    </>
  );
};

export default CourseView;
