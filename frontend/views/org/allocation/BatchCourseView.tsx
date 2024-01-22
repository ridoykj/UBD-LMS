import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
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
import BatchCourseDTO from "Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTO";
import BatchCourseDTOModel from "Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTOModel";
import BatchDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDTOModel";
import CourseDTO from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDTO";
import CourseDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDTOModel";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BatchCourseDtoCrudService, BatchDtoCrudService, CourseDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";

const BatchCourseView = () => {

  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [programmeNameFilter, setProgrammeNameFilter] = useState('');

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const [selectedCourseItems, setSelectedCourseItems] = useState<BatchCourseDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(BatchCourseDTOModel, {
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
            visibleColumns={['batch.name', 'semester', 'course.code', 'course.name', 'numberOfCredits',]}
            selectedItems={selectedCourseItems}
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedCourseItems(item ? [item] : []);
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
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># {value.name ?? 'Unknown Title'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <main className="overflow-y-scroll w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
              <label slot="label">Profile</label>
              <ComboBox label={'Batch'}  {...field(model.batch)} dataProvider={batchDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />

              <ComboBox label={'Course'}  {...field(model.course)} dataProvider={courseDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible
                renderer={({ item }) => courseCustomItemRenderer(item)}
                style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties}
              />

              {/* <ComboBox label={'Course'}  {...field(model.course)} dataProvider={programmeDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible /> */}
              {/* <TextField label={'Name'}  {...field(model.name)} className="w-fit" /> */}
              <TextField label={'Headline'}  {...field(model.headline)} className="w-fit" />
              {/* <TextField label={'code'}  {...field(model.code)} className="w-fit" /> */}
              <TextField label={'Type'}  {...field(model.type)} className="w-fit" />
              <IntegerField label={'Semester'}  {...field(model.semester)} className="w-fit" />
              <NumberField label={'Credits'}  {...field(model.numberOfCredits)} className="w-fit" />
              <NumberField label={'Lectures'}  {...field(model.numberOfLecture)} className="w-fit" />
              <NumberField label={'Tutorials'}  {...field(model.numberOfTutorial)} className="w-fit" />
              <NumberField label={'Duration (min)'}  {...field(model.duration)} className="w-fit" />
              {/* <TextField label={'durationUnit'}  {...field(model.durationUnit)} className="w-fit" /> */}
              <TextArea label={'About'}  {...field(model.about)} className="w-fit" />
              {/* <NumberField label={'Credit Points'}  {...field(model.numberOfCredits)} className="w-fit" step={0.5} defaultValue={0} stepButtonsVisible /> */}
              {/* <TextField label={'Language'}  {...field(model.language)} className="w-fit" /> */}
              {/* <TextArea label={'About'}  {...field(model.about)} className="w-fit" /> */}
            </FormLayout>
          </main>
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
