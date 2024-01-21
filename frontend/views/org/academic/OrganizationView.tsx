import { Button } from '@hilla/react-components/Button.js';
import { ConfirmDialog } from '@hilla/react-components/ConfirmDialog.js';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { useForm } from '@hilla/react-form';
import { AutoGrid, AutoGridRef } from 'Frontend/components/grid/autogrid';
import OrganizationDTO from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTO';
import OrganizationDTOModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel';
import { OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from 'Frontend/util/NotificationUtil';
import React, { useState } from 'react';

const OrganizationView = () => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);
  const [errorNotification, setErrorNotification] = useState<boolean>(false);

  const autoGridRef = React.useRef<AutoGridRef>(null);

  const [selectedOrgItems, setSelectedOrgItems] = useState<OrganizationDTO[]>([]);

  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(OrganizationDTOModel, {
    onSubmit: async (org) => {
      await OrganizationDtoCrudService.save(org).then((result) => {
        refreshGrid();
        setSelectedOrgItems(result ? [result] : []);
        setSuccessNotification(true);
      }).catch((error) => {
        console.log('error', error);
      });
    }
  });

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
          <AutoGrid service={OrganizationDtoCrudService} model={OrganizationDTOModel} ref={autoGridRef}
            visibleColumns={['name', 'alternateName', 'foundingDate', 'email', 'phone', 'taxId', 'vatId', 'address', 'website',]}
            selectedItems={selectedOrgItems}
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedOrgItems(item ? [item] : []);
              read(item);
            }}
          />
        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># {value.name ?? 'Unknown Title'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <main className="overflow-y-scroll w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
              <TextField label={'Name'}  {...field(model.name)} />
              <TextField label={'Alternate Name'}  {...field(model.alternateName)} />
              <DateTimePicker label={'Founding Date'}  {...field(model.foundingDate)} />
              <TextField label={'Description'}  {...field(model.description)} />
              <TextField label={'Email'}  {...field(model.email)} />
              <TextField label={'Phone'}  {...field(model.phone)} />
              <TextField label={'Tax ID'}  {...field(model.taxId)} />
              <TextField label={'Vat ID'}  {...field(model.vatId)} />
              <TextField label={'Address'}  {...field(model.address)} />
              <TextField label={'Website'}  {...field(model.website)} />
              <TextArea label={'Description'}  {...field(model.description)} />
            </FormLayout>
          </main>
          <footer className="flex flex-row bg-gray-100 w-full self-end">
            <div className="w-full">
              {
                selectedOrgItems[0]?.id === undefined ? null :
                  <Button
                    className="text-white bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setDialogOpened(true);
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
                    {selectedOrgItems[0]?.id !== undefined ? 'Update' : 'Save'}
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
        onConfirm={() => {
          OrganizationDtoCrudService.delete(selectedOrgItems[0]?.id).then((result) => {
            refreshGrid();
            setSelectedOrgItems([]);
            reset();
          }).catch((error) => {
            console.error('error', error);
            setErrorNotification(true);
          });
        }}>
        {`Do you want to delete?${value.name}`}
      </ConfirmDialog >
    </>
  );
};

export default OrganizationView;
