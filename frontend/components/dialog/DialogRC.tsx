import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import { FaX } from 'react-icons/fa6';

type ShowDialog = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type ButtonType = 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'light' | 'dark';

export type ButtonRCProps = {
    type: ButtonType;
    name?: string;
    onClick: () => void;
};

export function Button({ type, name, onClick }: ButtonRCProps) {
    const color = {
        success: 'bg-green-500 hover:bg-green-700',
        warning: 'bg-yellow-500 hover:bg-yellow-700',
        danger: 'bg-red-500 hover:bg-red-700',
        info: 'bg-blue-500 hover:bg-blue-700',
        primary: 'bg-indigo-500 hover:bg-indigo-700',
        secondary: 'bg-gray-500 hover:bg-gray-700',
        light: 'bg-gray-100 hover:bg-gray-300',
        dark: 'bg-gray-800 hover:bg-gray-900',
    };
    return (
        <button
            type="button"
            className={`inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ml-3 ${color[type]}`}
            onClick={onClick}
        >
            {name}
        </button>
    );
}

function acttionController(buttons: ButtonRCProps[], show: ShowDialog,) {
    return (
        <>

            {buttons.map((button, index) => (
                <Button key={index} type={button.type} name={button.name} onClick={button.onClick} />
            ))}
            <Button type={'secondary'} name={'Cancel'} onClick={() => show.setIsOpen(false)} />
            {/* <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={() => show.setIsOpen(false)}
            >
                Deactivate
            </button>
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => show.setIsOpen(false)}
            >
                Cancel
            </button> */}
        </>
    )
}

const DialogRC = ({ icon, title, body, buttons, show }: { icon: any, title?: string, body?: any, buttons: ButtonRCProps[], show: ShowDialog }) => {
    const cancelButtonRef = useRef(null)
    return (
        <>
            <Transition.Root show={show.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => show.setIsOpen(true)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"                                
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                {icon}
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900" draggable>
                                                    {title}

                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    {body}
                                                </div>
                                            </div>
                                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => show.setIsOpen(false)}>
                                                <FaX /> <span className="sr-only">Close</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        {acttionController(buttons, show,)}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
export default DialogRC;
