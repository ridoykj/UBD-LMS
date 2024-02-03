
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox.js';
import '@vaadin/icons';
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
import { setMinutes } from 'date-fns';
import { Dispatch, SetStateAction, useMemo } from 'react';

type OrganizationProps = {
  organizationName: string,
  setOrganizationName: Dispatch<SetStateAction<string>>
}

type DepartmentProps = {
  departmentName: string,
  setDepartmentName: Dispatch<SetStateAction<string>>
}

type ProgrammeProps = {
  programmeName: string,
  setProgrammeName: Dispatch<SetStateAction<string>>
}

type BatchProps = {
  batchName: string,
  setBatchName: Dispatch<SetStateAction<string>>
}
type SemesterProps = {
  semesterName: string,
  setSemesterName: Dispatch<SetStateAction<string>>
}

type CourseProps = {
  courseName: string,
  setCourseName: Dispatch<SetStateAction<string>>
}

type VisibleFields = {
  organization?: boolean,
  department?: boolean,
  programme?: boolean,
  batch?: boolean,
  semester?: boolean,
  course?: boolean,
};

export default function BranchRC({ visibleFields, organization, department, programme, batch, semester, course, }: {
  visibleFields: VisibleFields, // ['organization', 'department', 'programme', 'batch', 'course'];
  organization?: OrganizationProps
  department?: DepartmentProps
  programme?: ProgrammeProps
  batch?: BatchProps
  semester?: SemesterProps
  course?: CourseProps
}) {
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
            propertyId: 'organization.name',
            filterValue: organization?.organizationName || '',
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
    [organization?.organizationName]
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
            propertyId: 'department.name',
            filterValue: department?.departmentName || '',
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
    [department?.departmentName]
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
            filterValue: programme?.programmeName || '',
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
    [programme?.programmeName]
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
            propertyId: 'batch.name',
            filterValue: batch?.batchName || '',
            matcher: Matcher.EQUALS
          },];

        if (params.filter !== undefined && params.filter !== null && params.filter !== '') {
          child.push({
            '@type': 'propertyString',
            propertyId: 'semester',
            filterValue: params.filter || '0',
            matcher: Matcher.EQUALS
          });
        }

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
    [batch?.batchName]
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
            propertyId: 'programme.name',
            filterValue: programme?.programmeName || '',
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
    [programme?.programmeName]
  );

  const handleOrganization = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    department?.setDepartmentName((dr) => ''); // Reset department combobox
    organization?.setOrganizationName((o) => searchTerm);
  };

  const handleDepartment = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    programme?.setProgrammeName((d) => ''); // Reset department combobox
    department?.setDepartmentName((d) => searchTerm);
  };

  const handleProgramme = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    batch?.setBatchName((d) => ''); // Reset department combobox    
    course?.setCourseName((d) => ''); // Reset department combobox
    programme?.setProgrammeName((d) => searchTerm);
  };

  const handleBatch = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    semester?.setSemesterName((d) => ''); // Reset department combobox
    batch?.setBatchName((d) => searchTerm);
  };

  const handleSemester = (e: any) => {
    const searchTerm = (e.detail.value || '');
    semester?.setSemesterName((d) => searchTerm);
  };

  const handleCourse = (e: any) => {
    const searchTerm = (e.detail.value || '').trim();
    batch?.setBatchName((d) => searchTerm);
  };
  return (
    <>
      <div className='p-2 pt-0 m-auto drop-shadow-[0_5px_5px_#dfe7ff] w-full'>
        <div className='flex flex-row overflow-x-auto w-full items-center rounded-xl border-2 border-[#dfe7ff]'>
          {
            visibleFields['organization'] &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Profile</div>
              <ComboBox dataProvider={organizationDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible onValueChanged={handleOrganization} style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties} />
            </>
          }
          {
            visibleFields['department'] && organization?.organizationName &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Department</div>
              <ComboBox dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible value={department?.departmentName} onValueChanged={handleDepartment} style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties} />
            </>
          }
          {
            visibleFields['programme'] && department?.departmentName &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Programme</div>
              <ComboBox dataProvider={programmeDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible value={programme?.programmeName} onValueChanged={handleProgramme} style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties} />
            </>
          }
          {
            visibleFields['batch'] && programme?.programmeName &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Batch</div>
              <ComboBox dataProvider={batchDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible value={batch?.batchName} onValueChanged={handleBatch} style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties} />
            </>
          }
          {
            visibleFields['semester'] && batch?.batchName &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Semester</div>
              <ComboBox dataProvider={semesterDataProvider} itemLabelPath='semester' itemValuePath='semester' clearButtonVisible value={semester?.semesterName} onValueChanged={handleSemester} style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties} />
            </>
          }
          {
            visibleFields['course'] && programme?.programmeName &&
            <>
              <div className='text-sm font-medium ml-5 mr-2 text-gray-400'>Batch</div>
              <ComboBox dataProvider={courseDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible value={course?.courseName} onValueChanged={handleCourse} style={{ '--vaadin-combo-box-overlay-width': '350px' } as React.CSSProperties} />
            </>
          }
        </div>
      </div>

    </>
  );
}