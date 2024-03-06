import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { UseFormResult } from "@hilla/react-form";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

type SideCrudRCProps = {
    primary: React.ReactNode,
    secondary: React.ReactNode,
    form: UseFormResult<any>,
    onConfirm: () => Promise<boolean | undefined | void>,
    showSidebar: boolean,
    setShowSidebar: Dispatch<SetStateAction<boolean>>,
};

const SideCrudRC: React.FC<SideCrudRCProps> = (props) => {
    const { value, submit, reset, dirty, invalid, submitting } = props.form;

    const [dialogOpened, setDialogOpened] = useState<boolean>(false);
    const [successNotification, setSuccessNotification] = useState<boolean>(false);
    const [errorNotification, setErrorNotification] = useState<boolean>(false);
    return (
        <>
            <SplitLayout className="w-full h-full">
                <div className={`relative h-full flex flex-col items-stretch sm:w-full ${props.showSidebar ? "w-0" : "w-full"}`}>
                    {props.primary}
                </div>
                <div className={`flex flex-col w-full ease-in-out duration-300 ${props.showSidebar ? "translate-x-0 sm:w-1/4 w-full min-w-96" : "translate-x-full w-0 hidden"}`}>
                    <header className="flex-grow-0 w-full bg-blue-600 text-white rounded-2xl">
                        <div className="flex flex-row space-x-4">
                            <p className="text-lg font-bold p-1 m-1 w-full">#{(value as any).id ?? ''} - Coordinator</p>
                            <button type="button" className="right-5 top-5 text-white content-end px-4 hover:bg-blue-700 rounded-full" onClick={() => props.setShowSidebar(false)} title="Close Sidebar">
                                <FaX />
                            </button>
                        </div>
                    </header>
                    <main className="overflow-y-scroll w-full h-full">
                        {props.secondary}
                    </main>
                    <footer className="flex-grow-0 w-full bg-blue-600 rounded-2xl p-1 text-white">
                        {
                            !dirty ?
                                <div className="w-full">
                                    {
                                        (value as any).id &&
                                        <button type="button"
                                            title="Delete Item"
                                            className=" bg-red-500 hover:bg-red-600 rounded-xl p-2 px-4 shadow-md"
                                            onClick={() => {
                                                setDialogOpened(true);
                                            }}
                                        >Delete</button>
                                    }
                                </div>
                                :
                                <div className="flex flex-row space-x-2 w-full">
                                    <button type="button"
                                        title="Discard Changes"
                                        className={`flex-grow-1 p-2 rounded-xl shadow-md ring-2 ring-blue-400 w-full hover:bg-blue-700`}
                                        disabled={!dirty}
                                        onClick={reset}
                                    >
                                        Discard
                                    </button>
                                    <button type="button"
                                        title="Save Item"
                                        className={`flex-grow-1 p-2 rounded-xl shadow-md ring-2 ring-blue-400 w-full hover:bg-blue-700`}
                                        disabled={invalid || submitting || !dirty}
                                        onClick={() => submit().then(() => {
                                            setSuccessNotification(true);
                                            props.setShowSidebar(false);
                                        })}
                                    >
                                        {(value as any).id !== undefined ? 'Update' : 'Save'}
                                    </button>
                                </div>
                        }
                    </footer>
                </div>
            </SplitLayout>
            <NotificationUtil opened={successNotification} type="update"
                message={{
                    title: 'Updated',
                    description: "The item has been successfully updated.",
                }}
                onOpenedChanged={(event) => {
                    if (!event.detail.value) {
                        setSuccessNotification(event.detail.value);
                    }
                }}
                onClick={() => { setSuccessNotification(false) }}
            />
            <NotificationUtil opened={errorNotification} type="error"
                message={{
                    title: 'Unable to delete item',
                    description: 'Please check and delete all the child items first',
                }}
                onOpenedChanged={(event) => {
                    if (!event.detail.value) {
                        setErrorNotification(event.detail.value);
                    }
                }}
                onClick={() => { setErrorNotification(false) }}
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
                onConfirm={() => props.onConfirm().then(() => { console.log(''); })}>
                {`Do you want to delete?${(value as any).person?.givenName}`}
            </ConfirmDialog >
        </>
    );
};

export default SideCrudRC;