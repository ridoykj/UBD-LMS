import { Button } from "@hilla/react-components/Button.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoGridRef } from "@hilla/react-crud";
import { useForm } from "@hilla/react-form";
import { AutoGrid } from "Frontend/components/grid/autogrid";
import SectorDTO from "Frontend/generated/com/itbd/application/dto/org/place/SectorDTO";
import SectorDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/SectorDTOModel";
import { SectorDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import React, { useState } from "react";

const SectorView = () => {

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedInstructorItems, setSelectedInstructorItems] = useState<SectorDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(SectorDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await SectorDtoCrudService.save(instructor).then((result) => {
        refreshGrid();
        setSelectedInstructorItems(result ? [result] : []);
        setSuccessNotification(true);
      });
    }
  });

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
          <AutoGrid service={SectorDtoCrudService} model={SectorDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'city', 'state', 'alternateName', 'contact',]}
            selectedItems={selectedInstructorItems}
            theme="row-stripes"
            columnOptions={{
              'name': {
                header: 'Name',
                resizable: true,
              },
              'additionalName': {
                header: 'Additional Name',
                resizable: true,
              },
              'type': {
                header: 'Building Type',
                resizable: true,
              },
              'block': {
                header: 'Block',
                resizable: true,
              },
              'openingTime': {
                header: 'Opening Time',
                resizable: true,
              },
              'closingTime': {
                header: 'Closing Time',
                resizable: true,
              },
              'contact': {
                header: 'Contact',
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
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full">#{selectedInstructorItems[0]?.id ?? ''} - Sectors</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={() => {
                clear();
                setSelectedInstructorItems([]);
              }}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <main className="w-full h-full">
            <main className="overflow-y-scroll w-full h-full">
              <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
                <TextField label={'Name'}  {...{ colspan: 2 }} {...field(model.name)} />
                <TextField label={'City'}  {...{ colspan: 1 }} {...field(model.city)} />
                <TextField label={'Block'}  {...{ colspan: 2 }} {...field(model.state)} />
                <TextField label={'Alternate Name'}  {...{ colspan: 2 }} {...field(model.alternateName)} />
                <TextField label={'Country'}  {...{ colspan: 2 }} {...field(model.country)} />
                <TextField label={'Contact'}  {...{ colspan: 2 }} {...field(model.contact)} />
                <TextArea label={'Description'}  {...{ colspan: 2 }} {...field(model.description)} />
              </FormLayout>
            </main>
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
          SectorDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
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

export default SectorView;
