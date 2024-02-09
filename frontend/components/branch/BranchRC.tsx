
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox.js';
import '@vaadin/icons';
import OrganizationDAO from 'Frontend/generated/com/itbd/application/dao/org/academic/OrganizationDAO';
import BatchCourseDAO from 'Frontend/generated/com/itbd/application/dao/org/allocation/BatchCourseDAO';
import BatchDAO from 'Frontend/generated/com/itbd/application/dao/org/edu/BatchDAO';
import CourseDAO from 'Frontend/generated/com/itbd/application/dao/org/edu/CourseDAO';
import DepartmentDAO from 'Frontend/generated/com/itbd/application/dao/org/edu/DepartmentDAO';
import ProgrammeDAO from 'Frontend/generated/com/itbd/application/dao/org/edu/ProgrammeDAO';
import OrganizationDTOModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel';
import BatchCourseDTOModel from 'Frontend/generated/com/itbd/application/dto/org/allocation/BatchCourseDTOModel';
import BatchDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/BatchDTOModel';
import CourseDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/CourseDTOModel';
import DepartmentDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel';
import ProgrammeDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
import { BatchCourseDtoCrudService, BatchDtoCrudService, CourseDtoCrudService, DepartmentDtoCrudService, OrganizationDtoCrudService, ProgrammeDtoCrudService } from 'Frontend/generated/endpoints';
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { Dispatch, SetStateAction, useMemo } from 'react';

const comboboxStyle = {
  '--vaadin-combo-box-overlay-width': '350px'
} as React.CSSProperties;

type VisibleFields = {
  organization?: boolean,
  department?: boolean,
  programme?: boolean,
  batch?: boolean,
  semester?: boolean,
  course?: boolean,
};

export type BranchCombobox = {
  organizationFilter?: OrganizationDAO,
  departmentFilter?: DepartmentDAO,
  programmeFilter?: ProgrammeDAO,
  batchFilter?: BatchDAO,
  semesterFilter?: BatchCourseDAO,
  courseFilter?: CourseDAO
}

type BranchProps = {
  branch: BranchCombobox,
  setBranch: Dispatch<SetStateAction<BranchCombobox>>
}

