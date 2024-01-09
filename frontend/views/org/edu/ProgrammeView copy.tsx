// import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
// import { FormItem } from "@hilla/react-components/FormItem.js";
// import { FormLayout } from "@hilla/react-components/FormLayout.js";
// import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
// import { TextArea } from "@hilla/react-components/TextArea.js";
// import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
// import { AutoCrud, AutoGridRef } from "@hilla/react-crud";
// import OrganizationDTOModel from "Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel";
// import DepartmentDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel";
// import ProgrammeDTO from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTO";
// import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
// import AndFilter from "Frontend/generated/dev/hilla/crud/filter/AndFilter";
// import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
// import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
// import { DepartmentDtoCrudService, OrganizationDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
// import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
// import React, { useMemo, useState } from "react";

// const ProgrammeView = () => {
//   const [orgNameFilter, setOrgNameFilter] = useState('');
//   const [departmentNameFilter, setDepartmentNameFilter] = useState('');
//   const autoGridRef = React.useRef<AutoGridRef>(null);

//   function PriceRenderer({ item }: { item: ProgrammeDTO }) {
//     const { department } = item;
//     return <span style={{ fontWeight: 'bold' }}>{department?.name}</span>;
//   }

//   function refreshGrid() {
//     autoGridRef.current?.refresh();
//   }

//   const filter = useMemo(() => {
//     const orgFilter: PropertyStringFilter = {
//       propertyId: 'department.organization.name',
//       filterValue: orgNameFilter,
//       matcher: Matcher.CONTAINS,
//       '@type': 'propertyString',
//     };

//     const departmentFilter: PropertyStringFilter = {
//       propertyId: 'department.name',
//       filterValue: departmentNameFilter,
//       matcher: Matcher.CONTAINS,
//       '@type': 'propertyString',
//     };

//     const andFilter: AndFilter = {
//       '@type': 'and',
//       children: [orgFilter, departmentFilter],
//     };
//     console.log('orgNameFilter', orgNameFilter);
//     return orgNameFilter == '' ? orgFilter : andFilter;
//   }, [orgNameFilter, departmentNameFilter]);

//   const organizationDataProvider = useMemo(
//     () =>
//       async (
//         params: ComboBoxDataProviderParams,
//         callback: ComboBoxDataProviderCallback<OrganizationDTOModel>
//       ) => {
//         const { pagination, filters } = comboBoxLazyFilter(params, 'and', [{
//           '@type': 'propertyString',
//           propertyId: 'name',
//           filterValue: departmentNameFilter,
//           matcher: Matcher.CONTAINS
//         },]);

//         OrganizationDtoCrudService.list(pagination, filters).then((result: any) => {
//           console.log('result', result);
//           console.log('filters', filters);
//           callback(result);
//         });
//       },
//     [departmentNameFilter]
//   );

//   const departmentDataProvider = useMemo(
//     () =>
//       async (
//         params: ComboBoxDataProviderParams,
//         callback: ComboBoxDataProviderCallback<DepartmentDTOModel>
//       ) => {
//         const child: PropertyStringFilter[] = [{
//           '@type': 'propertyString',
//           propertyId: 'name',
//           filterValue: params.filter,
//           matcher: Matcher.CONTAINS
//         }, {
//           '@type': 'propertyString',
//           propertyId: 'organization.name',
//           filterValue: orgNameFilter,
//           matcher: Matcher.CONTAINS
//         },];

//         const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
//         DepartmentDtoCrudService.list(pagination, filters).then((result: any) => {
//           console.log('result', result);
//           console.log('filters', filters);
//           callback(result);
//         });
//       },
//     [orgNameFilter]
//   );

//   const responsiveSteps = [
//     { minWidth: '0', columns: 1 },
//     { minWidth: '500px', columns: 2 },
//   ];

//   return (
//     <VerticalLayout style={{ alignItems: 'stretch', height: '100%', width: '100%' }}>
//       <HorizontalLayout style={{ alignItems: 'stretch', width: '100%' }}>
//         <FormLayout responsiveSteps={responsiveSteps}>
//           <FormItem>
//             <label slot="label">Profile</label>
//             <ComboBox dataProvider={organizationDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible={true} onValueChanged={
//               (e) => {
//                 console.log('value', e.detail.value);
//                 const searchTerm = (e.detail.value || '').trim().toLowerCase();
//                 console.log('searchTerm', searchTerm);
//                 setOrgNameFilter(searchTerm);
//               }
//             } />
//           </FormItem>
//           <FormItem>
//             <label slot="label">Department</label>
//             <ComboBox dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible={true} onValueChanged={
//               (e) => {
//                 console.log('value', e.detail.value);
//                 const searchTerm = (e.detail.value || '').trim().toLowerCase();
//                 console.log('searchTerm', searchTerm);
//                 setDepartmentNameFilter(searchTerm);
//               }
//             } />
//           </FormItem>
//         </FormLayout>
//       </HorizontalLayout>
//       <AutoCrud
//         service={ProgrammeDtoCrudService} model={ProgrammeDTOModel}
//         style={{ height: '100%', width: '100%' }}
//         gridProps={{
//           visibleColumns: ['name', 'studyLevel', 'status', 'department.name',],
//           rowNumbers: true,
//           experimentalFilter: filter,
//           columnOptions: {
//             'department.name': {
//               header: 'Department',
//               renderer: PriceRenderer,
//             },
//           },
//         }}
//         formProps={{
//           visibleFields: ['department', 'name', 'studyLevel', 'status', 'description',],
//           fieldOptions: {
//             name: {
//               validators: [
//                 {
//                   message: 'Name must be more than 3 characters',
//                   validate: (value: string) => value.length > 3,
//                 },],
//             },
//             'department': {
//               renderer: ({ field }) => <ComboBox {...field} label="Department" dataProvider={departmentDataProvider} itemLabelPath='name' itemValuePath='id' clearButtonVisible={true} required={true} />,
//             },
//             description: {
//               renderer: ({ field }) => <TextArea {...field} label="Full Description" maxlength={255} style={{ flexGrow: 1 }} />,
//               validators: [{
//                 message: 'Description must be less than 255 characters',
//                 validate: (value: string) => value.length < 255
//               }],
//             },
//           },
//         }}
//       />
//     </VerticalLayout>
//   );
// };

// export default ProgrammeView;
