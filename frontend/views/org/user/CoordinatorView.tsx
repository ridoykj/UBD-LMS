import { Button } from "@hilla/react-components/Button.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { DateTimePicker } from "@hilla/react-components/DateTimePicker.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { Scroller } from "@hilla/react-components/Scroller.js";
import { Select } from "@hilla/react-components/Select.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import BloodGroupsEnum from "Frontend/generated/com/itbd/application/constants/BloodGroupsEnum";
import GenderEnum from "Frontend/generated/com/itbd/application/constants/GenderEnum";
import InstructorDTO from "Frontend/generated/com/itbd/application/dto/user/InstructorDTO";
import InstructorDTOModel from "Frontend/generated/com/itbd/application/dto/user/InstructorDTOModel";
import { InstructorDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import React, { useState } from "react";

const CoordinatorView = () => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedInstructorItems, setSelectedInstructorItems] = useState<InstructorDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(InstructorDTOModel, {
    onSubmit: async (programme) => {
      await InstructorDtoCrudService.save(programme).then((result) => {
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
    { minWidth: '600px', columns: 2 },
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
            visibleColumns={['name', 'email', 'description', 'designation', 'qualification',]}
            selectedItems={selectedInstructorItems}
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedInstructorItems(item ? [item] : []);
              read(item);
            }}
          />
        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># Professor</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <Scroller scrollDirection="vertical" className="w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
              <label slot="label">Profile</label>
              <TextField label={'Name'}  {...field(model.name)} />
              <TextField label={'Alternant name'}  {...field(model.personKey.alternateName)} />
              <DateTimePicker label={'Birth Date'}  {...field(model.personKey.birthDate)} />
              <TextField label={'Honorific Prefix'}  {...field(model.personKey.honorificPrefix)} />
              <TextField label={'Honorific Suffix'}  {...field(model.personKey.honorificSuffix)} />
              <TextField label={'Nationality'}  {...field(model.personKey.nationality)} />
              <Select label={'Blood Group'}  {...field(model.personKey.bloodGroup)} items={bloodGroups} />
              <TextField label={'Father Name'}  {...field(model.personKey.fatherName)} />
              <TextField label={'Mother Name'}  {...field(model.personKey.motherName)} />
{/* 
              <Select label={'Gender'}  {...field(model.personKey.medicals.gender)} items={genders} />
              <TextField label={'Height'}  {...field(model.personKey.medicals.height)} />
              <TextField label={'Weight'}  {...field(model.personKey.medicals.weight)} />
              <TextField label={'Children'}  {...field(model.personKey.medicals.children)} />

              <TextField label={'Email'}  {...field(model.personKey.contacts.email)} />
              <TextField label={'Fax Number'}  {...field(model.personKey.contacts.faxNumber)} />
              <TextField label={'Telephone'}  {...field(model.personKey.contacts.telephone)} />

              <TextField label={'Present Address'}  {...field(model.personKey.addresses.presentAddress)} />
              <TextField label={'Permanent Address'}  {...field(model.personKey.addresses.permanentAddress)} /> */}

              <TextField label={'Description'}  {...field(model.description)} />
              <TextField label={'Designation'}  {...field(model.designation)} />
              <TextField label={'Qualification'}  {...field(model.qualification)} />
            </FormLayout>
          </Scroller>
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
              value.name === undefined ? null :
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
          description: value.name,
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
        {`Do you want to delete?${value.name}`}
      </ConfirmDialog >
    </>
  );
};

export default CoordinatorView;
