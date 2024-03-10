// import { Button } from "@hilla/react-components/Button.js";
// import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
// import { DateTimePicker } from "@hilla/react-components/DateTimePicker.js";
// import { EmailField } from '@hilla/react-components/EmailField.js';
// import { FormLayout } from "@hilla/react-components/FormLayout.js";
// import { Icon } from "@hilla/react-components/Icon.js";
// import { IntegerField } from '@hilla/react-components/IntegerField';
// import { NumberField } from "@hilla/react-components/NumberField.js";
// import { Select } from "@hilla/react-components/Select.js";
// import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
// import { TextArea } from "@hilla/react-components/TextArea.js";
// import { TextField } from "@hilla/react-components/TextField.js";
// import { useForm } from "@hilla/react-form";
// import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
// import BloodGroupsEnum from "Frontend/generated/com/itbd/application/constants/enums/BloodGroupsEnum";
// import GenderEnum from "Frontend/generated/com/itbd/application/constants/enums/GenderEnum";
// import InstructorDto from "Frontend/generated/com/itbd/application/dto/user/instructor/InstructorDto";
// import InstructorDtoModel from "Frontend/generated/com/itbd/application/dto/user/instructor/InstructorDtoModel";
// import NotificationUtil from "Frontend/util/NotificationUtil";
// import React, { useState } from "react";
// import { Resizable, ResizeCallbackData } from 'react-resizable';

// import { Upload, UploadSuccessEvent } from "@hilla/react-components/Upload.js";
// import { InstructorDtoCrudService } from "Frontend/generated/endpoints";
// import { FaX } from "react-icons/fa6";
// import CoordinatorRenderer from "./CoordinatorRenderer";

// const responsiveSteps = [
//     { minWidth: '0', columns: 1 },
//     { minWidth: '500px', columns: 4 },
// ];

// const discardButtonColors: { [key: string]: string } = {
//     true: 'text-white bg-indigo-400 hover:bg-indigo-500',
//     false: 'text-white bg-gray-300',
// };

// const saveButtonColors: { [key: string]: string } = {
//     true: 'text-white bg-emerald-400 hover:bg-emerald-500',
//     false: 'text-white bg-gray-300',
// };

// const genders = Object.values(GenderEnum).map(level => ({ label: level, value: level }));
// const bloodGroups = Object.values(BloodGroupsEnum).map(level => ({ label: level, value: level }));

// const CoordinatorView = () => {
//     const [dialogOpened, setDialogOpened] = useState<boolean>(false);
//     const [successNotification, setSuccessNotification] = useState<boolean>(false);
//     const [formImage, setFormImage] = useState('');
//     const [showSidebar, setShowSidebar] = useState<boolean>(false);

//     const autoGridRef = React.useRef<AutoGridRef>(null);

//     const [selectedInstructorItems, setSelectedInstructorItems] = useState<InstructorDto[]>([]);

//     const form  = useForm(InstructorDtoModel, {
//         onSubmit: async (instructor) => {
//             await InstructorDtoCrudService.save(instructor).then((result) => {
//                 refreshGrid();
//                 setSelectedInstructorItems(result ? [result] : []);
//                 setSuccessNotification(true);
//                 clear();
//             });
//         }
//     });

//     const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = form;

//     function refreshGrid() {
//         autoGridRef.current?.refresh();
//     }

//     function showSidebarSlide() {
//         const [width, setWidth] = useState(200);

//         const handleResize = (e: React.SyntheticEvent<Element, Event>, data: ResizeCallbackData) => {
//             setWidth(data.size.width);
//         };
//         // const handleResize = (event, { element, size }) => {
//         //     setWidth(size.width);
//         // };

//         return (
//             <>
//                 <div className={`top-0 right-0 sm:w-[35vw] w-full bg-blue-600 p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}
//                 >
//                     <button type="button" className="absolute right-5 top-5 text-white content-end p-2 bg-blue-600 hover:bg-blue-700" onClick={() => setShowSidebar(false)} title="Close Sidebar">
//                         <FaX />
//                     </button>
//                     <h3 className="mt-20 text-4xl font-semibold text-white">I am a sidebar</h3>
//                     <Resizable width={width} height={5} onResize={handleResize} axis="x">
//                         <div style={{ width, border: '1px solid black' }}>
//                             Sidebar content
//                         </div>
//                     </Resizable>
//                 </div>
//                 {/* <div className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30 ease-in-out duration-300 ${showSidebar ? "block" : "hidden"}`}
//                     onClick={() => setShowSidebar(false)}
//                 ></div> */}
//             </>
//         );
//     }

