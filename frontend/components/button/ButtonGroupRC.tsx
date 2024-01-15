// import { AbstractModel } from "@hilla/form";
// import { Button } from "@hilla/react-components/Button.js";
// import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
// import { UseFormResult } from "@hilla/react-form";
// import NotificationUtil from "Frontend/util/NotificationUtil";
// import { useEffect, useState } from "react";

// const discardButtonColors: { [key: string]: string } = {
//     true: 'text-white bg-indigo-400 hover:bg-indigo-500',
//     false: 'text-white bg-gray-300',
// };

// const saveButtonColors: { [key: string]: string } = {
//     true: 'text-white bg-emerald-400 hover:bg-emerald-500',
//     false: 'text-white bg-gray-300',
// };

// function ButtonGroupRC<M extends AbstractModel>({ id, form, notification, dialog }: { id?: number, form: UseFormResult<M>, notification: boolean, dialog: boolean }) {
//     const [dialogOpened, setDialogOpened] = useState<boolean>(false);
//     const [successNotification, setSuccessNotification] = useState<boolean>(false);
    
//     useEffect(() => {
//         if (notification) {
//             setSuccessNotification(true);
//         }
//     }, [notification]);

//     useEffect(() => {
//         if (dialog) {
//             setDialogOpened(true);
//         }
//     }, [dialog]);
    
//     const { dirty, invalid, submitting, reset, submit, value } = form;
//     return (
//         <>
//             <div className="flex flex-row bg-gray-100">
//                 <div className="w-full">
//                     {
//                         id === undefined ? null :
//                             <Button
//                                 className="text-white bg-red-400 hover:bg-red-500"
//                                 onClick={() => {
//                                     setDialogOpened(true);
//                                     console.log('delete', id);
//                                 }}
//                             >Delete</Button>
//                     }
//                 </div>
//                 {
//                     !dirty ? null :
//                         <div className="flex flex-row content-end space-x-4">
//                             <Button
//                                 className={discardButtonColors[dirty.toString()]}
//                                 disabled={!dirty}
//                                 onClick={reset}
//                             >
//                                 Discard
//                             </Button>
//                             <Button
//                                 className='text-white bg-emerald-400 hover:bg-emerald-500 disabled:bg-gray-300'
//                                 disabled={invalid || submitting || !dirty}
//                                 onClick={submit}
//                             >
//                                 {id !== undefined ? 'Update' : 'Save'}
//                             </Button>
//                         </div>
//                 }
//             </div>
//             <NotificationUtil opened={notification} type="update"
//                 message={{
//                     title: 'Successfully Updated',
//                     description: value.name,
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
//                     BatchDtoCrudService.delete(id).then((result) => {
//                         refreshGrid();
//                         setSelectedBatchItems([]);
//                         reset();
//                     });
//                 }}>
//                 Do you want to delete?
//                 {value.name}
//             </ConfirmDialog >
//         </>
//     );
// }

// export default ButtonGroupRC;