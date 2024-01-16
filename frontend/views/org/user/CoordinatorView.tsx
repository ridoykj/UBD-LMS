import { Button } from "@hilla/react-components/Button.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { DateTimePicker } from "@hilla/react-components/DateTimePicker.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { Scroller } from "@hilla/react-components/Scroller.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from "@hilla/react-form";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import BloodGroupsEnum from "Frontend/generated/com/itbd/application/constants/BloodGroupsEnum";
import GenderEnum from "Frontend/generated/com/itbd/application/constants/GenderEnum";
import PersonDAOModel from "Frontend/generated/com/itbd/application/dao/user/person/PersonDAOModel";
import PersonDTO from "Frontend/generated/com/itbd/application/dto/user/person/PersonDTO";
import PersonDTOModel from "Frontend/generated/com/itbd/application/dto/user/person/PersonDTOModel";
import { PersonDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import React, { useState } from "react";

const CoordinatorView = () => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedInstructorItems, setSelectedInstructorItems] = useState<PersonDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(PersonDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await PersonDtoCrudService.save(instructor).then((result) => {
        console.log('result', result);
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
          <AutoGrid service={PersonDtoCrudService} model={PersonDAOModel} ref={autoGridRef}
            visibleColumns={['instructor.name', 'instructor.email', 'description', 'instructor.designation', 'instructor.qualification',]}
            selectedItems={selectedInstructorItems}
            theme="row-stripes"
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
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># Professor</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <Scroller scrollDirection="vertical" className="w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
              <label slot="label">Profile</label>
              <TextField label={'Name'}  {...field(model.instructor.name)} />
              <TextField label={'Alternant name'}  {...field(model.alternateName)} />
              <TextField label={'Alternant names'}  {...field(model.additionalName)} />
              <TextField label={'Alternant namef4'}  {...field(model.givenName)} />
              <TextField label={'Alternant namef'}  {...field(model.familyName)} />
              <DateTimePicker label={'Birth Dateq'}  {...field(model.birthDate)} />
              <TextField label={'Honorific Prefix'}  {...field(model.honorificPrefix)} />
              <TextField label={'Honorific Suffix'}  {...field(model.honorificSuffix)} />
              <TextField label={'Nationality'}  {...field(model.nationality)} />
              {/* <Select label={'Blood Group'}  {...field(model.bloodGroup)} items={bloodGroups} />
              <TextField label={'Father Name'}  {...field(model.fatherName)} />
              <TextField label={'Mother Name'}  {...field(model.motherName)} />

              <Select label={'Gender'}  {...field(model.gender)} items={genders} />
              <TextField label={'Height'}  {...field(model.height)} />
              <TextField label={'Weight'}  {...field(model.weight)} />
              <TextField label={'Children'}  {...field(model.children)} />

              <TextField label={'Email'}  {...field(model.email)} />
              <TextField label={'Fax Number'}  {...field(model.faxNumber)} />
              <TextField label={'Telephone'}  {...field(model.telephone)} /> */}
{/* 
              <TextField label={'Present Address'}  {...field(model.address.presentAddress)} />
              <TextField label={'Permanent Address'}  {...field(model.address.permanentAddress)} /> */}

              {/* <TextField label={'Description'}  {...field(model.description)} />
              <TextField label={'Designation'}  {...field(model.designation)} />
              <TextField label={'Qualification'}  {...field(model.qualification)}/> */}
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
              value.instructor?.name === undefined ? null :
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
          description: value.instructor?.name,
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
          PersonDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
            refreshGrid();
            setSelectedInstructorItems([]);
            reset();
          });
        }}>
        {`Do you want to delete?${value.instructor?.name}`}
      </ConfirmDialog >
    </>
  );
};

export default CoordinatorView;