//     return (
//         <>
//             {/* {showSidebarSlide()} */}
//             <SplitLayout className="h-full w-full">
//                 <div className={`h-full flex flex-col items-stretch sm:w-full ${showSidebar ? "w-0" : "w-full"}`}>
//                     <AutoGrid service={InstructorDtoCrudService} model={InstructorDtoModel} ref={autoGridRef}
//                         visibleColumns={['id', 'person.givenName', 'designation', 'person.medical.gender', 'person.bloodGroup', 'person.contact.email', 'person.contact.mobile',]}
//                         selectedItems={selectedInstructorItems}
//                         theme="row-stripes"
//                         columnOptions={{
//                             'id': {
//                                 header: 'ID',
//                                 resizable: true,
//                             },
//                             'person.givenName': {
//                                 header: 'Full Name',
//                                 resizable: true,
//                                 autoWidth: false,
//                                 width: '250px',
//                                 renderer: ({ item }) => <CoordinatorRenderer item={item} />,
//                             },
//                             'person.additionalName': {
//                                 header: 'Middle Name',
//                                 resizable: true,
//                             },
//                             'person.familyName': {
//                                 header: 'Last Name',
//                                 resizable: true,
//                             },
//                             'designation': {
//                                 header: 'Designation',
//                                 resizable: true,
//                             },
//                             'person.contact.mobile': {
//                                 header: 'Mobile',
//                                 resizable: true,
//                             },
//                             'person.contact.email': {
//                                 header: 'Email',
//                                 resizable: true,
//                             },
//                         }}
//                         onActiveItemChanged={(e) => {
//                             const item = e.detail.value;
//                             setSelectedInstructorItems(item ? [item] : []);
//                             read(item);
//                             setFormImage(`v1/content/image?imagePath=${btoa('/user/' + item?.person?.id + '/' + item?.person?.id + '.png')}`);
//                             setShowSidebar(item?.id !== undefined);
//                         }}
//                     />
//                 </div>
//                 <div className={`h-full ease-in-out duration-300 ${showSidebar ? "translate-x-0 sm:w-1/4 w-full min-w-96" : "translate-x-full w-0 hidden"}`}>
//                     <div className="w-full">
//                         <header className="bg-gray-100 w-full border-2 border-blue-500 rounded-2xl">
//                             <div className="flex flex-row space-x-4">
//                                 <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full">#{selectedInstructorItems[0]?.id ?? ''} - Coordinator</p>
//                                 <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={() => {
//                                     clear();
//                                     setSelectedInstructorItems([]);
//                                 }}>
//                                     <Icon icon="vaadin:plus" />New
//                                 </Button>
//                                 <button type="button" className="right-5 top-5 text-white content-end p-2 bg-blue-500 hover:bg-blue-600" onClick={() => setShowSidebar(false)} title="Close Sidebar">
//                                     <FaX />
//                                 </button>
//                             </div>
//                         </header>
//                         <main className="overflow-y-scroll w-full h-full">
//                             <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
//                                 <div>
//                                     {value.id &&
//                                         <img className="w-24 h-24 object-cover rounded-full mx-auto ring-4 ring-blue-500 drop-shadow-[0_15px_15px_#dfe7ff]" src={formImage}
//                                             onError={(e: any) => { e.target.src = `images/default/no_image.png`; }} alt="no_image" />
//                                     }
//                                 </div>
//                                 <TextField label={'Full Name'}  {...{ colspan: 2 }} {...field(model.person.givenName)} />
//                                 {/* <TextField label={'Middle Name'} {...{ colspan: 1 }}  {...field(model.person.additionalName)} /> */}
//                                 {/* <TextField label={'Last Name'}   {...{ colspan: 1 }}{...field(model.person.familyName)} /> */}

//                                 <TextField label={'Designation'} {...{ colspan: 4 }} {...field(model.designation)} />

//                                 <DateTimePicker label={'Birth Date'}  {...{ colspan: 2 }} {...field(model.person.birthDate)} />
//                                 <Select label={'Blood Group'}  {...{ colspan: 1 }} {...field(model.person.bloodGroup)} items={bloodGroups} />
//                                 <Select label={'Gender'}  {...{ colspan: 1 }}  {...field(model.person.medical.gender)} items={genders} />

//                                 <TextField label={'Honorific Prefix'} {...{ colspan: 1.5 }} {...field(model.person.honorificPrefix)} />
//                                 <TextField label={'Honorific Suffix'} {...{ colspan: 1.5 }} {...field(model.person.honorificSuffix)} />
//                                 <TextField label={'Nationality'}  {...{ colspan: 2 }} {...field(model.person.nationality)} />

//                                 <TextField label={'Father Name'}  {...{ colspan: 2 }} {...field(model.person.fatherName)} />
//                                 <TextField label={'Mother Name'}  {...{ colspan: 2 }} {...field(model.person.motherName)} />

//                                 <TextField label={'Alias'}  {...{ colspan: 1 }} {...field(model.person.alternateName)} />
//                                 <NumberField label={'Height'}   {...{ colspan: 1 }}{...field(model.person.medical.height)} />
//                                 <NumberField label={'Weight (KG)'}  {...{ colspan: 1 }} {...field(model.person.medical.weight)} />
//                                 <IntegerField label={'Number of Children'}  {...{ colspan: 1 }} {...field(model.person.medical.children)} />

