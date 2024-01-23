import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { IntegerField } from "@hilla/react-components/IntegerField.js";
import { NumberField } from "@hilla/react-components/NumberField.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import BranchRC from "Frontend/components/branch/BranchRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import CoordinatorTypeEnum from "Frontend/generated/com/itbd/application/constants/CoordinatorTypeEnum";
import BatchCoordinatorDAO from "Frontend/generated/com/itbd/application/dao/org/allocation/BatchCoordinatorDAO";
import BatchCourseDTO from "Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTO";
import BatchCourseDTOModel from "Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTOModel";
import BatchDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDTOModel";
import CourseDTO from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDTO";
import CourseDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDTOModel";
import InstructorDTOModel from "Frontend/generated/com/itbd/application/dto/user/instructor/InstructorDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BatchCoordinatorDtoCrudService, BatchCourseDtoCrudService, BatchDtoCrudService, CourseDtoCrudService, InstructorDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";
import { FaTrash, FaUserPlus } from "react-icons/fa";

const BatchCourseView = () => {

  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [programmeNameFilter, setProgrammeNameFilter] = useState('');

  const [items, setItems] = useState<BatchCoordinatorDAO>();
  // const [invitedPeople, setInvitedPeople] = useState<BatchCoordinatorDAO[]>([]);
  // const [selectedValue, setSelectedValue] = useState<string>('');

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const [selectedCourseItems, setSelectedCourseItems] = useState<BatchCourseDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting, setValue, update, validate } = useForm(BatchCourseDTOModel, {
    onSubmit: async (batch) => {
      await BatchCourseDtoCrudService.save(batch).then((result) => {
        refreshGrid();
        setSelectedCourseItems(result ? [result] : []);
        setSuccessNotification(true);
      });
    }
  });

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }


  const coordinatorType = Object.values(CoordinatorTypeEnum).map(level => ({ label: level, value: level }));

  const instructorDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<InstructorDTOModel>
      ) => {
        const childName: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'person.givenName',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS,
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'or', childName);
        InstructorDtoCrudService.list(pagination, filters).then((result: any) => {
          console.log('instructorDataProvider', result);
          callback(result);
        });
      },
    []
  );

  const batchDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<BatchDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'programme.name',
            filterValue: programmeNameFilter || '',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BatchDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    [programmeNameFilter]
  );

  const courseDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<CourseDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          // {
          //   '@type': 'propertyString',
          //   propertyId: 'programme.name',
          //   filterValue: programmeNameFilter || '',
          //   matcher: Matcher.EQUALS
          // }, 
          {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          }, {
            '@type': 'propertyString',
            propertyId: 'code',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        CourseDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result);
        });
      },
    [programmeNameFilter]
  );

  const courseCustomItemRenderer = (item: CourseDTOModel<CourseDTO>) => {
    const course: CourseDTO = item.valueOf();
    console.log('courseCustomItemRenderer', item.valueOf().name);
    return (
      <div className="border-b">
        <p className="text-sm font-semibold">{`${course.code} - ${course.name}`}</p>
      </div>
    );
  }

  function renderInvitedPeopleTable() {
    return (
      <>
        <Grid items={value.batchCoordinators} allRowsVisible className="w-full">
          <GridColumn header="Name" path='instructor.person.givenName' autoWidth resizable />
          <GridColumn path="type" autoWidth resizable />
          <GridColumn header="">
            {({ item: coordinator }) => (
              <Button className="text-red-500 hover:text-red-600 bg-transparent border"
                onClick={() => {
                  if (coordinator.id != null) {
                    BatchCoordinatorDtoCrudService.delete(coordinator.id).then((result) => {
                      refreshGrid();
                      clear();
                    })
                  }
                  else {
                    console.log('batchCoordinators', value.batchCoordinators);
                    console.log('coordinator', coordinator);
                    value.batchCoordinators = value.batchCoordinators?.filter((p) => p?.instructor?.id !== coordinator.instructor.id);
                    update();
                  };
                }}
              >
                <FaTrash />
              </Button>
            )}
          </GridColumn>
        </Grid>
      </>
    );
  }

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
              { organization: true, department: true, programme: true, batch: true }
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

          <AutoGrid service={BatchCourseDtoCrudService} model={BatchCourseDTOModel} ref={autoGridRef}
            visibleColumns={['batch.name', 'course.code', 'course.name', 'semester', 'numberOfCredits',]}
            selectedItems={selectedCourseItems}
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedCourseItems(item ? [item] : []);
              console.log('onActiveItemChanged', item);
              read(item);
            }}
            columnOptions={{
              'organization.name': {
                header: 'Organization',
                externalValue: orgNameFilter,
                setExternalValue: setOrgNameFilter,
              },
              'batch.name': {
                header: 'Batch',
              },
              'course.code': {
                header: 'Course Code',
              },
              'course.name': {
                header: 'Course',
              },
              'numberOfCredits': {
                header: 'Credits',
              },
            }}
          />

        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># {value.name ?? 'Batch & Course'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <main className="overflow-y-scroll w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
              <ComboBox label={'Batch'}  {...field(model.batch)} dataProvider={batchDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              <ComboBox label={'Course'}  {...field(model.course)} dataProvider={courseDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible
                renderer={({ item }) => courseCustomItemRenderer(item)}
                style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties}
              />
              <div className="flex flex-col w-fit border-2 drop-shadow-sm">
                <ComboBox label={'Coordinator'} dataProvider={instructorDataProvider} itemLabelPath="person.givenName" itemValuePath="id"
                  onSelectedItemChanged={(event) => {
                    event.detail.value ? setItems({ instructor: event.detail.value.valueOf(), batchCourse: { id: value.id, version: value.version } }) : null;
                  }}
                />
                <div>
                  <ComboBox label={'Activity'} items={coordinatorType} itemLabelPath="label" itemValuePath="label"
                    onSelectedItemChanged={(event) => {
                      if (items) {
                        setItems({ ...items, type: event.detail.value?.value });
                      }
                    }}
                  />
                  <Button className="text-white hover:bg-blue-600 bg-blue-500 drop-shadow-sm w-fit"
                    onClick={() => {
                      if (!value.batchCoordinators?.some(coordinator => coordinator?.instructor?.id === items?.instructor?.id)) {
                        value.batchCoordinators = [...value.batchCoordinators ?? [], items ?? {}];
                        update();
                      }
                    }}
                  >
                    <FaUserPlus />
                  </Button>
                </div>
                {value.batchCoordinators?.length ?? 0 > 0 ? renderInvitedPeopleTable() : null}
              </div>
              <TextField label={'Headline'}  {...field(model.headline)} className="w-fit" />
              <TextField label={'Type'}  {...field(model.type)} className="w-fit" />
              <IntegerField label={'Semester'}  {...field(model.semester)} className="w-fit" />
              <NumberField label={'Credits'}  {...field(model.numberOfCredits)} className="w-fit" />
              <NumberField label={'Lectures'}  {...field(model.numberOfLecture)} className="w-fit" />
              <NumberField label={'Tutorials'}  {...field(model.numberOfTutorial)} className="w-fit" />
              <NumberField label={'Duration (min)'}  {...field(model.duration)} className="w-fit" />
              <TextArea label={'About'}  {...field(model.about)} className="w-fit" />
            </FormLayout>
          </main>
          <footer className="flex flex-row bg-gray-100 w-full">
            <div className="w-full">
              {
                value?.id === undefined ? null :
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
              !dirty ? null :
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
                    {value?.id !== undefined ? 'Update' : 'Save'}
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
          BatchCourseDtoCrudService.delete(selectedCourseItems[0]?.id).then((result) => {
            refreshGrid();
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

export default BatchCourseView;
