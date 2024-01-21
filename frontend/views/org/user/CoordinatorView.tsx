import { Button } from "@hilla/react-components/Button.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { DateTimePicker } from "@hilla/react-components/DateTimePicker.js";
import { EmailField } from '@hilla/react-components/EmailField.js';
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { IntegerField } from '@hilla/react-components/IntegerField';
import { NumberField } from "@hilla/react-components/NumberField.js";
import { Select } from "@hilla/react-components/Select.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import BloodGroupsEnum from "Frontend/generated/com/itbd/application/constants/BloodGroupsEnum";
import GenderEnum from "Frontend/generated/com/itbd/application/constants/GenderEnum";
import InstructorDTO from "Frontend/generated/com/itbd/application/dto/user/instructor/InstructorDTO";
import InstructorDTOModel from "Frontend/generated/com/itbd/application/dto/user/instructor/InstructorDTOModel";
import { InstructorDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import React, { useState } from "react";

const CoordinatorView = () => {
    const [dialogOpened, setDialogOpened] = useState<boolean>(false);
    const [successNotification, setSuccessNotification] = useState<boolean>(false);

    const autoGridRef = React.useRef<AutoGridRef>(null);

    const [selectedInstructorItems, setSelectedInstructorItems] = useState<InstructorDTO[]>([]);

    const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(InstructorDTOModel, {
        onSubmit: async (instructor) => {
            await InstructorDtoCrudService.save(instructor).then((result) => {
                refreshGrid();
                setSelectedInstructorItems(result ? [result] : []);
                setSuccessNotification(true);
            });
        }
    });


    const genders = Object.values(GenderEnum).map(level => ({ label: level, value: level }));
    const bloodGroups = Object.values(BloodGroupsEnum).map(level => ({ label: level, value: level }));

    function refreshGrid() {
        autoGridRef.current?.refresh();
    }

    const responsiveSteps = [
        { minWidth: '0', columns: 1 },
        { minWidth: '500px', columns: 4 },
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
                    <AutoGrid service={InstructorDtoCrudService} model={InstructorDTOModel} ref={autoGridRef}
                        visibleColumns={['person.givenName', 'person.additionalName', 'person.familyName', 'designation', 'person.medical.gender', 'person.bloodGroup', 'person.contact.email', 'person.contact.mobile',]}
                        selectedItems={selectedInstructorItems}
                        theme="row-stripes"
                        columnOptions={{
                            'person.givenName': {
                                header: 'First Name',
                                resizable: true,
                            },
                            'person.additionalName': {
                                header: 'Middle Name',
                                resizable: true,
                            },
                            'person.familyName': {
                                header: 'Last Name',
                                resizable: true,
                            },
                            'designation': {
                                header: 'Designation',
                                resizable: true,
                            },
                            'person.contact.mobile': {
                                header: 'Mobile',
                                resizable: true,
                            },
                            'person.contact.email': {
                                header: 'Email',
                                resizable: true,
                            },
                        }}
                        onActiveItemChanged={(e) => {
                            const item = e.detail.value;
                            console.log('item', item);
                            setSelectedInstructorItems(item ? [item] : []);
                            read(item);
                        }}
                    />
                </VerticalLayout>
                <VerticalLayout className="w-1/4 min-w-96">
                    <header className="bg-gray-100 w-full">
                        <div className="flex flex-row space-x-4">
                            <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full">#{selectedInstructorItems[0]?.id ?? ''} - Coordinator</p>
                            <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={() => {
                                clear();
                                setSelectedInstructorItems([]);
                            }}>
                                <Icon icon="vaadin:plus" />New
                            </Button>
                        </div>
                    </header>
                    <main className="overflow-y-scroll w-full h-full">
                        <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
                            <label slot="label">Profile</label>
                            <TextField label={'First Name'}  {...{ colspan: 2 }} {...field(model.person.givenName)} />
                            <TextField label={'Middle Name'} {...{ colspan: 1 }}  {...field(model.person.additionalName)} />
                            <TextField label={'Last Name'}   {...{ colspan: 1 }}{...field(model.person.familyName)} />

                            <TextField label={'Designation'} {...{ colspan: 4 }} {...field(model.designation)} />

                            <DateTimePicker label={'Birth Date'}  {...{ colspan: 2 }} {...field(model.person.birthDate)} />
                            <Select label={'Blood Group'}  {...{ colspan: 1 }} {...field(model.person.bloodGroup)} items={bloodGroups} />
                            <Select label={'Gender'}  {...{ colspan: 1 }}  {...field(model.person.medical.gender)} items={genders} />

                            <TextField label={'Honorific Prefix'} {...{ colspan: 1.5 }} {...field(model.person.honorificPrefix)} />
                            <TextField label={'Honorific Suffix'} {...{ colspan: 1.5 }} {...field(model.person.honorificSuffix)} />
                            <TextField label={'Nationality'}  {...{ colspan: 2 }} {...field(model.person.nationality)} />

                            <TextField label={'Father Name'}  {...{ colspan: 2 }} {...field(model.person.fatherName)} />
                            <TextField label={'Mother Name'}  {...{ colspan: 2 }} {...field(model.person.motherName)} />

                            <TextField label={'Alias'}  {...{ colspan: 1 }} {...field(model.person.alternateName)} />
                            <NumberField label={'Height'}   {...{ colspan: 1 }}{...field(model.person.medical.height)} />
                            <NumberField label={'Weight (KG)'}  {...{ colspan: 1 }} {...field(model.person.medical.weight)} />
                            <IntegerField label={'Number of Children'}  {...{ colspan: 1 }} {...field(model.person.medical.children)} />

                            <EmailField label={'Email'} {...{ colspan: 1 }}  {...field(model.person.contact.email)} clearButtonVisible errorMessage="Enter a valid email address" />
                            <TextField label={'Mobile'}{...{ colspan: 1 }}   {...field(model.person.contact.mobile)} minlength={5} maxlength={18} allowedCharPattern="[0-9()+-]" />
                            <TextField label={'Telephone'}{...{ colspan: 1 }}   {...field(model.person.contact.telephone)} minlength={5} maxlength={18} allowedCharPattern="[0-9()+-]" />
                            <TextField label={'Fax Number'}  {...{ colspan: 1 }} {...field(model.person.contact.faxNumber)} />

                            <TextArea label={'Present Address'}  {...{ colspan: 2 }} {...field(model.person.address.presentAddress)} />
                            <TextArea label={'Permanent Address'} {...{ colspan: 2 }}  {...field(model.person.address.permanentAddress)} />

                            <TextArea label={'Description'} {...{ colspan: 2 }}  {...field(model.description)} />
                            <TextArea label={'Qualification'} {...{ colspan: 2 }}  {...field(model.qualification)} />
                        </FormLayout>
                    </main>
                    <footer className="flex flex-row bg-gray-100 w-full">
                        <div className="w-full">
                            {
                                selectedInstructorItems[0]?.id === undefined ? null :
                                    <Button
                                        className="text-white bg-red-400 hover:bg-red-500"
                                        onClick={() => {
                                            setDialogOpened(true);
                                            console.log('delete', selectedInstructorItems[0]?.id);
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
                                        {selectedInstructorItems[0]?.id !== undefined ? 'Update' : 'Save'}
                                    </Button>
                                </div>
                        }
                    </footer>
                </VerticalLayout>
            </SplitLayout>
            <NotificationUtil opened={successNotification} type="update"
                message={{
                    title: 'Successfully Updated',
                    description: value.person?.givenName,
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
                    InstructorDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
                        refreshGrid();
                        setSelectedInstructorItems([]);
                        reset();
                    });
                }}>
                {`Do you want to delete?${value.person?.givenName}`}
            </ConfirmDialog >
        </>
    );
};

export default CoordinatorView;