export default function BranchRC({ visibleFields, branchProps, }: {
  visibleFields: VisibleFields, // ['organization', 'department', 'programme', 'batch', 'course'];
  branchProps: BranchProps
}) {
  const { organizationFilter, departmentFilter, programmeFilter, batchFilter, semesterFilter, courseFilter, } = branchProps.branch;

  const organizationDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<OrganizationDTOModel>
      ) => {
        const { pagination, filters } = comboBoxLazyFilter(params, 'and', [{
          '@type': 'propertyString',
          propertyId: 'name',
          filterValue: params.filter,
          matcher: Matcher.CONTAINS
        },]);

        OrganizationDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    []
  );

  const departmentDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<DepartmentDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'organization.id',
            filterValue: organizationFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        DepartmentDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [organizationFilter]
  );

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
            filterValue: departmentFilter?.id?.toString() || '0',
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
    [departmentFilter]
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
            filterValue: programmeFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BatchDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [programmeFilter]
  );

  const semesterDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<BatchCourseDTOModel>
      ) => {

        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'batch.id',
            filterValue: batchFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          },];

        params.filter && child.push({
          '@type': 'propertyString',
          propertyId: 'semester',
          filterValue: params.filter || '0',
          matcher: Matcher.EQUALS
        });

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        BatchCourseDtoCrudService.list(pagination, filters).then((result: any) => {
          // console.log('semesterDataProvider', result);
          const putSemester: BatchCourseDTOModel[] = [];
          result.map((item: BatchCourseDTOModel) => {
            if (putSemester.findIndex((i: BatchCourseDTOModel) => i.semester === item.semester) === -1) {
              putSemester.push(item);
            }
          });
          let uniqueSemester = putSemester.sort((a, b) => Number(a.semester) - Number(b.semester));
          callback(uniqueSemester, uniqueSemester.length);
        });
      },
    [batchFilter]
  );

  const courseDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<CourseDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'programme.id',
            filterValue: programmeFilter?.id?.toString() || '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        CourseDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });
      },
    [programmeFilter]
  );

  const handleOrganization = (e: any) => {
    console.log('Organization - ack');
    const selectedItem = e.detail.value;

    branchProps.setBranch((b) => ({
      ...b,
      departmentFilter: undefined,
      programmeFilter: undefined,
      batchFilter: undefined,
      semesterFilter: undefined,
      courseFilter: undefined,
      organizationFilter: selectedItem,
    }));


    // department?.setDepartmentFilter((dr) => ({} as DepartmentDAO)); // Reset department combobox   
    // programme?.setProgrammeFilter((d) => ({} as ProgrammeDAO)); // Reset programme combobox   
    // batch?.setBatchFilter((d) => ({} as BatchDAO)); // Reset batch combobox
    // course?.setCourseFilter((d) => ({} as CourseDAO)); // Reset course combobox
    // semester?.setSemesterFilter((d) => ({} as BatchCourseDAO)); // Reset semester combobox

    // organization?.setOrganizationFilter((o) => selectedItem);
  };

  const handleDepartment = (e: any) => {
    const selectedItem = e.detail.value;

    branchProps.setBranch((b) => ({
      ...b,
      programmeFilter: undefined,
      batchFilter: undefined,
      semesterFilter: undefined,
      courseFilter: undefined,
      departmentFilter: selectedItem,
    }));


    // programme?.setProgrammeFilter((d) => ({} as ProgrammeDAO)); // Reset programme combobox   
    // batch?.setBatchFilter((d) => ({} as BatchDAO)); // Reset batch combobox
    // course?.setCourseFilter((d) => ({} as CourseDAO)); // Reset course combobox
    // semester?.setSemesterFilter((d) => ({} as BatchCourseDAO)); // Reset semester combobox
    // department?.setDepartmentFilter((d) => selectedItem);
  };

  const handleProgramme = (e: any) => {
    const selectedItem = e.detail.value;


    branchProps.setBranch((b) => ({
      ...b,
      batchFilter: undefined,
      semesterFilter: undefined,
      courseFilter: undefined,
      programmeFilter: selectedItem,
    }));


    // batch?.setBatchFilter((d) => ({} as BatchDAO)); // Reset batch combobox
    // course?.setCourseFilter((d) => ({} as CourseDAO)); // Reset course combobox
    // semester?.setSemesterFilter((d) => ({} as BatchCourseDAO)); // Reset semester combobox

    // programme?.setProgrammeFilter((d) => selectedItem);
  };

  const handleBatch = (e: any) => {
    const selectedItem = e.detail.value;

    branchProps.setBranch((b) => ({
      ...b,
      semesterFilter: undefined,
      courseFilter: undefined,
      batchFilter: selectedItem,
    }));

    // course?.setCourseFilter((d) => ({} as CourseDAO)); // Reset course combobox
    // semester?.setSemesterFilter((d) => ({} as BatchCourseDAO)); // Reset semester combobox

    // batch?.setBatchFilter((d) => selectedItem);
  };

  const handleSemester = (e: any) => {
    const selectedItem = e.detail.value;
    branchProps.setBranch((b) => ({
      ...b,
      semesterFilter: selectedItem,
    }));

    // semester?.setSemesterFilter((d) => selectedItem);
  };

  const handleCourse = (e: any) => {
    const selectedItem = e.detail.value;

    branchProps.setBranch((b) => ({
      ...b,
      batchFilter: selectedItem,
    }));

    // batch?.setBatchFilter((d) => selectedItem);
  };
  return (
    <>
      <div className='p-2 pt-0 m-auto drop-shadow-[0_5px_5px_#dfe7ff] w-full'>
        <div className='flex flex-row overflow-x-auto w-full items-center rounded-xl border-2 border-[#dfe7ff]'>
          {
            visibleFields['organization'] &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Profile</div>
              <ComboBox dataProvider={organizationDataProvider} itemLabelPath='name' itemValuePath='name' onSelectedItemChanged={handleOrganization} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['department'] && organizationFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Department</div>
              <ComboBox dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleDepartment} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['programme'] && departmentFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Programme</div>
              <ComboBox dataProvider={programmeDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleProgramme} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['batch'] && programmeFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Batch</div>
              <ComboBox dataProvider={batchDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleBatch} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['semester'] && batchFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Semester</div>
              <ComboBox dataProvider={semesterDataProvider} itemLabelPath='semester' itemValuePath='id' onSelectedItemChanged={handleSemester} style={comboboxStyle} clearButtonVisible />
            </>
          }
          {
            visibleFields['course'] && programmeFilter?.id &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Course</div>
              <ComboBox dataProvider={courseDataProvider} itemLabelPath='name' itemValuePath='id' onSelectedItemChanged={handleCourse} style={comboboxStyle} clearButtonVisible />
            </>
          }
        </div>
      </div>

    </>
  );
}