//                                 <EmailField label={'Email'} {...{ colspan: 1 }}  {...field(model.person.contact.email)} clearButtonVisible errorMessage="Enter a valid email address" />
//                                 <TextField label={'Mobile'}{...{ colspan: 1 }}   {...field(model.person.contact.mobile)} minlength={5} maxlength={18} allowedCharPattern="[0-9()+-]" />
//                                 <TextField label={'Telephone'}{...{ colspan: 1 }}   {...field(model.person.contact.telephone)} minlength={5} maxlength={18} allowedCharPattern="[0-9()+-]" />
//                                 <TextField label={'Fax Number'}  {...{ colspan: 1 }} {...field(model.person.contact.faxNumber)} />

//                                 <TextArea label={'Present Address'}  {...{ colspan: 2 }} {...field(model.person.address.presentAddress)} />
//                                 <TextArea label={'Permanent Address'} {...{ colspan: 2 }}  {...field(model.person.address.permanentAddress)} />

//                                 <TextArea label={'Description'} {...{ colspan: 2 }}  {...field(model.description)} />
//                                 <TextArea label={'Qualification'} {...{ colspan: 2 }}  {...field(model.qualification)} />
//                                 {value.id &&
//                                     <Upload capture="camera"
//                                         method="POST"
//                                         target="v1/content/upload/image"
//                                         headers={`{"path": "/user/${value.person?.id || ''}", "filename": "${value.person?.id || ''}.png" }`}
//                                         // onUploadBefore={async (e: UploadBeforeEvent) => {
//                                         //     const file = e.detail.file;
//                                         //     // e.preventDefault();
//                                         //     console.log('file', file);
//                                         //     // if (form.value) {
//                                         //     //   form.value.avatarBase64 = await readAsDataURL(file);
//                                         //     // }
//                                         // }}
//                                         onUploadBefore={(e) => {
//                                             console.log('before', e);
//                                             setFormImage('');
//                                             // refreshGrid();
//                                         }}
//                                         onUploadSuccess={(e: UploadSuccessEvent) => {
//                                             const file = e.detail.file;
//                                             console.log('file s', file);
//                                             setFormImage(`v1/content/image?imagePath=${btoa('/user/' + value.person?.id + '/' + value.person?.id + '.png')}`);
//                                             refreshGrid();
//                                         }}
//                                     ></Upload>
//                                 }
//                             </FormLayout>
//                         </main>
//                         <footer className="flex flex-row bg-gray-100 w-full border-2 border-blue-500 rounded-2xl">
//                             <div className="w-full">
//                                 {
//                                     value.id &&
//                                     <Button
//                                         className="text-white bg-red-400 hover:bg-red-500"
//                                         onClick={() => {
//                                             setDialogOpened(true);
//                                             console.log('delete', selectedInstructorItems[0]?.id);
//                                         }}
//                                     >Delete</Button>
//                                 }
//                             </div>
//                             {
//                                 dirty &&
//                                 <div className="flex flex-row content-end space-x-4">
//                                     <Button
//                                         className={discardButtonColors[dirty.toString()]}
//                                         disabled={!dirty}
//                                         onClick={reset}
//                                     >
//                                         Discard
//                                     </Button>
//                                     <Button
//                                         className={saveButtonColors[dirty.toString()]}
//                                         disabled={invalid || submitting || !dirty}
//                                         onClick={submit}
//                                     >
//                                         {value.id !== undefined ? 'Update' : 'Save'}
//                                     </Button>
//                                 </div>
//                             }
//                         </footer>
//                     </div>

//                 </div>
//             </SplitLayout>
//             <NotificationUtil opened={successNotification} type="update"
//                 message={{
//                     title: 'Successfully Updated',
//                     description: value.person?.givenName,
//                 }}
//                 onOpenedChanged={(event) => {
//                     if (!event.detail.value) {
//                         setSuccessNotification(event.detail.value);
//                     }
//                 }}
//                 onClick={() => { setSuccessNotification(false) }}
//             />
//             <ConfirmDialog
//                 header="Delete Item"
//                 cancelButtonVisible
//                 rejectButtonVisible
//                 rejectText="Discard"
//                 confirmText="Confirm"
//                 confirmTheme="error primary"
//                 opened={dialogOpened}
//                 onOpenedChanged={(event) => {
//                     setDialogOpened(event.detail.value);
//                     if (event.detail.value) {
//                         // setStatus('');
//                     }
//                 }}
//                 onConfirm={() => {
//                     InstructorDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
//                         refreshGrid();
//                         setSelectedInstructorItems([]);
//                         reset();
//                     });
//                 }}>
//                 {`Do you want to delete?${value.person?.givenName}`}
//             </ConfirmDialog >
//         </>
//     );
// };

// export default CoordinatorView;
