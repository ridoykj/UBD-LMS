import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { useForm } from '@hilla/react-form';
import { AutoGrid, AutoGridRef } from 'Frontend/components/grid/autogrid';
import SideCrudRC from 'Frontend/components/layout/splitlayout/SideCrudRC';
import OrganizationDTO from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTO';
import OrganizationDTOModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel';
import { OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import React, { useState } from 'react';

const OrganizationView = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedOrgItems, setSelectedOrgItems] = useState<OrganizationDTO[]>([]);
  const form = useForm(OrganizationDTOModel, {
    onSubmit: async (org) => {
      await OrganizationDtoCrudService.save(org).then((result) => {
        refreshGrid();
        setSelectedOrgItems(result ? [result] : []);
        clear();
      }).catch((error) => {
        console.log('error', error);
      });
    }
  });
  const { model, field, value, read, clear, reset } = form;

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '600px', columns: 2 },
  ];

  const primary = () => {
    return (
      <>
        <AutoGrid service={OrganizationDtoCrudService} model={OrganizationDTOModel} ref={autoGridRef}
          visibleColumns={['name', 'alternateName', 'foundingDate', 'email', 'phone', 'taxId', 'vatId', 'address', 'website',]}
          selectedItems={selectedOrgItems}
          theme="row-stripes"
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedOrgItems(item ? [item] : []);
            read(item);
            setShowSidebar(item?.id !== undefined);
          }}
        />
      </>
    );
  }

  const secondary = () => {
    return (
      <>
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
      </>
    );
  }

  async function onConfirm() {
    return await OrganizationDtoCrudService.delete(selectedOrgItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedOrgItems([]);
      reset();
    }).catch((error) => {
      console.error('error', error);
      // setErrorNotification(true);
    });
  }
  return (
    <>
      <SideCrudRC
        primary={primary()}
        secondary={secondary()}
        form={form}
        onConfirm={onConfirm}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </>
  );
};

export default OrganizationView;
