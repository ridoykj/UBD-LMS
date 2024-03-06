import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { IntegerField } from "@hilla/react-components/IntegerField.js";
import { NumberField } from "@hilla/react-components/NumberField.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { useForm } from "@hilla/react-form";
import BranchRC, { BranchCombobox } from "Frontend/components/branch/BranchRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import CoordinatorTypeEnum from "Frontend/generated/com/itbd/application/constants/enums/CoordinatorTypeEnum";
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
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import CoordinatorRenderer from "../user/Coordinator/CoordinatorRenderer";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '600px', columns: 2 },
];

const BatchCourseView = () => {
  const [branchFilter, setBranchFilter] = useState<BranchCombobox>({
    organizationFilter: undefined,
    departmentFilter: undefined,
    programmeFilter: undefined,
  });

  const [items, setItems] = useState<BatchCoordinatorDAO>();
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [selectedCourseItems, setSelectedCourseItems] = useState<BatchCourseDTO[]>([]);

  const form = useForm(BatchCourseDTOModel, {
    onSubmit: async (batch) => {
      await BatchCourseDtoCrudService.save(batch).then((result) => {
        refreshGrid();
        setSelectedCourseItems(result ? [result] : []);
        clear();
      }).catch((error) => {
        console.log('error', error);
      });
    }
  });

  const { model, field, value, read, clear, reset, update } = form;

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
          // console.log('instructorDataProvider', result);
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
            propertyId: 'programme.id',
            filterValue: branchFilter.programmeFilter?.id?.toString() || '0',
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
    [branchFilter.programmeFilter]
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
    [branchFilter.programmeFilter]
  );

  const courseCustomItemRenderer = (item: CourseDTOModel<CourseDTO>) => {
    const course: CourseDTO = item.valueOf();
    // console.log('courseCustomItemRenderer', item.valueOf().name);
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
          <GridColumn autoWidth resizable
            renderer={({ item }) => <>
              <div className="flex flex-col items-center ">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 w-full">{item.type}</span>
                <div className="flex flex-row items-center ">
                  <CoordinatorRenderer item={item.instructor} />
                  <div className="text-red-500 hover:text-red-600 bg-transparent p-0 m-0"
                    onClick={() => {
                      console.log('delete', item.instructor.id);
                      if (item.instructor.id != null) {
                        BatchCoordinatorDtoCrudService.delete(item.instructor.id).then((result) => {
                          refreshGrid();
                          clear();
                        })
                      } else {
                        value.batchCoordinators = value.batchCoordinators?.filter((p) => p?.instructor?.id !== item.instructor.instructor.id);
                        update();
                      };
                    }}
                  >
                    <FaTrash />
                  </div>
                </div>
              </div>
            </>}
          />
        </Grid>
      </>
    );
  }

  const primary = () => {
    return (
      <>
        <BranchRC
          visibleFields={{ organization: true, department: true, programme: true, batch: true }}
          branchProps={{ branch: branchFilter, setBranch: setBranchFilter }}
        />
        <AutoGrid service={BatchCourseDtoCrudService} model={BatchCourseDTOModel} ref={autoGridRef} multiSort multiSortPriority="append"
          visibleColumns={['batch.name', 'course.code', 'course.name', 'semester', 'numberOfCredits',]}
          selectedItems={selectedCourseItems}
          theme="row-stripes"
          columnOptions={{
            'organization.name': {
              header: 'Organization',
              externalValue: branchFilter.organizationFilter != null ? branchFilter.organizationFilter.name : '',
              // setExternalValue: setOrgFilter,
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
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedCourseItems(item ? [item] : []);
            // console.log('onActiveItemChanged', item);
            read(item);
            setShowSidebar(item?.id !== undefined);
          }}
        />
      </>
    );
  }

  const secondary = () => {
    return (
      <>
        <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
          <ComboBox label={'Batch'}  {...field(model.batch)} dataProvider={batchDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
          <ComboBox label={'Course'}  {...field(model.course)} dataProvider={courseDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible
            renderer={({ item }) => courseCustomItemRenderer(item)}
            style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties}
          />
          <div className="flex flex-col p-1 w-fit border-2 drop-shadow-sm">
            <ComboBox label={'Coordinator'} dataProvider={instructorDataProvider} itemLabelPath="person.givenName" itemValuePath="id"
              onSelectedItemChanged={(event) => {
                event.detail.value ? setItems({ instructor: event.detail.value.valueOf(), batchCourse: { id: value.id, version: value.version } }) : null;
              }}
              renderer={({ item }) => <CoordinatorRenderer item={item} />}
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
          <IntegerField label={'Semester'} min={1} defaultValue={1} {...field(model.semester)} className="w-fit" />
          <NumberField label={'Credits'}  {...field(model.numberOfCredits)} className="w-fit" />
          <NumberField label={'Lectures'}  {...field(model.numberOfLecture)} className="w-fit" />
          <NumberField label={'Tutorials'}  {...field(model.numberOfTutorial)} className="w-fit" />
          <NumberField label={'Duration (min)'}  {...field(model.duration)} className="w-fit" />
          <TextArea label={'About'}  {...field(model.about)} className="w-fit" />
        </FormLayout>
      </>
    );
  }

  async function onConfirm() {
    return await BatchCourseDtoCrudService.delete(selectedCourseItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedCourseItems([]);
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

export default BatchCourseView;
