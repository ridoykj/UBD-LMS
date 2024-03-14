// import { FormLayout } from "@hilla/react-components/FormLayout.js";
// import { TextArea } from "@hilla/react-components/TextArea.js";
// import { TextField } from "@hilla/react-components/TextField.js";
// import { useForm } from "@hilla/react-form";
// import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
// import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
// import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
// import AppPermissionDto from "Frontend/generated/com/itbd/application/dto/resources/permissions/AppPermissionDto";
// import AppPermissionDtoModel from "Frontend/generated/com/itbd/application/dto/resources/permissions/AppPermissionDtoModel";
// import { AppPermissionDtoCrudService } from "Frontend/generated/endpoints";
// import React, { useState } from "react";
// import { FaUserPlus } from "react-icons/fa";

// const responsiveSteps = [
//   { minWidth: '0', columns: 1 },
//   { minWidth: '500px', columns: 4 },
// ];

// const PermissionView = () => {

//   const [showSidebar, setShowSidebar] = useState<boolean>(false);
//   const autoGridRef = React.useRef<AutoGridRef>(null);
//   const [selectedRoleItems, setSelectedRoleItems] = useState<AppPermissionDto[]>([]);

//   const form = useForm(AppPermissionDtoModel, {
//     onSubmit: async (roles) => {
//       await AppPermissionDtoCrudService.save(roles).then((result) => {
//         refreshGrid();
//         setSelectedRoleItems(result ? [result] : []);
//         clear();
//       });
//     }
//   });

//   const { model, field, value, read, clear, reset } = form;

//   function refreshGrid() {
//     autoGridRef.current?.refresh();
//   }

//   const primary = () => {
//     return (
//       <>
//         <AutoGrid service={AppPermissionDtoCrudService} model={AppPermissionDtoModel} ref={autoGridRef}
//           visibleColumns={['name', 'description',]}
//           selectedItems={selectedRoleItems}
//           theme="row-stripes"
//           columnOptions={{
//             'name': {
//               header: 'Name',
//               resizable: true,
//             },
//             'description': {
//               header: 'Description',
//               resizable: true,
//             },
//           }}
//           onActiveItemChanged={(e) => {
//             const item = e.detail.value;
//             console.log('item', item);
//             setSelectedRoleItems(item ? [item] : []);
//             read(item);
//             setShowSidebar(item?.id !== undefined);
//           }}
//         />
//         <SpeedDialRC children={[
//           {
//             name: 'Add',
//             icon: <FaUserPlus />,
//             onClick: () => {
//               clear();
//               setSelectedRoleItems([]);
//               setShowSidebar(true);
//             }
//           },
//         ]} />
//       </>
//     );
//   }

//   const secondary = () => {
//     return (
//       <>
//         <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
//           <TextField label={'Name'}  {...{ colspan: 2 }} {...field(model.resourceName)} />
//           <TextArea label={'Description'}  {...{ colspan: 2 }} {...field(model.description)} />
//         </FormLayout>
//       </>
//     );
//   }

//   async function onConfirm() {
//     return await AppPermissionDtoCrudService.delete(selectedRoleItems[0]?.id).then((result) => {
//       refreshGrid();
//       setSelectedRoleItems([]);
//       reset();
//     });
//   }

//   return (
//     <>
//       <SideCrudRC
//         primary={primary()}
//         secondary={secondary()}
//         form={form}
//         onConfirm={onConfirm}
//         showSidebar={showSidebar}
//         setShowSidebar={setShowSidebar}
//       />
//     </>
//   );
// };

// export default PermissionView;
